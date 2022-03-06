---
title: Cool Hacker Tools -- Vim
date: 2018-03-23 01:30:00+09:00
description: 'How I use Vim'
summary: "This blog post series' goal is to provide a comprehensive list of tools I use and how to set them up. Today, we'll be covering Vim. Vim is an incredibly powerful editor that can do a lot more than just make your code look pretty."
tags: ['Productivity']
aliases:
  - /2018/03/23/cht-Vim/
---

This blog post series' goal is to provide a comprehensive list of tools I use and how to set them up.

When I first started programming, I was so curious to try the coolest gadgets and try new editors, window managers, and programming languages. This blog post’s goal is to try to share as much information that I have with you, either a complete beginner, looking to increase your productivity and to make your stuff look really cool, or an experienced developer looking to add a few tools to your arsenal.

# Vim

Every single Vim blog post I've seen has talked about the author's `.vimrc` configuration file. I think this is pretty cool, but I don't think there is enough information about the cool stuff you can actually do with Vim other than just making it look nice.

I have been using Vim since I started college almost 4 years ago. I think it’s the best editor ever created. However, when I first started, that’s not what I thought at all. I thought it was so barebones and ancient.

“Who would ever use this?”

However, I started using it more and more and that’s when I truly understood the powers of Vim. Let me explain these to you now.

## Commands I use every day

### Basic Navigation

The philosophy of navigation for Vim is to move your hands as least as possible. If your hands are already on the hjkl keys, why not use them to go up, down, left, and right? Use `h`, `j`, `k`, `l` for navigation. It is hard in the beginning but as you continue to practice, it'll be a really good long term investment.

### Fancy Navigation

The following are commands I use every day
`zz`, `gg`, `G`, `^`, `$`, `w`, `b`, `f<some char>`, `F<some char>`

`zz` is my favorite fancy command. It moves your window so that your cursor will be in the middle of it.

`gg` and `G` move to the top and to the bottom of the file.

`^` and `$` move to the beginning and the end of a line.

`w` and `b` move one word forward and one word back.

`f<some char>` and `F<some char` searches the line forward and backwards for a character and goes to it.

### Getting to insert mode

These are the following commands I use to get into insert mode.
`i` opens up insert mode to the "left" of the cursor. `a` opens it up to the "right" of the cursor. `o` opens up insert mode in a new line.

### Getting to normal mode

I am weird in that I use `Ctrl-C` to go into normal mode. When I first started using Vim, I thought it was really awkward to move my pinky all the way to the ESC key. I searched throughout the internet and I discovered that ESC isn't the only way to go into normal mode. The first technique I've found was `Ctrl-C` so I have been using it ever since.

My friend Zach uses `Ctrl-[` which I also tried to use since I feel like `Ctrl-C` is a hack but I just couldn't be as fast with it and was impatient.

### Basic Manipulation

These are the commands I use all the time for manipulating text:
`x`, `dd`, `y`, `p`, `u`, `yy`, `v`, `r`, `vU` `vu`

`x` cuts the character that the cursor was on and lets you paste it later.

`dd` cuts an entire line.

`yy` is a bit different in that it will copy, instead of cut, an entire line.

If you'd like to copy a certain amount of characters, you can use `v` and then use any of the navigation commands to move the selection, writing `y` to copy them.

`p` to paste what you've copied. A nuanced thing to take into consider with p is that it copies whatever you pasted over.

`u` is used in case you'd like to undo.

`vU` capitalizes the characters in the selection while `vu` lowercases them.

`r<some char>` replaces a character under the cursor with another character.

## Vim Macros

Those are super straightforward commands, right? Well, something I learned about 2 years ago that changed my life forever was Vim Macros. The idea of a Vim Macro is that you can save a certain sequence of actions and then play them back.

For instance, let’s say we have something like this that continues on for a thousand lines.

```
Cats are really cute, not dogs.
Kangaroos are really cute, not dinosaurs.
Lions are really cute, not tigers.
Squirrels are really cute, not monkeys.
.
.
.
```

Here is the problem. You actually disagree with each of these statments. You think dogs are way cuter than cats, and so on. You want to flip each of these while keeping the grammar intact. How can you do that?

One of the ways you can do this in Vim is by using Vim macros.

The first thing you need to do is perform the operation you want to perform on one line.

For us, this is the operation we want to perform:

```
^vey$bvepbvu^vep^vU
```

Try to map out what this does by looking at the reference of all these commands, above. If you get stuck, try them out yourself with this example.

Before I explain how macros work, I just want to talk a little about a concept in Vim known as a register. Registers are just keys on your keyboard that you can store stuff in. By keys I mean literally the key `k` or the key `e`. I think it'll make sense when you start using them.

Now that we know what we need to do for each line, we can apply this to multiple lines. We can save this sequence of commands into a register. To do this, we start with the character `q`. Now we need to tell Vim which register to put the macro in. We can pick any key on our keyboard. I always use `h` since I'm so used to it. After we perform the macro, we go to the next line and end it by doing `j` and `q`.

```
qh^vey$bvepbvu^vep^vUjq
```

You start the macro recording with `q<some register>` and you end it with `q`. I've also included a `j` right before the `q`. What this does is it moves the cursor to the line right below the one that we performed the macro at. This allows us to repeat macros without having to manually go to the next line.

To activate the macro, `@` is used. Since we saved the macro in our register `h`, we need to activate that register. That means for us, we have to do `@h`.

The rule of thumb for me is that whenever I'm doing generic stuff over and over again, I should write a macro for it.

Since our hypothetical had 1000 different lines, we can just do `1000@h` and it will perform the macro 1000 times.

Here's an example of the macro in action!

![Macro Example](https://media.giphy.com/media/6CB3guWZuDmyysrLip/giphy.gif)

There are a few things that I don't know enough about such as `:g` which seems to be incredibly powerful. If you have a good blog post about that and about other Vim things I didn't cover here, please email or Tweet at me!

:wq
