---
title: 'Live Streaming with Mac'
date: 2018-04-17 01:30:00+09:00
tags: ['Productivity', 'Live Streaming']
summary: "Live streaming on Mac can be a bit of a pain, but with some effort, it's possible to get a good enough (trademark) experience. This post covers how to use Soundflower and some scripts I've written to add functionality to OBS that isn't available to Mac users by default."
aliases:
  - /2018/04/17/obs/
---

I recently started live streaming my studying using Mac and Open Broadcaster Software (OBS)

In this blog post, I want to talk about how I use OBS and other tools to create an effective and engaging live streaming experience.

Live streaming your computer screen has historically had a gaming connotation. Because of this, most streaming tools have been focused on the Windows operating system. This has left a giant void in support of Mac and Linux. That, coupled with system restrictions that Mac enforces makes it hard to have an engaging and feature rich live streaming experience.

However, with enough effort, it’s possible to get good enough (trademark) experience using a Mac.

## Sound

Capturing system sound on Mac is not a trivial process. There are security restrictions in place to make it impossible for applications to capture system sound. However, there are special applications that one can allow access to system sound.

One of these that is pretty okay is SoundflowerBed. You can download it [here](https://github.com/mattingalls/Soundflower). Once you install it, you need to route your audio to it.

Go to your Mac's Audio MIDI Setup and create a new MIDI Output Device. Check both Soundflower and Built-in output.

After that, you can configure OBS to listen from Soundflower by creating a new Mic Input and

![](/images/obs/select_audio_input_capture.png)

![](/images/obs/new_audio_capture.png)

![](/images/obs/soundflower_select.png)

## Plugins

Unfortunately, most plugins made for OBS are made primarily for Windows.

I have created a [Github Repo](https://github.com/ColdSauce/Mac-OBS-Tools) where I have built some scripts to add functionality on top of OBS if you have a Mac. This type of functionality was only available to Windows users before.

To use one of these plugins, run the script you wish to use. For example, I'm going to run the `count_remaining.py` file.

To do this, first I run

`python count_remaining.py "Apr 28 2018 4:45PM"`

Now a new file will be created in the directory where I ran my script called `time_remaining.py`

Now I can go into OBS and create a new module to put on my stream. The module type I was is a `Text` type.

![](/images/obs/select_text.png)

This will take me to a new window where I can chose the properties of this text.

![](/images/obs/read_from_file.png)

In the properties, I select `Read from file` and specify the `time_remaining.txt` file that my script wrote.

## Improvements

There are still a lot of things that need to be improved in the overall grand scheme of things.

The biggest being the lack of plugins. Whenever I find a need for a plugin, I write a Python script to do what I want and I put it on that repo. If you'd like to help out, please feel free to submit a pull-request and I'll merge it if it's good!

SoundflowerBed isn't the greatest piece of software created, and there are still a lot of bugs in it. If you are so inclined, please either report these bugs to the Github Repo or try to fix them and push your changes upstream, it would help everyone out.

When it comes down to it, Mac isn't the dominant operating system for OBS so not all of the great functionality will be there. However, with some of these free tools, hopefully your experience got a whole lot better.
