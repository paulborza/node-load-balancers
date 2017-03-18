# Load balancers for Node

[![Build Status](https://img.shields.io/travis/paulborza/load-balancers/master.svg?style=flat)](https://travis-ci.org/paulborza/load-balancers)
[![Coverage Status](https://img.shields.io/coveralls/paulborza/load-balancers/master.svg?style=flat)](https://coveralls.io/r/paulborza/load-balancers?branch=master)
[![Dependency Status](https://img.shields.io/david/paulborza/load-balancers.svg?style=flat)](https://david-dm.org/paulborza/load-balancers)
[![Dev. Dependency Status](https://img.shields.io/david/dev/paulborza/load-balancers.svg?style=flat)](https://david-dm.org/paulborza/load-balancers?type=dev)
[![NPM version](https://img.shields.io/npm/v/load-balancers.svg?style=flat)](https://www.npmjs.com/package/load-balancers)

## Installation

```bash
npm install --save load-balancers
```

## Comparison of load balancers

- The Random Balancer is a bit chaotic; it doesn't distribute requests as evenly as one would think because there's no such thing as perfect randomness.
- The Power of Two Choices (P2c) Balancer comes very close to the ideal load balancer. **Use the P2c Balancer over the Random Balancer!**

![Comparison of load balancing algorithms](https://raw.githubusercontent.com/paulborza/load-balancers/master/docs/errors.png)

The chart above depicts 10,000 requests routed to five proxies (exactly like in the following code sample).
Then the numer of requests are normalized to 100%. Since there are five proxies, each proxy should receive 20% of the traffic.
But notice that's not the case with the random load balancing algorithm.
That's why [the power of two choices](http://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf) (P2c) load balancing algorithm is recommended over the random load balancing algorithm.

## Usage

```javascript
import {
    P2cBalancer,
    RandomBalancer,
} from 'load-balancers';

// TODO: Update this list with your proxies or virtual machines.
const proxies = [
    'http://proxy1.arrowfunction.com/',
    'http://proxy2.arrowfunction.com/',
    'http://proxy3.arrowfunction.com/',
    'http://proxy4.arrowfunction.com/',
    'http://proxy5.arrowfunction.com/',
];

// Initializes the power of 2 choices (P2c) balancer with five proxies.
const balancer = new P2cBalancer(proxies.length);

// P2c balancer is preferred over the random balancer.
// const balancer = new RandomBalancer(proxies.length);

for (let i = 0; i < 10000; i++) {
    const proxy = proxies[balancer.pick()];

    // TODO: Use the assigned proxy to scrape a website,
    // shift traffic to a virtual machine etc.
    console.log(proxy);
}
```

## Contributing

Got a new load balancing algorithm you'd like to see implemented in this package?
Please go ahead and [create a work item](https://github.com/paulborza/load-balancers/issues/new) for me; or better yet, send a pull request and I'll be sure to take a look at it within 24 hours. Thanks!
