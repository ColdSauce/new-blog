---
title: 'A Night in Elephant and Castle'
date: 2019-08-04 01:30:00+09:00
tags: ['Sleep']
description: 'I recorded what I heard throughout the night from my flat last night.'
summary: "Do you live near an ambulance? Do you live near a lot of crime? Do you have a lot of honking? If you answered yes to any of these questions, then you're like me and have been having trouble sleeping. In this blog post, I try to find the source of my terrible sleep and present some potential solutions."
aliases:
  - /2019/08/04/elephantandcastle/
---

My sleep has been absolutely terrible for the past week. Stress had something to do with it, but I thought there must have been something more. I’ve been stressed before, and never had this bad sleep. I recalled a video of a psychological test I had seen a number of years ago. People would go into a room with a bed, and fall asleep with sensors attached to their heads. When the sensors would detect that the person went into REM sleep, the stage of sleep where a person dreams, there would be a speaker that played a short, but very loud sound. This sound would be loud enough to get the person out of REM sleep but not loud enough to actually wake them up. After a week of this, each test subject said that they felt much more groggy and sleepy, but couldn’t explain why.

When we first moved in, I noticed that the amount of sirens we were hearing was disproportionately large. Our apartment on the 24th floor overlooks all of London, but more importantly, it overlooks a large roundabout. It’s no surprise that we would hear sirens here and there. I’ve lived in big cities before, and have lived nearby main roads before. But it seemed to me as though we were hearing a siren every minute. There is a lot of traffic going through this roundabout, but I felt like there was something else that was missing.

Was I blowing this out of proportion? Are there really that many sirens here? Is that the reason why my sleep has been so bad? Are they as common in the night? Before I went to the the practical experiment, I wanted to do a bit of research to understand why there are sirens in the first place.

For the past week, whenever I would hear a siren, I would look outside and try to find out what kind of emergency vehicle it was. Most of the time, it was an ambulance. There were a couple of times it was police cars, but ambulances were by far the most common emergency vehicle I saw. I decided to look on Google maps to see where they could possibly be going. I typed in “ambulance” on Google maps, and this is what came up:

![](/static/images/ambulances.png)

Would you look at that! The roundabout that our apartment overlooks is surrounded by the black rectangle. The ambulances need to pass this roundabout to get to or from the 4 or more ambulance services that are north of us. All right - we figured out the reason why so many ambulances are coming through this roundabout. But what about the other emergency vehicles? Here’s a map of the crime in my area of London:

![](/static/images/crime.png)

A combined total of 4,370 reports in June 2019 alone! That is 145 cases of crime a day. Let’s say 30% of police cars pass by my roundabout each day. That’s 43 police sirens every day. If evenly distributed, that’s a police siren every 30 minutes throughout the whole day.

Another thing I’ve noticed a lot in London is the amount of honking. It’s very similar to NYC in that regard, whereas in other parts of the US, I haven’t really experienced it. People love to honk here. The thing that makes it worse is the other person also honks back. This makes the noise twice as potent. Just as I am writing this, two cars were honking at each other. According to the internet, “[o]ne in 20 Londoners have actually gotten into a fist-fight with another road user due to a driving argument getting out of hand.”

This was starting to feel like it was validating my hypothesis. I knew how bad the sirens were throughout the day, but I wanted to test how they were in the night. I wanted to use an ML model that would classify various sounds for me, but after trying for a long time, I just couldn’t get it to work. So instead, I opened up Audacity, put my computer next to me, started recording, and fell asleep. I recorded for 8 and a half hours, from 11pm to roughly 7:30am.

I used the “Truncate Silence” feature in Audacity to remove each 0.6 milisecond chunk that was quieter than -40 dB. This resulted in the following:

<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/660903494&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>

Playing most of the sounds in the recording would definitely throw me out of REM sleep. This means that through the night, there are 12 and a half minutes of audio that resulted in me falling out of a quality sleep stage. Last night, I slept for 8 and a half hours. That equates to 510 minutes. If we assume these loud sounds are evenly distributed, that means that there is one loud sound every 40 minutes. An average sleep cycle lasts from 90 - 110 minutes. That means that twice in each sleep cycle, a loud sound throws my body off and ruins it.

Now that I know this is happening, what can I do about it?

As it’s the summer in the UK, I have to open my window throughout the night to get a cool breeze in. When I don’t do this, my apartment gets up to 27 degrees Celsius (80.6 f) and gets super stuffy making it hard to breathe. The circulation is super bad. When I open the windows, it usually gets 23 degrees Celsius (73.4 f) which I is a great temperature. Our windows are double glazed which means that when we close the windows, we don’t hear a single thing coming from the outside. For the past few months, we’ve only opened our window when we wanted to get some air in, but left it closed throughout the night.

There are a few strategies I could employ. I could wait it out until it gets colder, suffering for the next month or two. This seems like it would work, but I don’t want to do another two months of this. I could open our bedroom door, open the balcony window, and have some breeze come in and still hear the sirens but not as loud as before. This is a possibility, but we have a ton of fruit flies in the kitchen that might want to come into the room and that would be very annoying. So the first step is to get rid of them. Another problem with this strategy is that it would remove my privacy as I have a roommate. A third strategy that my friend Bill suggested is to have an industrial fan next to the window that produce so much white noise that it would block out most of the sounds. I like this idea, as I’ve used white noise before when I had loud roommates in college. I’ll try this one and see how it goes.
