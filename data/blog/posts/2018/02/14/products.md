---
title: How to Build Products Quickly
date: 2018-02-14 01:30:00+09:00
tags: ['Product', 'Building']
summary: "If you want to build products quickly, you need to be a full stack maker. This involves being proficient in frontend development, backend development, design, and productionizing. In addition, you need to know how to market your product. Follow these tips and you'll be on your way to shipping products rapidly!"
aliases:
  - /2018/02/14/quick-product/
---

_Disclaimer: this blog post is geared heavily towards web products. If you would like to learn about Android or iOS prototyping, or some other kind of prototyping, this is **not** the blog post for you. Also — this blog post isn't meant to be a blog post on being a good engineer._

I have spent the last year and a half dedicating as much time as I can on learning how to build products as quickly as possible. As with anything else, it all comes down to practice. Rapidly prototyping an idea you have is a muscle you have to train and build. It doesn't come easy and it involves lots of time, and energy.

## Full Stack Maker

When I think of products, I think of them as a collection of parts. To rapidly prototype an idea, you have to know how to execute in every one of these parts. Once you have become proficient at all of these, you can consider yourself a full stack maker.

**Frontend Development**

Most products have some sort of frontend. The fastest way to build frontends and get them in the hands of millions of people is by creating web frontends. Pretty much everyone with a computer has a web browser that can go to your site and interact with your product.

Because of this, you should be knowledgable in using HTML, CSS, and Javascript. But that's not enough. You should also be in the loop with the newest frontend tooling and frameworks. These include Sass, Less, CSS, React, Vue, Lerna, Babel, Webpack, etc. The list goes on and on. Research these tools and become familiar with them. Read web development blog posts to stay in the loop.

Build out projects from scratch over and over again until you become comfortable with the tooling and the frameworks you're using. You should be prepared with creating landing pages, and creating single page apps that interface with APIs. You should be comfortable using some sort of frontend routing library, and other slightly advanced topics.

**Backend Development**

Finding an appropriate backend framework all depends on one's use case. If you want the bells and whistles, and you want a framework that is structured in an opinionated way, you can take a look at frameworks like Rails or Django. If you want something much more minimal, you can try things like express, flask, or sinatra.

With backend development, it's very important to learn how to store data in some non-ephemeral way. One of the most popular ways to do this is by using databases. Learn how to use SQL and become proficient at it with the framework you're using to the point where you can do complex things with it. I recommend building a social network like application that has advanced features with people's friends lists, and so on. Re-create this social network like application a couple of times from scratch to get the hang of how everything interfaces together. You should also implement this social network in a NOSQL database like MongoDB.

I highly recommend creating a couple projects from scratch that implement various forms of authentication. Re-write them a couple of times until you understand exactly what they are doing and can do it yourself without having to Google a lot. I also recommend looking at other people's code to see how they implement auth and make sure you're following proper conventions to avoid security vulnerabilities.

**Design**

You need to become better at design. To do this, use nicely designed operating systems, and software in general. You should also follow good designers on Twitter and see what they are working on and read their design blogs. The goal here is to train your eye in spotting bad design.

Use [figma.com](http://figma.com) to implement all of your designs and prototypes. It's a completely free tool that's absolutely amazing to use. Learn how to use the pen tool, it'll allow you to do really powerful stuff.

Check out [Daily UI Challenge](http://www.dailyui.co/) and do all 100 days.

Use [flatuicolors.com](http://flatuicolors.com) to pick really nice colors.

Space everything out, even if things look way too spaced out.

Talk to your friends about design and try to get as much feedback from people that are good at design. Make sure to take their feedback seriously and improve.

**Productionizing**

A really important step of any product is getting it ready for the general public to use. To do this, you need to be able to have some server running somewhere hosting your website.

To get a server, you can use something like [DigitalOcean](http://digitalocean.com). Pick an operating system and stick with it. Ubuntu 16.04 has a lot of blog posts about various things you can do with it so that's probably the easiest one to use. Set up the server to use a non-root user, etc, a couple times to get the hang of it.

Once you have an operating system, the goal is to get your product up and running for people to access. To do this, you can use [Nginx](https://www.nginx.com/) which you can set up to reverse proxy into your service and provide load balancing. Nginx requires you to specify config files. I highly recommend building a couple dummy projects on different servers and setting up Nginx configs for each of them. Try to understand all of the steps in setting up an Nginx proxy so that you can do it without Googling anything.

You need to go from buying a domain to setting it up with your DigitalOcean servers in less than 5 minutes.

Learn how to use certbot and install Let's Encrypt on every single one of your Nginx configs.

**Marketing**

If you want people to use your product, you'll need people to know about it. I recommend posting on Twitter, HackerNews, certain subreddits, and ProductHunt. This is the best way to get feedback for your prototype.

## Conclusion

I have been practicing all of these things and have recently thought of an idea and shipped it in 10 hours with my friend Josh. Once you start doing this stuff over and over again, it becomes second nature and muscle memory. At the end of the day, it all boils down to practice and hard work.

Train your maker muscle!

:wq
