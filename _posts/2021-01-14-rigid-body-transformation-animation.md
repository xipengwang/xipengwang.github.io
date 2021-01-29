---
layout: post
title: Rigid Body Animation
---
![Rigid Body Animation]({{site.baseurl}}/images/2021-01-14-rigid-body-transformation-animation/rigid_body_transformation.gif)

After watching a video about robot manipulation, I decided to write something about rigid body transformation this week
because I learned a new thing.

Let's start discussing with pure rotation. There are two different ways to use a rotation matrix $R$:

* Use $R$ to represent robot's orientation, like $R_{wb}$ where $w$ is world frame and $b$ is body frame
* Use $R$ to rotate a vector or a rotation matrix, e.g. $Rv_{w}$ ($v_{w}$ is a vector expressed in $w$), $RR_{wb}$, and
  $R_{wb}R$.


I found this is interesting because I have never really thought about the differences between $RR_{wb}$ and $R_{wb}R$
though I actually use one of them a lot. Have you?

I will first put my summary here. If you already know this and can think of an idea to animate a rigid body
transformation, you probably don't need to continue reading this article.

* $RR_{wb}$ rotates $R_{wb}$ in $w$ frame
* $R_{wb}R$ rotates $R_{wb}$ in $b$ frame

In the video below, I show how to rotate a frame in $w$ and $b$ to get the same pose. Cyan represents rotations in $w$
frame and purple represents rotations in $b$ frame. We rotate $45$ degrees for roll, pitch and yaw respectively.
Essentially, for rotating in $w$ frame, we are doing $R_{roll}R_{pitch}R_{yaw}I$, where $I$ is identity matrix, while
for rotating in $b$ frame, we are doing $IR_{roll}R_{pitch}R_{yaw}$. Do you see the difference? When you want to rotate
a frame around an axis in $w$ frame, you multiply rotation matrices on the left in sequence.

<div class="ytcontainer">
<iframe class="yt" src="https://www.youtube.com/embed/-6K4vX8zhkI" frameborder="0" allowfullscreen></iframe>
</div>

Now we let's think about both rotation and translation. Actually it is the same. $TT_{wb}$ rotates $T_{wb}$ in $w$ frame
while $T_{wb}T rotates T_{wb}$ in $b$ frame. As shown in the video below, you won't get the same pose from $TT_{wb} and
T_{wb}T$. Cyan represents rotations in $w$ frame and purple represents rotations in $b$ frame.

<div class="ytcontainer">
<iframe class="yt" src="https://www.youtube.com/embed/lpMTixuvteY" frameborder="0" allowfullscreen></iframe>
</div>

Back to the title question, how do animate a rigid body transformation? I actually break $T$ into two parts: $T =
T_{trans}T_{rot}$. $T_{trans}$ is a pure translation and $T_{rot}$ is a pure rotation. So I can animate the rigid body
transformation in two steps with a linear velocity and angular velocity separately.

But can you animate it with a velocity containing both linear velocity and angular velocity? This was the new thing I
learned which is called Twist. Like angular velocity can be represented by a $3x1$ vector, twist can be represented by a
6x1 vector. In the video below, I first show how to move the purple frame back to origin by translating and rotating in
its $b$ frame in two steps (quiz: can you think of how to do it?). Then I show an animation moving cyan frame back to
origin smoothly with a combined linear and angular velocity.

<div class="ytcontainer">
<iframe class="yt" src="https://www.youtube.com/embed/lcZtD6v0hNs" frameborder="0" allowfullscreen></iframe>
</div>

As usual, code is [here](https://github.com/xipengwang/RandomHacks/blob/main/transformation/transformation.ipynb).
