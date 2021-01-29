---
layout: post
title: Autonomous Robots - Linear Algebra
tag: AutonomousRobotsBook
excerpt_separator: <!--more-->
comments: true
---
<!--more-->
Back in college, I felt Linear Algebra is so tedious and boring. What is the point of spending ten minutes inverting a
 matrix on a piece of paper? I realized how elegant it is after watching Prof.Gilbert Strang's Linear Algebra videos. So
 I highly recommend you to watch them. Here is a short interview of Gil. I hope you enjoy the beauty of SVD.

<div class="ytcontainer">
<iframe class="yt" src="https://www.youtube.com/embed/YPe5OP7Clv4" frameborder="0" allowfullscreen></iframe>
</div>

This post only covers I guess a minimal number of subjects of Linear Algebra required for autonomous robots. I will add
more later if I realize I miss something.

---

## Vectors

#### ![robot]({{site.baseurl}}/images/robot.png) -- Vector Representations
A two-dimensional vector $\textbf{v} \in \mathbb{R}^2$ can be written as a column vector:
> $$
\textbf{v} = \begin{bmatrix}
v_1 \\
v_2
\end{bmatrix}
$$

It can represent:
 * **direction and magnitude**, e.g. the velocity of a point on a robot
 * **position**, e.g. the position of a point on a robot

#### ![robot]({{site.baseurl}}/images/robot.png) -- Vector Operations
* Scaling
> $\lambda \textbf{v}$
* Linear combinations
> $\alpha\textbf{v} + \beta\textbf{w}$
* Dot product
> $\textbf{v}.dot(\textbf{w}) = \textbf{v}^T \textbf{w} = v_1w_1+\cdots+v_nw_n$, where $v,w \in \mathbb{R}^n$
> $\|\textbf{v}.dot(\textbf{w})\| = \|\textbf{v}\|\|\textbf{w}\|cos(\theta)$, where $\theta$ is the angle between two vectors.
* Cross product of vectors in $\mathbb{R}^3$
> $$\textbf{v}.cross(\textbf{w}) =
\begin{bmatrix}
0, -v_3, v_2\\
v_3, 0, -v_1 \\
-v_2, v_1, 0
\end{bmatrix}
\begin{bmatrix}
w_1 \\
w_2 \\
w_3 \\
\end{bmatrix}
$$
> $\|\textbf{v}.cross(\textbf{w})\| = \|\textbf{v}\|\|\textbf{w}\|sin(\theta)$, where $\theta$ is the angle between two vectors.

#### ![robot]({{site.baseurl}}/images/robot.png) -- Examples of Vectors Operations in Robotics
* Scaling

  Starting at $O$, robot moves at a constant speed $\textbf{v}$. After $\Delta t$, the robot will be
  at $O + {\Delta t}\textbf{v}$

* Linear combinations

  Starting at $O \in \mathbb{R}^2$, robot moves at a constant speed $\dot{x} = \textbf{v}$ in $x$
  direction and $\dot{y} = \textbf{w}$ in $y$ direction.
  After $\Delta t$, the robot will be at $O + {\Delta t}\textbf{v} + {\Delta t}\textbf{w}$

* Dot product

  Find two lines seen from the robot are parallel or not. If so,
  $1 = cos(\theta) = \frac{\|\textbf{v}.dot(\textbf{w})\|}{|\\textbf{v}\||\\textbf{w}\|}$
  > Pop quiz: How can you figure whether a point is inside a rectangle or not?

* Cross product of vectors in $\mathbb{R}^3$

  $v = \omega.cross(R)$, where $v$ is the linear velocity and $\omega$ is the angular velocity

  > Pop quiz: Find the shortest distance from a point to a line.


## Matrices and Linear Equations
#### ![robot]({{site.baseurl}}/images/robot.png) -- Matrix Representations
A $2 \times 2$ matrix can be written as a collection of two column vector
$\textbf{v} \in \mathbb{R}^2$, $\textbf{w} \in \mathbb{R}^2$:
>$$
\begin{bmatrix}
a_{11}, a_{12} \\
a_{21}, a_{22}
\end{bmatrix} =
\begin{bmatrix}
\textbf{v}, \textbf{w}
\end{bmatrix}
$$

Similarly, a $3 \times 3$ matrix can be written as a collection of three column
vector  $\textbf{u} \in \mathbb{R}^3$, $\textbf{v} \in \mathbb{R}^3$, $\textbf{w} \in \mathbb{R}^3$:
>$$
\begin{bmatrix}
a_{11}, a_{12}, a_{13} \\
a_{21}, a_{22}, a_{23} \\
a_{31}, a_{32}, a_{33}
\end{bmatrix} =
\begin{bmatrix}
\textbf{u}, \textbf{v}, \textbf{w}
\end{bmatrix}
$$

![attention]({{site.baseurl}}/images/attention.gif) **In this post, we will only
discuss about $m \times m$ matrix. Without considering numerical issues, knowing
properties of $m \times m$ is enough for us solving all kinds of linear
equations.**

#### ![robot]({{site.baseurl}}/images/robot.png) -- Matrix Operations
* Matrix multiplication
> $A_{mm}B_{mm}$

* Matrix times vector as a linear combination of all column vectors
> $$
A\textbf{x} = \begin{bmatrix}
a_{11}, a_{12}, a_{13} \\
a_{21}, a_{22}, a_{23} \\
a_{31}, a_{32}, a_{33}
\end{bmatrix} \begin{bmatrix}
{x_1}\\ {x_2}\\ {x_3}
\end{bmatrix} =
\begin{bmatrix}
\textbf{u}, \textbf{v}, \textbf{w}
\end{bmatrix} \begin{bmatrix}
{x_1}\\ {x_2}\\ {x_3}\\
\end{bmatrix} = x_1\textbf{u} +  x_2\textbf{v}, x_3\textbf{w}
$$

* Matrix inverse
> $A_{mm}A_{mm}^{-1} = I$

![attention]({{site.baseurl}}/images/attention.gif) For [orthogonal matrix](https://en.wikipedia.org/wiki/Orthogonal_matrix), $Q^{-1} = Q^{T}$

#### ![robot]({{site.baseurl}}/images/robot.png) -- Matrix Properties
* Linear independence

$\textbf{u}, \textbf{v}, \textbf{w}$ **are linear independent if and only if there
doesn't exist non-zero** $\textbf{x}$ such that:
> $$
\begin{bmatrix}
\textbf{u}, \textbf{v}, \textbf{w}
\end{bmatrix} \begin{bmatrix}
{x_1}\\ {x_2}\\ {x_3}\\
\end{bmatrix} = x_1\textbf{u} +  x_2\textbf{v}, x_3\textbf{w} = \textbf{0}
$$

* Determinant and rank

For matrix $A_{mm} = [\textbf{v}_1, \cdots, \textbf{v}_m]$,
> $rank(A) = m \iff det(A) \neq 0 \iff \textbf{v}_1, \cdots, \textbf{v}_m\ are\ linear\ independent$
> $rank(A) < m \iff det(A) = 0 \iff \textbf{v}_1, \cdots, \textbf{v}_m\ are \ linear\ dependent$

#### ![robot]({{site.baseurl}}/images/robot.png) -- Linear Equations in Matrix Form

Linear equations can be written in matrix form $A\textbf{x}=\textbf{b}$.
> $$
a_{11}x_1 + a_{12}x_2 + a_{13}x_3 = b_1\\
a_{21}x_1 + a_{22}x_2 + a_{23}x_3 = b_2\\
a_{31}x_1 + a_{32}x_2 + a_{33}x_3 = b_3
$$

> $$
\begin{bmatrix}
a_{11}, a_{12}, a_{13} \\
a_{21}, a_{22}, a_{23} \\
a_{31}, a_{32}, a_{33}
\end{bmatrix} \begin{bmatrix}
{x_1}\\ {x_2}\\ {x_3} \end{bmatrix}=
\begin{bmatrix}
{b_1}\\ {b_2}\\ {b_3} \end{bmatrix}
$$

## Solve $A\textbf{x}=\textbf{b}$
#### ![robot]({{site.baseurl}}/images/robot.png) -- How many solutions?
#### ![robot]({{site.baseurl}}/images/robot.png) -- Pseudo Inverse
#### ![robot]({{site.baseurl}}/images/robot.png) -- Cholesky Decomposition
#### ![robot]({{site.baseurl}}/images/robot.png) -- Singular Value Decomposition (SVD)
