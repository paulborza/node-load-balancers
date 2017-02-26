#!/usr/bin/env python

# brew cask install mactex
# pip install matplotlib numpy
import numpy as np
import matplotlib.pyplot as plt

bar_width = 0.35
random_balancer = (0.2016, 0.2008, 0.2017, 0.1943, 0.2016)
p2c_balancer = (0.2, 0.2001, 0.2, 0.1999, 0.2)

# plt.rc('text', usetex=True)
plt.rc('font', family='serif')
plt.subplots()

bins = np.arange(5)

plt.bar(bins, random_balancer, bar_width, alpha=0.8,
    color='b', label='Random Balancer')
 
plt.bar(bins + bar_width, p2c_balancer, bar_width, alpha=0.8,
    color='g', label='The Power of 2 Choices (P2c) Balancer')

plt.axhline(y=0.2, linestyle='dashed',
    color='g', label='Ideal load balancer')

plt.title('Comparison of load balancing algorithms')

plt.ylim([0.19, 0.21])
plt.ylabel(r'traffic percentage')

plt.xticks(bins + bar_width, ('1', '2', '3', '4', '5'))
plt.xlabel(r'proxies')

plt.legend()
plt.savefig('errors.png')
