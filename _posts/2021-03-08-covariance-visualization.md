---
layout: post
title: Covariance Visualization and Principle Component Analysis(PCA)
tag: Legacy
---
![Rigid Body Animation]({{site.baseurl}}/images/2021-03-08-covariance-visualization/ellipse.png)

We have a $m \times n$ matrix $A$. Each column is a feature $f \in
\mathbb{R}^m$, and each row is a data sample that has $n$ features.
> $$
\begin{bmatrix}
f_1, f_2, \cdots, f_n
\end{bmatrix}_{m\times n}
$$

Then we can get a covariance matrix which represents correlation among different features.
>$$
M_{n \times n} = \begin{bmatrix}
f_1-\bar{f_1}, f_2-\bar{f_1}, \cdots, f_n-\bar{f_n}
\end{bmatrix}^T
\begin{bmatrix}
f_1-\bar{f_1}, f_2-\bar{f_1}, \cdots, f_n-\bar{f_n}
\end{bmatrix}
$$

Let's assume features $x$ follow Guassian distribution,
> $$
P(x) =
\frac{e^{-\frac{1}{2}x^TM^{-1}x}}{\sqrt{((2\pi)^k|M|}}
$$

Perform Eigen decomposition on $M$, we get $M = Q\Sigma Q^T$
>$$
P(x) =
\frac{e^{-\frac{1}{2}x^T(Q\Sigma Q^T)^{-1}x}}{\sqrt{((2\pi)^k|\Sigma|}} \\
= \frac{e^{-\frac{1}{2}x^TQ\Sigma^{-1}Q^Tx}}{\sqrt{((2\pi)^k|\Sigma|}}
$$

Set $$y = Q^Tx$$, then $y$ follows a Gaussian distribution as well.
>$$
P(y) =
= \frac{e^{-\frac{1}{2}y^T\Sigma^{-1}y}}{\sqrt{((2\pi)^k|\Sigma|}}
$$

$y^T\Sigma^{-1}y$ follows
[$\chi^2$](https://en.wikipedia.org/wiki/Chi-square_distribution) distribution.
For example, if $y \in \mathbb{R}^2$, and $\Sigma$'s diagonal elements are
$\sigma_1$ and $\sigma_2$. If we choose p-value as $0.05$ and degree of freedom
as $2$, based on
[table](https://ib.bioninja.com.au/higher-level/topic-10-genetics-and-evolu/102-inheritance/chi-squared-table.html),
we will get

>$$
y^T\Sigma^{-1}y = 5.99 \\
\frac{y_1^2}{\sigma_1^2} + \frac{y_2^2}{\sigma_2^2} = 5.99
$$

The equation is just an ellipse! But wait, this is an equation for $y$ but our
origin data are $x$, what should we do? Remember $y = Q^Tx$? Then we have $x =
Qy$. We can get $y$'s frame axes in $x$'s frame are $q_1$ and $q_2$.

What about PCA? What are the relations between PCA and Covariance Visualization?
Actually, I decide to talk about PCA in this post as well because we can re-use
the result we get above $P(y) = \frac{e^{-\frac{1}{2}y^T\Sigma^{-1}y}}{\sqrt{((2\pi)^k|\Sigma|}}$.

$\Sigma$ contains the variance information of $y$. If we want to reduce the
feature dimension, we may pick first couple of dimensions with big $\sigma$. We
still need to transform the data from $x$ to $y$ using $y=Q^Tx$. The matrix form
will be
> $$
\tilde{A}^T = Q^TA^T \\
\tilde{A}^T \approx Q[:, 0:k]^TA^T \\
\tilde{A}_{(m\times k)} \approx AQ[:, 0:k]
$$

Another way to view the dimension reduction probably is through this:
>$$
P(x) =
\frac{e^{-\frac{1}{2}x^TQ\Sigma^{-1}Q^Tx}}{\sqrt{((2\pi)^k|\Sigma|}} \\
= \frac{e^{-\frac{1}{2}x^T[q_1, q_2, \cdots, q_n]\Sigma^{-1}[q_1, q_2, \cdots, q_n]^Tx}}{\sqrt{((2\pi)^k|\Sigma|}}
$$

We can set $q_{k+1}, \cdots$ and $\sigma_{k+1}, \cdots$ to zeros (similar to
using Singular Value Decomposition to approximate a matrix), then we can
get the same results, I think.

Code is [here](https://github.com/xipengwang/RandomHacks/tree/main/covariance-visualization)
