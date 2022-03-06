---
title: Functional Error Handling in Scala
date: 2016-09-02 01:30:00+09:00
tags: ['Scala']
summary: 'Do you struggle with Error Handling in your code? Scala has some great tools to help you out! This blog post will teach you about Option, Either, and Try and how to use them to handle errors in a more functional way.'
aliases:
  - /2016/09/02/functional-error-handling/
---

For this blog post, I am going to be using a strongly typed language — Scala. All the principles here apply to any other strongly typed functional programming language.

There are several reasons why throwing errors is bad. The biggest one is that it’s a GOTO. It makes your code difficult to reason about and control.

So — how do we approach errors in a more functional way? We know we can’t just do the following:

```
def someFunc(n: String): String throws NumberFormatException
```

What do we do instead?

Let’s think about this in terms of types. Types are powerful because they allow the compiler to assume a lot of things about your code. They allow you to be incredibly precise and allow you to define functionality in a clear way.

## Option Type

One way to handle errors is to use the Option type. The Option type is either of type Some or of type None. So you either have a value contained in it or you don’t.

Option types aren’t bad for expressing errors but you need to know when to use them and when to not. As my statistics professor used to say “beautiful mathematics is being as concise and as simple as possible without sacrificing correctness.”

Here’s an example where the Option type is good for error handling.

```
def splitVectorAtValue[A](value: A, vector: Vector[A]): Option[(Vector[A], Vector[A])] = {
    vector.indexOf(value) match {
        case -1 => None
        case n => Some(vector.splitAt(n))
    }
}
```

There will either exist a split or there won’t. When the function returns a None type, the error is implicitly defined as “the value didn’t exist in the vector.”

## Either Type

Let’s say we want to be more verbose because our code requires it. Perhaps it’s because there could be many things that could go wrong. Or perhaps there might be a non-obvious thing that could go wrong.

Let’s say you have some function

```
def getPersonFromDatabase(db: Database, ssn: String): Person = {
    ...
}
```

If we were to wrap the return type as Option, it would be ambiguous on what actually occurred. If the function returned None, was it because there was no person in the database with the social security number we queried? Could we not access the database for some reason? Was there some other problem? Returning a None doesn’t give us any detailed information about any of these problems. All it says is that the function didn’t return a Person for some reason.

Our goal now is to try and come up with a more detailed and precise way of saying what went wrong. For this, again, we need to think in terms of types. Option gives you a None and a Some, right? What we want this time is like an Option except instead of a None, it should be the actual error that we encountered in our function. We want some type T that contains either an error or our value.

It’s our lucky day because there is a type that exists in Scala that does it for you!

The definition of the Either type is the following:

```
sealed abstract class Either[+A, +B] extends AnyRef
```

All right, we’re getting somewhere!

Here’s a potentially real-world example of using Either for error handling.

```
sealed trait DatabaseError
case object CouldNotEstablishConnection extends DatabaseError
case class CouldNotCreateInsert[A](someObject: A) extends DatabaseError
def runDatabaseStatements(database: Database, cookie: Cookie): Either[DatabaseError, Statement] = {
    val connection = database.connection
    val insertCookieStatement = database.getInsertStatement(cookie)
    for {
      connection <- connection.right
      cookieStatement <- insertCookieStatement.right
      _ <- database.run(cookieStatement).right
    } yield {
      cookieStatement
    }
}
case class Database(...) {
    val connection: Either[DatabaseError, Connection] = {
        ...
    }
    def getInsertStatement[A](a: A): Either[DatabaseError, Statement] = {
        ...
    }
    def run(someStatement: Statement): Either[DatabaseError, Unit] = {
        ....
    }
}
```

This is great but there is a better way to do all of this :O

I know right? Crazy!

## Cats Xor

Cats has something even better than Either — Xor. Xor has extra utility functions that I will not be going into here because one can view them in the documentation. But the biggest improvement from Either to Xor is the fact that .map and .flatMap are right-biased. What this means is that instead of doing .right like we did with Either, Cats assumes that you want the right value. No pun intended.

My favorite thing about Xor is that it infects every type it touches. So when you’re using it with another type, it wraps the other type with Xor. It makes sense — all error-prone code that touches other code is also error-prone.

## Try

This is all great for your own errors that use either Xor or Either. But what happens if you’re calling a function that was written by a someone that doesn’t know about Xor or Either and throws an exception?

The following is allowed in Scala. But it’s just like “Array” in that it exists just as a way to be easily compatible with Java code.

```
try {
    someFunctionThatThrowsAnException()
} catch(someException) {
}
```

A better way of doing this is to use the Try class in scala.util.

```
Try {
    someFunctionThatThrowsAnException()
} match {
    case Success(v) => doSomething()
    case Failure(someFailure) => doSomethingElse(someFailure)
}
```

That’s pretty much that. What I just described is all the error handling techniques that I use on a day to day basis coding in Scala.

I’m still new to Scala so I might have made a mistake or perhaps there is a better way to do these things. To my knowledge, this is the best way to do it.

Please feel free to respond with feedback or recommend this to your friends coding in Scala!

If you’d like to talk about this, tweet at me!

:wq and peace

There seems to be an equivalent in Scalaz called `\/`. However, only issue for me is that I haven’t really ever used Scalaz so I don’t know enough about `\/` to write about it here :( (Thanks to runT1ME for the tip on Twitter)

According to /u/ItsNotMineISwear on [the Reddit thread for this post](https://www.reddit.com/r/scala/comments/50vyop/functional_error_handling_in_scala/), Either will become right-biased in Scala version 2.12. I’m so excited!
