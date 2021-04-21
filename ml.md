---
layout: page
title: ML
permalink: /ml/
---

# ML resource - 04/10/2021

* [UM course](https://web.eecs.umich.edu/~justincj/teaching/eecs498/FA2020/schedule.html)
* [FastAI](https://www.fast.ai)
    * [ColabNotes](https://course.fast.ai/start_colab#Opening-a-chapter-of-the-book)
* [Coursera](https://www.coursera.org/specializations/deep-learning?utm_source=gg&utm_medium=sem&utm_campaign=17-DeepLearning-US&utm_content=17-DeepLearning-US&campaignid=904733485&adgroupid=45435009112&device=c&keyword=online%20deep%20learning%20classes&matchtype=b&network=g&devicemodel=&adpostion=&creativeid=415429156977&hide_mobile_promo&gclid=Cj0KCQjwmcWDBhCOARIsALgJ2QfTu8RHi7jvlXEkp89ACUyVj1b1epsH21Up42e0rSNyuuWZx793bOkaAtMTEALw_wcB)

---
Note:
- Working on assignment 1
    * ```
    tensor = torch.tensor([[1,2,3], [3,2,1]])
    tensor.shape,
    tensor.dim(),
    type(tensor),
    x = tensor[2, 2].item()
    tensor.dtype = torch.float32, float64, int32, int64
    x = torch.zeros(2, 2),
    x = torch.zeros(2, 2, dtype=torch.float32)
    x = torch.zeros_like(tensor) # same dtype, shape
    x = torch.zeros(6, 7).to(tensor) # same dtype as tensor
    tensor.new_zeros(3,4) # same dtype
    torch.ones(2, 2),
    torch.rand(2, 2),
    torch.eye(3)
    torch.full([x,y,z], 3.1415926)
    tensor.to(torch.float32)
    tensor.float(), tensor.double(), tensor.long()
    torch.eye(3, dtype=torch.float64)
    torch.arange()
    torch.linspace()
    tensor[start:stop:step] # slice
    tensor[[1,2], [2,3]]
    x[:, 1] vs. x[:, 1:2] #using an integer will reduce the rank by one, and using a length-one slice will keep the same rank
    tensor.clone()
    a[idx0, idx1] = torch.tensor([ a[idx0[0], idx1[0]], a[idx0[1], idx1[1]], ..., a[idx0[N - 1], idx1[N - 1]]])
    tensor.view(2,2,2)
    tensor.t(1, 2)
    x1 = x0.permute(1, 2, 0) # x1[1,2,0] = x0[0,1,2], x0[3,4,5] = x1[4,5,3]
    torch.add()
    tensor.add(tensor)
    tensor + tensor
    torch.sub()
    torch.mul() # elemwise
    torch.div() # elemwise
    torch.pow() # elemwise
    torch.sum(x, dim=0) #sum each over row.
    torch.dot() # vector dot product
    torch.mm() # matrix matrix
    torch.mv() # matrix vector
    torch.addmm(), torch.addmv()
    torch.bmm(), torch.baddmm()
    torch.matmul()
    torch.stack()
    tensor.cuda()
    tensor.cpu()
    torch.tensor([[1, 2, 3], [4, 5, 6]], dtype=torch.float64, device='cuda')
    ```

- Lecture 5, Neural Networks
    * d
