---
title: URL Shorteners as a Data Store
date: 2017-08-12 01:30:00+09:00
tags: ['Project']
summary: "Do you love storing data but don't want to deal with the hassle of setting up a server? URL shorteners are a great way to store data! In this blog post, I will show you how to store data in any URL shortening service on the internet."
aliases:
  - /2017/08/12/url-short/
---

Because why not?

[GitHub repo](https://github.com/ColdSauce/ShortDataStorage)

In this blog post, I’m going to be talking about a proof of concept I created for a way to store data in any URL shortening service on the internet.

I have been thinking of paradigms revolving around data. How data is stored, how it’s transfered, and how it’s consumed. I tried to do a couple of experiments in the storage aspect to see if I could come up with some new cool way of storing data.

## The Original Idea

The original idea I had was creating a “platform” that is just simply a webite that takes whatever HTML is in the current URL, and shows it to anyone going to that URL.

For example, when one examines [this website](https://coldsauce.github.io/url-is-the-new-cloud/?html=%3Chtml%3E%3Cbody%3Ewith+the+html+stored+in+the+URL%2C+no+domains+can+be+seized+and+no+web+servers+can+be+shut+down.+It%27s+distributed.+%3C%2Fbody%3E+%3C%2Fhtml%3E), they will see that none of these words and none of this HTML was ever in the actual HTML of the website. It was loaded when the URL was clicked, client-side. This means that potentially, people can have whole websites that are not hosted anywhere which are shared via messaging channels which are completely free to use. If one combines this with some existing peer to peer technologies, there could be entire websites that are hosted all through messaging apps.

But then I thought, what if someone shortens the URL. That relies on a centralized service and ultimately it’s no different than just having a site hosted somewhere. But the idea sounded so cool so I did it anyways for fun.

## Short Data Storage

A URL shortening service, in the most basic sense, is just a map from short URL to long URL and vice versa. Most URL shorteners don’t do anything to see if the URLs are actually real. This means that arbitrary data can be stored in the URLs and later retrieved.

If you’d like to store data, you can pipe it to stdin to the program which will generate a short link when you have correctly hooked up the URL shortening service you would like to use.

```
cat somefile.html | python main.py
```

If you’d like to get data from a specific shortened URL, you can explicitly pass it in as a command line argument.

```
python main.py <some shortened URL> > file_to_save_data_to.bin
```

To save data to a URL shortening service, this code encodes all the data in URL Safe Base64, splits it into batched chunks, calls the URL shortening service’s API with a url http://<the base 64 encoded chunk> which the URL shortening service takes in no problem. The service returns a shortened URL for the data. Then, all of these shortened URLS that were generated are compiled into a string that separates them with \_ underscores. This string is then itself shortened and from that, one
shortened URL is generated.

The way to get the data back is basically the process just described but in reverse.

I learned a bunch in working on this project — the biggest thing I learned was how HTTP redirection actually works. I never had to deal with it before but it’s actually super straightforward.
