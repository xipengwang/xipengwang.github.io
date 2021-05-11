CONVERTER=./converter.py

.PHONY: all

all: hello-robot ml paper-reading blog


hello-robot:
	$(CONVERTER) --nbpath hello_robot.ipynb --date 2021-04-29 \
		--description "Robots, robots, everywhere. Bayesian Recursive Filtering. Gaussian Distribution" --tag Notebook

ml: machine-learning-summary machine-learning-pytorch machine-learning-loss machine-learning-backpropagation

machine-learning-summary:
	$(CONVERTER) --nbpath machine-learning-summary.ipynb --date 2021-05-03 \
		--description "Machine Learning Notes" --tag ML

machine-learning-pytorch:
	$(CONVERTER) --nbpath machine-learning-pytorch.ipynb --date 2021-05-04 \
		--description "Machine Learning Notes - pytorch basics" --tag ML
machine-learning-loss:
	$(CONVERTER) --nbpath machine-learning-loss.ipynb --date 2021-05-07 \
		--description "Machine Learning Notes - loss functions, hinge loss(svm loss), softmax loss" --tag ML
machine-learning-backpropagation:
	$(CONVERTER) --nbpath machine-learning-backpropagation.ipynb --date 2021-05-07 \
		--description "Machine Learning Notes - gradient descent, backpropagation" --tag ML

paper-reading: mixture-models-for-least-square-optimization

mixture-models-for-least-square-optimization:
	$(CONVERTER) --nbpath paper-reading-mixture-models-for-least-square-optimization.ipynb --date 2021-05-11 \
		--description "Paper Reading - Gaussian mixture models and robust kernels for least square optimization" --tag PaperReading

blog: expectation–maximization

expectation–maximization:
	$(CONVERTER) --nbpath expectation–maximization.ipynb --date 2021-05-10 \
		--description "Paper Reading - Gaussian mixture models and robust kernels for least square optimization" --tag Notebook
