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

bar_width = 0.4
random_balancer = (99716, 100226, 100051, 99987, 100161, 99496, 100045, 99965, 100211, 100142)
p2c_balancer = (100001, 99999, 100000, 100000, 100000, 99999, 100002, 99999, 100000, 100000)

# IMPORTANT: matplotlib won't find latex otherwise.
os.environ['PATH'] = os.environ['PATH'] + ':/Library/TeX/texbin/'

plt.rc('text', usetex=True)
plt.rc('font', family='serif', serif='Computer Modern Roman')

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5), sharey=True)

fig.suptitle('1M requests routed to 10 proxies', fontsize=18)
fig.subplots_adjust(top=0.825)

for ax in [ax1, ax2]:
    ax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda y, _: '{:,.0f}'.format(y)))

bins = np.arange(10)

plt.ylim([99000, 101000])

ax1.bar(bins + bar_width, random_balancer, bar_width, alpha=0.8,
    color='orangered')
ax2.bar(bins + bar_width, p2c_balancer, bar_width, alpha=0.8,
    color='limegreen')

ax1.set_title('Random load balancer', fontsize=14)
ax2.set_title('Power of two choices load balancing algorithm', fontsize=14)

ax2.yaxis.tick_right()
ax2.yaxis.set_label_position('right')

for ax in [ax1, ax2]:
    ax.axhline(y=100000, linestyle='dashed',
        color='green', label='Ideal load balancer')

    ax.set_xticks(bins + 1.5 * bar_width)
    ax.set_xticklabels(range(1, 11))

    ax.set_ylabel('Requests')
    ax.set_xlabel('Proxies')

    ax.legend(frameon=False)

plt.savefig('comparison.png', dpi=400)
