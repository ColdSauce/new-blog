---
title: Comparing Functional Languages
date: 2017-04-07 01:30:00+09:00
description: "Part one discusses Scala's pattern recognition vs. Scheme's operating on lists."
tags: ['Programming Languages']
summary: 'In this post, we compare the functional language Scala with Scheme. We look at how they both manipulate lists, with Scheme using predefined functions and Scala using pattern matching.'
aliases:
  - /2017/04/07/cfl/
---

I wrote this blog post about a year ago but finally got a chance to publish it.

How many `::`’s does it take to screw in a light-bulb? A `car`’s worth.

I’m currently in a class where we are using Scheme extensively. This has made me very used to the idea of structuring my algorithms using `car` and `cdr` for any sort of data manipulation.

`car` returns the head of a List while `cdr` returns the tail of List.

Here is a simple implementation of a sum function to understand how `car` and `cdr` works.

```
(define (sum some-list)
    (if (null? some-list) 0
        (+ (car some-list) (sum (cdr some-list)))
    )
)
```

This is a structurally recursive approach in which we add the first element of each recursive step up until we have no more elements in the list, in which case we return a concrete 0.

Having been doing Scheme for about 4 months, this is a very common pattern I see. It’s the construct that allows for the general idea of “iterating through a list” to function.

What I wanted to do was compare this with another functional language, Scala, and see what the differences were.

Scala is the best language I have ever written in. (Not true anymore :D, now it's Go) I have been using it for about a year and a half now and absolutely love it. Since both of the languages are considered functional, they share many similarities. However, I feel like Scala has many more abstractions that make things a lot easier.

To mirror the above code, here is the same idea applied in Scala.

```
def sum(someList: List[Int]): Int = {
    someList match {
      case Nil => 0
      case x :: xs => x + sum(xs)
    }
}
```

There is a very clear distinction between these two. Scala uses a concept known as pattern matching to get the head and tail of a List whereas Scheme uses predefined functions to do the same thing. What is interesting, though, is how both of these concepts are trying to do the same two things — wrangle with the structure of lists.

:wq
