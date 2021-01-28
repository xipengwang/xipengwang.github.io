---
layout: post
title: Robots, Robots, Everywhere!
---
"On the ground, in the air, robots, robots, everywhere! Up in space, beneath
the seas, robots make discoveries."

> $$Bel(x_t) = p(x_t | z_{1:t})$$

> $$Bel(x_t) = \frac{1}{\eta} p(z_t|x_t)\int{p(x_t|x_{t-1})Bel(x_{t-1})}dx_{t-1}$$

> $$\eta=p(z_t|z_{1:t-1})=\int{p(z_t|x_t)p(x_t|z_{1:t-1})}dx_t$$

> $$X \sim \mathcal{N}(\mu,\,\Sigma)$$

> $$P(x) = \frac{e^{-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)}}{\sqrt{((2\pi)^k|\Sigma|}}$$
