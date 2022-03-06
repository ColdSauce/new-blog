---
title: On Scala Case Classes and Companion Objects
date: 2016-09-08 01:30:00+09:00
tags: ['Scala']
summary: 'On Scala case classes and companion objects: Structuring your code in terms of case classes and companion objects is a great way to easily decouple your data and allow people to easily use it.'
aliases:
  - /2016/09/08/scala-case-classes/
---

Structuring your code in terms of case classes and companion objects is a great way to easily decouple your data and allow people to easily use it.

Here’s an example of where case classes are incredibly useful. Let’s say we want to solve an algorithm question. Knowing how this algorithm works isn’t really necessary to understand the concepts of this blog post but I just wanted to show how the abstraction works.

A shifted array is a sorted array that was shifted `n` number of times to the right. So `[1,2,3,4,5]` shifted 3 to the right would become `[3,4,5,1,2]`, `[2,3,4]` shifted to the right 1 time would become `[4,2,3]`, etc, etc. We need to write a function, `getIndexOf(n: Int)` that returns the index at which a number is located.

Let’s think about this in terms of abstraction. The end user shouldn’t know what’s going on behind the scenes to use this ShiftedArray data structure. She should just be able to call `getIndexOf(3)` on the data structure and it should just work. No need to worry about start indices, end indices, binary search, none of that. The end user doesn’t care. It’s just more needless stuff for them to think about.

How do we easily represent the ShiftedArray data structure? Case classes, of course!

```
case class ShiftedArray(vector: Vector[Int])
```

If you think about it, it makes sense. A shifted array’s internal data structure is a vector. We are just abstracting on top of it.

Now let’s say we have a regular sorted vector that we want to make a shifted array from with a rotated index. We can use a factory-like pattern with ShiftedArray’s companion object!

```
object ShiftedArray {
    def makeFromVector(vector: Vector[Int], amountShift: Int): ShiftedArray = {
        val splitArray = vector.splitAt(amountShift - 1)
        ShiftedArray(splitArray._2 ++ splitArray._1)
}
```

Now the end user can do the following:

```
val superCoolVector = Vector(2,3,4,5,6,7)
val amountToShift = 4
val shiftedArray = ShiftedArray.makeFromVector(superCoolVector, amountToShift)
```

Companion object functions are useful when one isn’t targeting a specific instance of an object but rather the idea of the object. For instance, `makeFromVector` did not require any specific instance of a ShiftedArray but rather it just fit in the object because it fit in with the idea of ShiftedArray we had.

This abstracts away the creation of the ShiftedArray. Now let’s look at how we can abstract away the idea of getting the index of a certain value.

If one wants to focus on a specific instance of a ShiftedArray, they would use case class functions to do that. Let’s try it out.

```
case class ShiftedArray(vector: Vector[Int]) {
  def getIndexOf(t: Int): Option[Int] = {
    val firstRotation = getFirstRotation(t)
    val twoSortedVectors = vector.splitAt(firstRotation)
    search(twoSortedVectors._1, t) orElse
    search(twoSortedVectors._2, t).map {
      index => index + twoSortedVectors._1.length
    }
  }
  private def binarySearch(vec: Vector[Int], lookingFor: Int, start: Int, end: Int): Option[Int] = {
    if(start > end) {
      return None
    }
    val mid = (start + end) / 2
    val midValue = vec(mid)
    if(midValue == lookingFor) {
      Some(mid)
    } else if(midValue < lookingFor) {
      binarySearch(vec, lookingFor, mid + 1, end)
    } else {
      binarySearch(vec, lookingFor, start, mid - 1)
    }
  }
  private def search(vec: Vector[Int], lookingFor: Int): Option[Int] = {
    binarySearch(vec, lookingFor, 0, vec.length)
  }
  private def getFirstRotation(lookingFor: Int): Int = {
    getFirstRotation(lookingFor, 0, vector.length)
  }
  private def getFirstRotation(lookingFor: Int, start: Int, end: Int): Int = {
    val mid = (start + end) / 2
    if(mid == 0) {
      mid
    } else if(vector(mid - 1) > vector(mid)) {
      mid
    } else if(vector(0) > vector(mid)){
      getFirstRotation(lookingFor, start, mid)
    } else {
      getFirstRotation(lookingFor, mid + 1, end)
    }
  }
}
```

All of these functions pertain to a specific index of the ShiftedArray. They all deal with the internal vector data structure. This is the reason they are in the case class and not in the companion object!

Now all the user of this ShiftedArray data structure has to do is the following:

```
val shiftedArray = ShiftedArray.makeFromVector(someVector, someRotation)
val index = shiftedArray.getIndexOf(someNumber)
```

This is a really versatile way of structuring your code. It allows you to easily create your code as though you were writing a library and it allows people to reason about your code a lot easier.

As with anything, there are times where you should use this design pattern and when you shouldn’t. Ultimately it’s up to you to decide whether this is useful for what you’re working on.
