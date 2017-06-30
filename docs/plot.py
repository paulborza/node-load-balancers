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

plt.rc('text', usetex=True)
plt.rc('font', family='serif', serif='Computer Modern Roman')

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4), sharey=True)

fig.suptitle('Don\'t use a random load balancer!', fontsize=18)
fig.subplots_adjust(top=0.8)

for ax in [ax1, ax2]:
    ax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda y, _: '{:.2f}\%'.format(y * 100)))

bins = np.arange(5)

plt.ylim([0.19, 0.21])

ax1.bar(bins, random_balancer, bar_width, alpha=0.8,
    color='orangered')
ax2.bar(bins + bar_width, p2c_balancer, bar_width, alpha=0.8,
    color='limegreen')

ax1.set_title('Random load balancer', fontsize=14)
ax2.set_title(r'Power of two choices load balancing algorithm', fontsize=14)

for ax in [ax1, ax2]:
    ax.axhline(y=0.2, linestyle='dashed',
        color='green', label='Ideal load balancer')

plt.xticks(bins + bar_width, ('1', '2', '3', '4', '5'))

ax2.yaxis.tick_right()
ax2.yaxis.set_label_position('right')

for ax in [ax1, ax2]:
    ax.set_ylabel('Traffic')
    ax.set_xlabel('Proxies')
    ax.legend(frameon=False)

plt.savefig('comparison.png', dpi=400)
