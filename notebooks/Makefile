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

blog: expectation–maximization factor-graph grid-mapping mutual-information inertial-navigation rigid-body-transformation \
	stereo-rectification gaussian-distribution-marginalization lie-theory torque continuous-time-estimation c_plus_plus \
	docker imap camera gaussian-process lvm


lvm:
	$(CONVERTER) --nbpath language-vision-model.ipynb --date 2023-04-01 \
		--description "Language vision model" --tag Notebook


gaussian-process:
	$(CONVERTER) --nbpath gaussian_process.ipynb --date 2022-04-01 \
		--description "Gaussian process for ground height prediction" --tag Notebook

symforce:
	$(CONVERTER) --nbpath symforce.ipynb --date 2022-12-31 \
		--description "Symforce basics" --tag Notebook

camera:
	$(CONVERTER) --nbpath camera.ipynb --date 2022-04-26 \
		--description "Camera basics" --tag Notebook

imap:
	$(CONVERTER) --nbpath imap.ipynb --date 2022-04-26 \
		--description "Implicit Mapping with DNN" --tag Notebook

docker:
	$(CONVERTER) --nbpath docker_tutorial.ipynb --date 2022-04-25 \
		--description "Docker Tutorial" --tag Notebook

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

gaussian-distribution-marginalization:
	$(CONVERTER) --nbpath gaussian_distribution_marginalization.ipynb --date 2021-12-20 \
		--description "Marginalization and Conditioning of Gaussian Distribution" --tag Notebook

lie-theory:
	$(CONVERTER) --nbpath lie-theory.ipynb --date 2021-12-31 \
		--description "Lie Theory for State Estimation in Robotics" --tag Notebook

torque:
	$(CONVERTER) --nbpath torque.ipynb --date 2022-01-02 \
		--description "Torque and Angular Momentum" --tag Notebook

continuous-time-estimation:
	$(CONVERTER) --nbpath continuous-time-estimation.ipynb --date 2022-01-20 \
		--description "Continuous-time Estimation" --tag Notebook

covariance-visualization:
	$(CONVERTER) --nbpath covariance-visualization.ipynb --date 2022-01-02 \
		--description "Covariance Visualization" --tag Notebook

mutual-information:
		$(CONVERTER) --nbpath mutual-information.ipynb --date 2021-06-03 \
			--description "Entropy, Cross Entropy, Conditional Entropy, Joint Entropy, Mutual Information" --tag Notebook

c_plus_plus:
	$(CONVERTER) --nbpath c_plus_plus_notes.ipynb --date 2022-02-02 \
		--description "C plus plus notes." --tag Notebook

book: autonomous-robots-summary autobot-linear-algebra

autonomous-robots-summary:
	$(CONVERTER) --nbpath autonomous-robots-summary.ipynb --date 2021-05-24 \
		--description "Autonomous robots" --tag Book

autobot-linear-algebra:
	$(CONVERTER) --nbpath autobot-linear-algebra.ipynb --date 2021-05-28 \
		--description "Autonomous robots - Linear algebra" --tag Book

hand-eye:
	$(CONVERTER) --nbpath hand_eye.ipynb --date 2025-02-02 \
		--description "Hand-eye Calibration" --tag Notebook
