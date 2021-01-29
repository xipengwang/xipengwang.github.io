---
layout: post
title: Stereo Rectification for two cameras are mounted on top of each other not side by side
---
![Stereo Rectification]({{site.baseurl}}/images/2021-01-09-stereo-rectification/stereo.png)

Like eyes, we can use a stereo camera to perceive distance (i.e. depth information) of objects in the scene [3D
Viewer](http://www-personal.umich.edu/~xipengw/random/stereo-rectification.html). This is done by matching pixels from
the same point in two images captured by two cameras. As shown in the image below, if we know two pixels (two small
yellow balls on the cyan plane) are from the same yellow ball in 3D world, we can easily find the intersection point of
two yellow lines.

![Stereo Rectification]({{site.baseurl}}/images/2021-01-09-stereo-rectification/non-rectify-stereo.png)

Normally we need to search on a 2D plane to find the matching pixels. However, if we know the relative position and
orientation of two cameras, this is actually reduced to be a search just in 1D. It is because the left yellow line (i.e.
ray) which points from the left camera to the yellow ball is projected as a line in the right image. Thus, we only need
to search on this line to find the matching pixel to the yellow pixel in the left image. This line is called the
epipolar line. If you play with the 3D viewer, you will see that this epipolar line is not parallel to camera x-axis.
Matching process will be much easier if we can make the epipolar line parallel to the camera x-axis so that the matching
pixels are always at the same row in the images (as shown in the image below). This is called stereo rectification.

![Stereo Rectification]({{site.baseurl}}/images/2021-01-09-stereo-rectification/rectify-stereo.png)

This problem came into my mind when I was thinking about a pose estimation problem using Homography. I scratched some
ideas on the paper but I wasn't sure whether they were correct or not. Then I checked some materials online to verify my
ideas, and found that my ideas match their approaches but not their math. In addition, lots of online materials assume
both cameras have the same focal length and state this doesn't lose generality. But why are you doing this even though
you know two cameras are very unlikely to have exactly the same focal length? Anyway, I think I have to write a program
to verify my thoughts. I am sharing the [3D
viewer](http://www-personal.umich.edu/~xipengw/random/stereo-rectification.html) and
[code](https://github.com/xipengwang/RandomHacks/tree/main/stereo-rectification) here, and hopefully this helps people
understand stereo rectification better. This post is by no means to give you a comprehensive explanation of how stereo
rectification works in math as I think the code itself explains it. I am just sharing (writing down) ideas I had back
then.

The idea is actually quite simple. I am trying to set two virtual cameras by purely rotating both left and right cameras
to generate two virtual image plane shown as blue. They are virtual because the pixels in the virtual images are sampled
from original images.

![Stereo Rectification]({{site.baseurl}}/images/2021-01-09-stereo-rectification/both-cameras.png)

What are constraints two virtual cameras have to satisfy? First, there should be no relative orientation change between
two cameras. Suppose originally the relative orientation is $R^l_r$, we can fix the left camera and rotate the right
camera by ${R^l_r}^T$ to remove the relative orientation change. Second, the yellow line connecting two cameras should
be parallel to both blue images, normally parallel to the x-axis of the cameras. We need to find a $R^{rect}_l$ to
rotate both cameras. Finally the left camera is rotated by $R^{rect}_l$ and the right camera is rotated by
$R^{rect}_lR^l_r$. For getting pixels for the virtual image, you need the homography equations below ($H^1_2 = R^1_2$).

> $$
\begin{bmatrix}
x_1\\
y_l \\
z_1
\end{bmatrix} =
R^1_2 \begin{bmatrix}
x_2\\
y_2 \\
z_2
\end{bmatrix}
$$
>
> $$
\begin{bmatrix}
u_1\\
v_l \\
1
\end{bmatrix} =
R^1_2 \begin{bmatrix}
u_2\\
v_2 \\
1
\end{bmatrix}
$$


Now back to the title question: **How does stereo rectification work when two cameras are mounted on top of each other
not side by side?** If you **let the yellow line (displacement vector of two cameras) to be parallel to x-axes of the
cameras**, you will see virtual cameras rotate exactly 90 degrees when we actually already have a perfect setup of the
stereo camera. The consequence is that you will see the world in virtual images are rotated 90 degrees as well. Here
comes a quiz question: what can we change to make the images not rotated (hint: epipolar lines should be parallel to
y-axes of the cameras)?

![Stereo Rectification]({{site.baseurl}}/images/2021-01-09-stereo-rectification/v-cameras.png)
