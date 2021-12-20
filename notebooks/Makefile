CONVERTER=./converter.py

.PHONY: all

all: hello-robot ml paper-reading blog cooking book


hello-robot:
	$(CONVERTER) --nbpath hello_robot.ipynb --date 2021-04-29 \
		--description "Robots, robots, everywhere. Bayesian Recursive Filtering. Gaussian Distribution" --tag Notebook

cooking:
		$(CONVERTER) --nbpath cooking.ipynb --date 2021-04-29 \
			--description "Love delicious food..." --tag Notebook

ml: machine-learning-summary machine-learning-pytorch machine-learning-loss machine-learning-backpropagation \
	machine-learning-gradient-descent machine-learning-learning-rate-scheduling

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
machine-learning-gradient-descent:
	$(CONVERTER) --nbpath machine-learning-gradient-descent.ipynb --date 2021-05-13 \
		--description "Machine Learning Notes - gradient descent, SGD, Momentum, RMSProp, Adam" --tag ML
machine-learning-learning-rate-scheduling:
	$(CONVERTER) --nbpath machine-learning-learning-rate-scheduling.ipynb --date 2021-06-12 \
		--description "Machine Learning Notes - learning rate scheduler" --tag ML


paper-reading: paper-reading-mixture-models-for-least-square-optimization

paper-reading-mixture-models-for-least-square-optimization:
	$(CONVERTER) --nbpath paper-reading-mixture-models-for-least-square-optimization.ipynb --date 2021-05-11 \
		--description "Paper Reading - Gaussian mixture models and robust kernels for least square optimization" --tag PaperReading

blog: expectation–maximization factor-graph grid-mapping mutual-information

expectation–maximization:
	$(CONVERTER) --nbpath expectation–maximization.ipynb --date 2021-05-10 \
		--description "Expectation maximization" --tag Notebook

factor-graph:
	$(CONVERTER) --nbpath factor-graph.ipynb --date 2021-05-24 \
		--description "Factor graph - Square-root SAM, iSAM, iSAM2, AprilSAM" --tag Notebook

grid-mapping:
	$(CONVERTER) --nbpath grid-mapping.ipynb --date 2021-05-25 \
		--description "Grid map, Occupancy grid map, Semantic map" --tag Notebook

inertial-navigation:
	$(CONVERTER) --nbpath inertial-navigation-system.ipynb --date 2021-12-15 \
		--description "Inertial Navigation System" --tag Notebook

rigid-body-transformation:
	$(CONVERTER) --nbpath rigid-body-transformation.ipynb --date 2021-12-18 \
		--description "Rigid Body Transformation" --tag Notebook

stereo-rectification:
	$(CONVERTER) --nbpath stereo-rectification.ipynb --date 2021-12-19 \
		--description "Stereo rectification" --tag Notebook


mutual-information:
		$(CONVERTER) --nbpath mutual-information.ipynb --date 2021-06-03 \
			--description "Entropy, Cross Entropy, Conditional Entropy, Joint Entropy, Mutual Information" --tag Notebook

book: autonomous-robots-summary autobot-linear-algebra

autonomous-robots-summary:
	$(CONVERTER) --nbpath autonomous-robots-summary.ipynb --date 2021-05-24 \
		--description "Autonomous robots" --tag Book

autobot-linear-algebra:
	$(CONVERTER) --nbpath autobot-linear-algebra.ipynb --date 2021-05-28 \
		--description "Autonomous robots - Linear algebra" --tag Book
