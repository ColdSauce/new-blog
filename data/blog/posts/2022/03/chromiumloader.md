---
title: 'Chromium Deep Dive: The CRX_REQUIRED_PROOF is in the Pudding'
date: 2022-03-06 01:30:00+09:00
tags: ['Chromium', 'Software Engineering']
---

The mystery of `CRX_REQUIRED_PROOF_MISSING`, preferences, and the wonderful world of delegates.

The other day, I wanted to see if I could load Chrome Extensions without using the official Chrome Web Store. When I tried to download an extension from my own web server, I got an error:

`CRX_REQUIRED_PROOF_MISSING`

## Why does CRX_REQUIRED_PROOF_MISSING show up?

The reason `CRX_REQUIRED_PROOF_MISSING` shows up is because the CRX file being downloaded hasn't been signed by the Chrome Web Store's private key. Chromium doesn't trust the file as it's not coming from the Chrome web store.

Let's dig into this a bit and see if there's a way around this!

## Start but Verify

Let's start at `components/crx_file/crx_verifier.cc` and the function `Verify` and see where that takes us. This is the function Chromium runs when looking to make sure everything is fine with a given CRX file.

Upon verifying, Chrome checks the standard things - that it can read the file, that the CRX header is present, and that the CRX version is the most up-to-date one (at time of writing, `3`). Afterwards, it performs more complex checks on the signed portion of the header via the `VerifyCrx3` function.

Looking at the errors that are returned in the `VerifyCrx3` function, one sticks out: `VerifierResult::ERROR_REQUIRED_PROOF_MISSING`

This is the error that, upon propagation up the call stack, will display the `CRX_REQUIRED_PROOF_MISSING` error message.

It is caused by two if statements:

```cpp
if (public_key_bytes.empty() || !required_key_set.empty())
  return VerifierResult::ERROR_REQUIRED_PROOF_MISSING;

if (require_publisher_key && !found_publisher_key)
  return VerifierResult::ERROR_REQUIRED_PROOF_MISSING;
```

From debugging, it seems the second if statement is the one inflicting the suffering of `CRX_REQUIRED_PROOF_MISSING` when trying to download extensions from your own web store.

#### What is `require_publisher_key`?

```cpp
bool require_publisher_key =
    format == VerifierFormat::CRX3_WITH_PUBLISHER_PROOF ||
    format == VerifierFormat::CRX3_WITH_TEST_PUBLISHER_PROOF;
```

If the CRX format passed into `Verify` is of a certain type, `require_publisher_key` will return true.

#### What is `found_publisher_key`?

```cpp
constexpr uint8_t kPublisherKeyHash[] = {
    0x61, 0xf7, 0xf2, 0xa6, 0xbf, 0xcf, 0x74, 0xcd, 0x0b, 0xc1, 0xfe,
    0x24, 0x97, 0xcc, 0x9b, 0x04, 0x25, 0x4c, 0x65, 0x8f, 0x79, 0xf2,
    0x14, 0x53, 0x92, 0x86, 0x7e, 0xa8, 0x36, 0x63, 0x67, 0xcf};
std::vector<uint8_t> publisher_key(std::begin(kPublisherKeyHash),
                                   std::end(kPublisherKeyHash));
std::vector<uint8_t> key_hash(crypto::kSHA256Length);
crypto::SHA256HashString(key, key_hash.data(), key_hash.size());

found_publisher_key =
  found_publisher_key || key_hash == publisher_key ||
```

So the idea is, looking at each proof within the extension file's header, it'll hash the key in the proof, and compare it to the Chrome Web Store's publisher key hash. If it matches for any one of the proofs, `found_publisher_key` will be true.

### Logic

`found_publisher_key` looks like a dead end. The only way to get that function to return true is to somehow sign CRX files with Google's private key.

But we can still leverage the other condition in that if statement! If we can get `require_publisher_key` to be false, we can get Chrome to load extensions that aren't in the Web Store!

## What Are the Different Formats Available?

There are three total: `CRX3`, `CRX3_WITH_TEST_PUBLISHER_PROOF`,`CRX3_WITH_PUBLISHER_PROOF`

`extensions/common/verifier_formats.cc` sheds some light on what each of these mean:

```cpp
crx_file::VerifierFormat GetWebstoreVerifierFormat(
    bool test_publisher_enabled) {
  return test_publisher_enabled
             ? crx_file::VerifierFormat::CRX3_WITH_TEST_PUBLISHER_PROOF
             : crx_file::VerifierFormat::CRX3_WITH_PUBLISHER_PROOF;
}

crx_file::VerifierFormat GetPolicyVerifierFormat() {
  return crx_file::VerifierFormat::CRX3;
}

crx_file::VerifierFormat GetExternalVerifierFormat() {
  return crx_file::VerifierFormat::CRX3;
}

crx_file::VerifierFormat GetTestVerifierFormat() {
  return crx_file::VerifierFormat::CRX3;
}
```

Chromium enforces the rule that extensions must come from the Web Store through formats with the pattern `*_PUBLISHER_PROOF`. This means that if we can figure out a way to get Chromium to call the `Verify` function with just `VerifierFormat::CRX3`, we `require_publisher_key` will be false, and it won't error!

## Peeling Back Further In the Timeline

Sorry, I lied. In order to figure out how to call `Verify` with the `CRX3` format, we need to go back further. And see how Verify is actually called!

When you download a file in Chromium, the `ChromeDownloadManagerDelegate::ShouldOpenDownload` function runs.

```cpp
if (download_crx_util::IsExtensionDownload(*item) &&
  !extensions::WebstoreInstaller::GetAssociatedApproval(*item)) {
    scoped_refptr<extensions::CrxInstaller> crx_installer =
      download_crx_util::OpenChromeExtension(profile_, *item);
```

So if it was an extension that got downloaded, but wasn't associated with the web store, we should call `download_crx_util::OpenChromeExtension`.

Looking at `OpenChromeExtension`:

```cpp
scoped_refptr<extensions::CrxInstaller> OpenChromeExtension(
    Profile* profile,
    const DownloadItem& download_item) {
  DCHECK_CURRENTLY_ON(BrowserThread::UI);

  scoped_refptr<extensions::CrxInstaller> installer(
      CreateCrxInstaller(profile, download_item));

  if (OffStoreInstallAllowedByPrefs(profile, download_item)) {
    installer->set_off_store_install_allow_reason(
        extensions::CrxInstaller::OffStoreInstallAllowedBecausePref);
  }

  if (extensions::UserScript::IsURLUserScript(download_item.GetURL(),
                                              download_item.GetMimeType())) {
    installer->InstallUserScript(download_item.GetFullPath(),
                                 download_item.GetURL());
  } else {
    DCHECK(!WebstoreInstaller::GetAssociatedApproval(download_item));
    installer->InstallCrx(download_item.GetFullPath());
  }

  return installer;
}
```

The lines of code that really stick out here are:

```cpp
if (OffStoreInstallAllowedByPrefs(profile, download_item)) {
  installer->set_off_store_install_allow_reason(
      extensions::CrxInstaller::OffStoreInstallAllowedBecausePref);
}
```

It looks like there are some preferences that allow what Chromium calls "off store install" to take place.

Let's take a look at this function and see what is going on there.

`chrome/browser/download/download_crx_util.cc`:

```cpp
bool OffStoreInstallAllowedByPrefs(Profile* profile, const DownloadItem& item) {
  return g_allow_offstore_install_for_testing ||
         extensions::ExtensionManagementFactory::GetForBrowserContext(profile)
             ->IsOffstoreInstallAllowed(item.GetURL(), item.GetReferrerUrl());
}
```

The current hypothesis is that if we can get this function to return true, then the format passed into `Verify` will be of type `CRX3` and our extension will load properly.

I modified the function to always return true, and then tested it and confirmed that the hypothesis was indeed a valid one. Let's dig deeper!

Following the chain, we get to `chrome/browser/extensions/extension_management.cc` and `IsOffStoreInstallAllowed`

```cpp
bool ExtensionManagement::IsOffstoreInstallAllowed(
    const GURL& url,
    const GURL& referrer_url) const {
  // No allowed install sites specified, disallow by default.
  if (!global_settings_->has_restricted_install_sources)
    return false;

  const URLPatternSet& url_patterns = global_settings_->install_sources;

  if (!url_patterns.MatchesURL(url))
    return false;

  // The referrer URL must also be allowlisted, unless the URL has the file
  // scheme (there's no referrer for those URLs).
  return url.SchemeIsFile() || url_patterns.MatchesURL(referrer_url);
}
```

So it checks the `global_settings_` variable to see if there are any `install_sources`, and if there are, goes through one by one, checking whether the URL where we downloaded the CRX from matches any of those install sources, and if the referrer matches any of those patterns as well.

### What is this `install_sources` thing?

It's a `URLPatternSet`, but where is it being populated? Same file, actually!

```cpp
const char kAllowedInstallSites[] = "extensions.allowed_install_sites";
const base::ListValue* install_sources_pref =
    static_cast<const base::ListValue*>(LoadPreference(
        pref_names::kAllowedInstallSites, true, base::Value::Type::LIST));
```

It's reading from a config key, `extensions.allowed_install_sites` and loading whatever is inside there. If we can get in there and add our own URL, we could get the `IsOffStoreInstallAllowed` function to return true!

Let's go deeper. What is `LoadPreference` anyways?

```cpp
const base::Value* ExtensionManagement::LoadPreference(
    const char* pref_name,
    bool force_managed,
    base::Value::Type expected_type) const {
  if (!pref_service_)
    return nullptr;
  const PrefService::Preference* pref =
      pref_service_->FindPreference(pref_name);
  if (pref && !pref->IsDefaultValue() &&
      (!force_managed || pref->IsManaged())) {
    const base::Value* value = pref->GetValue();
    if (value && value->type() == expected_type)
      return value;
  }
  return nullptr;
}
```

The jist of this preference stuff is simple - Chrome has an abstraction for thinking about changes, or "preferences". So instead of the code needing to know that the preference came from some custom policy, or from some JSON config change, or from etc etc, it has a bunch of code that reads from all those various sources, and produces the same preference config no matter what the source is.

That way, code further down the chain can just think of things as preferences and doesn't have to worry about the source.

The implementation that we're interested in is in `components/policy/core/browser/configuration_policy_pref_store.cc`

This file is responsible for abstracting policies into preferences. Let's take a look to see how it does so.

```cpp
PrefValueMap* ConfigurationPolicyPrefStore::CreatePreferencesFromPolicies() {
  std::unique_ptr<PrefValueMap> prefs(new PrefValueMap);
  PolicyMap filtered_policies =
      policy_service_
          ->GetPolicies(PolicyNamespace(POLICY_DOMAIN_CHROME, std::string()))
          .Clone();
  filtered_policies.EraseNonmatching(base::BindRepeating(&IsLevel, level_));

  std::unique_ptr<PolicyErrorMap> errors = std::make_unique<PolicyErrorMap>();

  PoliciesSet deprecated_policies;
  PoliciesSet future_policies;
  handler_list_->ApplyPolicySettings(filtered_policies, prefs.get(),
                                     errors.get(), &deprecated_policies,
                                     &future_policies);

  if (!errors->empty()) {
    if (errors->IsReady()) {
      LogErrors(std::move(errors), std::move(deprecated_policies),
                std::move(future_policies));
    } else if (policy_connector_) {  // May be null in tests.
      policy_connector_->NotifyWhenResourceBundleReady(base::BindOnce(
          &LogErrors, std::move(errors), std::move(deprecated_policies),
          std::move(future_policies)));
    }
  }

  return prefs.release();
}
```

So it looks at all of the policies that Chrome knows about, removes any that aren't considered MANDATORY (based on the level) and then populates the prefernces using `ApplyPolicySettings`.

## Modifying Policies

To see a list of policies you can set, `out/Debug/gen/components/policy/policy_constants.h` or you can go to [the Google Chrome Enterprise Policies site](https://chromeenterprise.google/policies/).

The three policies we need to change are
`ExtensionAllowedTypes`
`ExtensionInstallAllowlist`
`ExtensionInstallSources`

### Windows

### MacOS

If using Google Chrome, `~/Library/Preferences/com.google.Chrome.plist`
If using Chromium, `~/Library/Preferences/org.chromium.Chromium.plist`
If using Edge, `~/Library/Preferences/com.microsoft.Edge.plist`

### Linux
