---
title: 'Censorship Resistance or: How I Stopped Worrying and Learned to Rendezvous'
date: 2018-04-08 01:30:00+09:00
tags: ['Censorship']
summary: 'Do you want to learn how to stop worrying and learn to rendezvous? This post is about my thoughts on rendezvous protocols and how they can be used to connect to networks in hostile conditions.'
aliases:
  - /2018/04/08/rendezvous/
---

This post is about my thoughts on rendezvous protocols.

Before you enter a house, you need to find a door. Before you join a network, you need to find an IP address. For the internet, we have things like domain names and DNS that translate website URLs we found on search engines into IP addresses which act as the doors to join a network. This is what a rendezvous is. A way for your computer to find another computer to connect to in order to join a network.

In normal conditions, DNS is fine to use as a rendezvous protocol. It is simple and decentralized. There is great tooling for it, and the entire world supports it. [DNS is even used](http://awesome.datproject.org/dns-discovery) in decentralized and distributed network scenarios. However, things start changing when trying to gain access a blocked network in a censored region.

Even though DNS is decentralized, default DNS resolvers such as an ISP can block requests for censored domain names. This means that if you request the IP address for "google.com," the censor will give you back an incorrect IP address or not IP address at all. There are several ways to tackle this issue.

The most basic solution is to use another DNS resolver that doesn't block the DNS queries to censored sites. The issue with this is that DNS queries to those resolvers can be blocked in the IP layer. Even if they aren't being blocked, getting the IP address of another DNS resolver alone is an issue of rendezvous.

It seems to me that DNS infrastructure alone isn't well suited for rendezvous in hostile conditions.

![turkey dns](/images/turkey_dns.png)
_People spray painted Google's DNS Resolver IP Address used in Turkey when the government started censoring the internet via DNS_

Before looking at specific solutions, it's important to look at the types of solutions that work well in the real world.
To do this, it's important to look at things through an economic perspective and a practicality perspective.

## Economic Perspective

The best way to tackle censorship isn't through a technological perspective but rather through an economic perspective. The internet is a global network of nodes. Some nodes are very important economically to a nation-state and can't be censored.

For example, take Amazon. Amazon's AWS network operates throughout the entire world. Governments can't censor Amazon's IP addresses because that would be a catastrophic blow to their economy. ([This has been challenged recently with Russia blocking 13.5 million Amazon IPs](https://torrentfreak.com/russia-asked-isps-to-block-13-5-million-amazon-ip-addresses-to-silence-one-app-180331/))

Leveraging economic disincentives combined with technological cleverness is the best way to develop censorship resistance.

Since the government operating the censored region gains massive economic incentives from keeping that company's websites un-censored, one can use that to their advantage and host a rendezvous system within it.

There are several censorship resistant systems that incorporate this idea. The largest one is [meek](https://trac.torproject.org/projects/tor/wiki/doc/meek). It allows users to connect to a Tor node via a technique known as domain fronting. You can read more about Domain Fronting [here](http://www.icir.org/vern/papers/meek-PETS-2015.pdf).

Domain fronting leverages the fact that censors can't reasonably block certain CDNs because that would hurt a lot of businesses in the region, and it would be detrimental more than it would be beneficial.

## Practicality Perspective

There is a common saying in dissident elementary school children.

> They can't throw us all in detention!

The children bring up an argument in practicality. It would be highly impractical to have every child go to detention because of an action all of them took.

The same is true for censors and censorship resistance networks. However, one must think in an incredibly large scale. Creating proxy networks large enough to withstand nation-state interference is very costly and resource intensive. Operating that many servers is not feasible.

That is, unless you're not using your own computers.

There have been several projects that have aimed at using other people's computers in clever ways to proxy data to and from Tor. My favorite one is "OSS: Using Online Scanning Services for Censorship Circumvention." You can read the paper [here](http://crypto.stanford.edu/~dabo/papers/redirects.pdf). The basic idea is that they use scanning services freely available on the internet as a way to proxy the connection of two peers. An example they give is the website `PDFmyURL`.

Users provide this website a URL, and the website gives them back a PDF view of the URL's contents. They used this to proxy requests from one person to another in a really clever way. Alice initiates the connection by giving `PDFmyURL` a URL to Bob, the person they wish to connect to, along with some information in the URL such as Alice's IP address.

`PDFmyURL` will send an HTTP GET request to Bob's server. Bob will reply with a HTTP status code 302 (temporary redirect) response and request that `PDFmyURL` redirects the request to Alice's IP address. However, he also includes data inside the URL via URL parameters.

Once Alice gets the redirect, she can redirect back to Bob by sending back a 302 redirect HTTP response to `PDFmyURL` with a URL to Bob along with some information she wants to send back to Bob.

This is repeated until the session finishes.

The other one that I really like is Flash Proxy. You can read the original paper [here](https://crypto.stanford.edu/flashproxy/flashproxy.pdf). Flash proxy creates abundant short lived proxies. A business can place an "interent freedom" badge on their site and the website's visitors run a piece of Javascript that converts their browsers into proxies to a Tor relay node. This project has been deprecated but there is now a new project called [Snowflake](https://github.com/keroserene/snowflake) which is doing the same thing using WebRTC.

## Issues

In rendezvous, one of the most worrying issues is trust. How can one make sure that the network they are connecting to is the actual network they want to connect to? How can they make sure the user who wants to rendezvous is actually legitimate?

How can you set up a rendezvous scheme where most things are blocked and the censor doesn't care about economic penalties?

How do you prevent DOS attacks?

How do you make it harder for censors to track rendezvous points?

---

Please let me know what you think about these ideas by emailing me or Tweeting at me!

:wq
