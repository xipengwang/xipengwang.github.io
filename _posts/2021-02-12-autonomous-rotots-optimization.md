---
layout: post
title: Autonomous Robots - Non-linear Optimization
tag: AutonomousRobotsBook
excerpt_separator: <!--more-->
last_modified_at: 2019-02-15
---
<!--more-->

* TOC
{:toc}

---
## Motivation

#### ![robot]({{site.baseurl}}/images/robot.png) -- Robot Arm Control (Non-linear Least Square)

* [Robot Arm Control Example]({% post_url 2021-01-02-robot-arm-control %})


#### ![robot]({{site.baseurl}}/images/robot.png) -- Line Fitting (Linear Least Square)
![line fitting]({{site.baseurl}}/images/2021-02-12-autonomous-robots-optimization/line_fitting.png)

> $$\textbf{x} =
\underset{\alpha,\ \beta \in \mathbb{R}^n}{\operatorname{argmin}}(\|\alpha
x_1 + \beta - y_1\|^2 + \|\alpha x_2 + \beta - y_2\|^2 + \|\alpha x_3 + \beta - y_3
\|^2 + \|\alpha x_4 + \beta - y_4\|^2) \\
= \underset{\alpha,\ \beta \in \mathbb{R}^n}{\operatorname{argmin}}(
(\begin{bmatrix} x_1, 1 \end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - y_1)^T(\begin{bmatrix} x_1, 1 \end{bmatrix} \begin{bmatrix} \alpha \\
\beta \end{bmatrix} - y_1) +
(\begin{bmatrix} x_2, 1 \end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - y_2)^T(\begin{bmatrix} x_2, 1 \end{bmatrix} \begin{bmatrix} \alpha \\
\beta \end{bmatrix} - y_2) \\ +
(\begin{bmatrix} x_3, 1 \end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - y_3)^T(\begin{bmatrix} x_3, 1 \end{bmatrix} \begin{bmatrix} \alpha \\
\beta \end{bmatrix} - y_3) +
(\begin{bmatrix} x_4, 1 \end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - y_4)^T(\begin{bmatrix} x_4, 1 \end{bmatrix} \begin{bmatrix}
\alpha \\ \beta \end{bmatrix} - y_4)
) \\ = \underset{\alpha,\ \beta \in \mathbb{R}^n}{\operatorname{argmin}}(
(\begin{bmatrix} x_1, 1 \\ x_2, 1 \\ x_3, 1 \\ x_4, 1\end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - \begin{bmatrix} y_1 \\ y_2 \\ y_3 \\ y_4 \end{bmatrix})^T
(\begin{bmatrix} x_1, 1 \\ x_2, 1 \\ x_3, 1 \\ x_4, 1\end{bmatrix}\begin{bmatrix} \alpha \\ \beta
\end{bmatrix} - \begin{bmatrix} y_1 \\ y_2 \\ y_3 \\ y_4 \end{bmatrix})
)
\\ = \underset{\alpha,\ \beta \in
\mathbb{R}^n}{\operatorname{argmin}}(\|A\begin{bmatrix} \alpha \\
\beta\end{bmatrix} - b\|^2)
$$

Check Pseudo Inverse in [Linear algebra]({% post_url
2021-01-29-autonomous-rotots-linear-algebra%}) to solve the minimization problem above.


## Gauss–Newton

#### ![robot]({{site.baseurl}}/images/robot.png) -- Gradient

#### ![robot]({{site.baseurl}}/images/robot.png) -- Jacobian Matrix

#### ![robot]({{site.baseurl}}/images/robot.png) -- Gauss-Newton Algorithm
