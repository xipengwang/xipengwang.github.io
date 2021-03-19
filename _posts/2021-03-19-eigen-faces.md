---
layout: post
title: Eigen faces are cool [WIP] (template matching, linear classificaton, etc)
---

In [Covariance visualization]({% post_url 2021-03-08-covariance-visualization
%}), we have discussed that PCA is basically a way to project original data to a
different coordinate frame where variances along different axis in order. One
application of PCA is so called
[Eigenface](https://en.wikipedia.org/wiki/Eigenface). Suppose we have a $m
\times n$ matrix $A$ and each column is a face image $f \in \mathbb{R}^m$. If we
would like to get the covariances regarding the changes in faces, we would
compute the eigen values and vectors of $AA^T$(assume the mean is subtracted
and averaged by $n$, Note: eigen vectors are same to calculate the SVD's $U$ of $A$)

Then each eigen vector, e.g. $q_k$, is an axis of the new coordinate frame
expressed in the current coordinate frame. The below figure shows a
classification result using eigenfaces with only two training images. The first
row shows 2 training images. The second row shows two eigen vectors. Because the
eigen vectors have the same dimension as the original images, so we can visualize
them as faces, so called eigen faces. We can use these eigen faces to
reconstruct our training images. How? If we know $Q$ is the same as $U$ of $A =
U\Sigma V^T$. All faces are essentially a linear combination of $Q$. Say, if we
have an image $a$, a column in $A$, we can calculate the dot product between $a$
and $q_k$ to get the coefficients. If $q_k^T a = \lambda_k$, then $a =
\sum{\lambda_k q_k}$

![Eigen Faces]({{site.baseurl}}/images/2021-03-19-eigen-faces/eigenfaces.png)

For data compression, since we can reconstruct original faces based on eigen
faces, if some eigen faces have very small eigen values, we can just drop
them. So for a large collection of face images, we only need to store some eigen
faces and coefficients $\lambda_k = q_k^T a$.

For face recognition, we can get test images coefficients $\lambda_k$s and find
the closest image with most similar coefficients. Often time, we heard the idea
about using PCA to do feature dimension reduction and extraction. The assumption
is that different data categories are easier to separate or distinguish in the
direction with larger variance, though sometime this might not be true.
Nevertheless, we think similar faces are very likely have similar coefficients
and different faces tends to have different coefficients in the directions along
eigen vectors that have large eigen values.

As we are using dot product $q_k^T a$ to get $\lambda_k$, we can also think
about the template matching idea here. Template matching is the idea to figure
out how similar two images are. The dot product here is essentially the same as
template matching. The larger it is, the similar two images are. So the
coefficients $\lambda_k$ are how similar the images and eigenfaces are.

Then why do we want to talk about linear classification for images here? It is because we
can also view linear classification as a template matching problem. Often, we
learn linear classification $Wx+b$ as the figure below. We are trying to linearly
separate two or more categories. I am using [hinge
loss](https://en.wikipedia.org/wiki/Hinge_loss). The red line is
$W_{00}x + W_{01}y + b_0 = 0$ (using the first row of weight matrix $W$)
and the green line is $W_{10}x + W_{11}y + b_1 = 0$. All the green dots are
classified as green class while all red dots are classified as red class. The
training data are 8 larger points shown in the images (4 reds, 4 greens).

![Linear classification]({{site.baseurl}}/images/2021-03-19-eigen-faces/linear-classification.png)

$Wx$ can also be viewed as dot products between $w$ and $x$. So we can also
think of this as a template matching between $w$ and $x$. $w$ is the eigen face
here. The classification training process is essentially try to find each row of
weights $w$ to match one training categories most.

One thing is still seems weird. In the 2D case above, why do we have two lines
to separate the space? We only need one line. In other words, the weight matrix
$W$ can be $2 \times 1$ instead of $2 \times 2$. This is actually the idea of
Support Vector Machine.

![SVM]({{site.baseurl}}/images/2021-03-19-eigen-faces/svm-1.png)

Wait... It still seems not quite the same as I learned before. Why the soft
boundary lines don't go cross to some of points (support vectors)? I realize
that the support vector machine uses both hinge loss and $$\lambda
\|W\|$$. In SVM, this is so called maximizing classification margin. In linear
classification, this is so called regularization.

![SVM]({{site.baseurl}}/images/2021-03-19-eigen-faces/svm-2.png)


I feel it is interesting to finally connect all things together.
Code is [here](https://github.com/xipengwang/RandomHacks/tree/main/eigenfaces)
