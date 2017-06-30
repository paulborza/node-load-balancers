#!/usr/bin/env python
#
# Copyright (c) 2017-present Paul Borza
#
# This software may be modified and distributed under the terms
# of the MIT license. See the LICENSE file for details.
#

# brew cask install mactex
# pip install matplotlib numpy
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import os

bar_width = 0.35
random_balancer = (0.2016, 0.2008, 0.2017, 0.1943, 0.2016)
p2c_balancer = (0.2, 0.2001, 0.2, 0.1999, 0.2)

# IMPORTANT: matplotlib won't find latex otherwise.
os.environ['PATH'] = os.environ['PATH'] + ':/Library/TeX/texbin/'

# plt.rc('text', usetex=True)
plt.rc('font', family='serif')

fig, ax = plt.subplots()
ax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda y, _: '{:.1%}'.format(y)))

bins = np.arange(5)

plt.bar(bins, random_balancer, bar_width, alpha=0.8,
    color='orangered', label='Random Balancer')
 
plt.bar(bins + bar_width, p2c_balancer, bar_width, alpha=0.8,
    color='limegreen', label='The Power of 2 Choices (P2c) Balancer')

plt.axhline(y=0.2, linestyle='dashed',
    color='green', label=r'Ideal Load Balancer')

plt.title('Comparison of load balancers', fontsize=20, y=1.02)

plt.ylim([0.19, 0.21])
plt.ylabel('Traffic Percentage')

plt.xticks(bins + bar_width, ('1', '2', '3', '4', '5'))
plt.xlabel('Proxies')

plt.legend()
plt.savefig('errors.png')
