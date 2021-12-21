---
layout: post
title: A Simple Connection Between Schur Complement Trick and Marginalization+Conditioning of Gaussian Distribution
tag: Legacy-Deprecated
---
![Gaussian Marginalization and Conditioning]({{site.baseurl}}/images/2021-01-21-gaussian-marginalization/gaussian.png)

Have you ever heard of factor graph and bundle adjustment? Have you ever heard of variable orderings and Schur
Complement in SLAM? This article is inspired by a true story. After talking about research I have done related to factor
graphs to a person for 10 minutes, he asked me what is the difference between factor graph and bundle adjustment. In my
opinion, there are no differences, but I do think the factor graph is the better way to formulate the optimization
problem. This makes me realize that sometimes people are doing the same thing but calling it in different ways.

In this article, I will explain the connection among Schur Complement, Marginalization+Conditioning of Gaussian
Distribution and variable orderings.

Now suppose we finally get the linear equation $Ax = b$ from a SLAM problem, where $A$ is a square matrix. Let's put it
into information form. $\Lambda_{cc}$ is a MxM matrix and $\Lambda_{ll}$ is a NxN matrix.

> $$
\begin{bmatrix}
\Lambda_{cc} & \Lambda_{cl} \\
\Lambda_{lc} & \Lambda_{ll}
\end{bmatrix}
\begin{bmatrix}
\mu_c \\
\mu_l
\end{bmatrix}=
\begin{bmatrix}
\eta_c \\
\eta_l
\end{bmatrix}
$$

Schur Complement trick tells us that we can find $\mu_c$ and $\mu_l$ by inverting two MxM and NxN matrices instead of
inverting a (M+N) x (M+N) matrix. The Schur Complement trick will first find camera positions $\mu_c$, and then find
landmark positions $\mu_l$. Actually, Schur Complement is actually doing following:

> $$ p(c, l) = p(c) * p(l|c) $$

It first marginalizes landmarks l to get p(c), then find l conditioned on camera poses c. How? You need think p(c, l)
follows the Gaussian distribution in information form:

> $$
p(c, l) \sim (\begin{bmatrix}
\eta_c \\
\eta_l
\end{bmatrix}, \begin{bmatrix}
\Lambda_{cc} & \Lambda_{cl} \\
\Lambda_{lc} & \Lambda_{ll}
\end{bmatrix} )
$$

Then you can use marginalization and conditioning of Gaussian distribution shown in the first image (I hope you can
understand my hand writings below)

![Gaussian Marginalization and Conditioning]({{site.baseurl}}/images/2021-01-21-gaussian-marginalization/handdrawing.png)

Now let's think about variable orderings. If you don't know basic graph based SLAM, you may get very confused about what
I am talking about. When we solve $Ax=b$, we normally do cholesky decomposition on sparse matrix $A$. If you try to do
cholesky decomposition on following matrix, it will take a really long time if the matrix is very large, i.e. you have
lots of camera poses and landmarks. You will get a very dense triangular matrix.

> $$
\begin{bmatrix}
\Lambda_{cc} & \Lambda_{cl} \\
\Lambda_{lc} & \Lambda_{ll}
\end{bmatrix}
$$

However, if you reorder the variables (linear equations), it will take you less time. You will get a sparse triangular
matrix.

>$$
\begin{bmatrix}
\Lambda_{ll} & \Lambda_{lc} \\
\Lambda_{cl} & \Lambda_{cc}
\end{bmatrix}
$$

Do you notice the differences? In the second matrix, we put landmarks first. Yeah, this seems similar to
marginalization. I view cholesky decomposition as a marginalization process. So I am asking myself a question: Do we
really need Shur Complement? Since $\Lambda_{ll}$ is very sparse, cholesky decomposition may take similar time as
inverting a banded matrix. But I am not sure.

Here is a quick quiz if you get the idea of marginalization. Can you think of a way to do bundle adjustment in a sliding
window? Or incremental smoothing and mapping? You can find solutions in two papers: **[Direct Sparse Odometry](https://arxiv.org/pdf/1607.02565.pdf)** and **[AprilSAM:
Real-time Smoothing and Mapping](https://april.eecs.umich.edu/papers/details.php?name=wang2018aprilsam)**
