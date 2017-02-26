# Load balancers for Node

[![Build Status](https://img.shields.io/travis/paulborza/arrow-function-load-balancer/master.svg?style=flat)](https://travis-ci.org/paulborza/arrow-function-load-balancer)
[![Coverage Status](https://img.shields.io/coveralls/paulborza/arrow-function-load-balancer/master.svg?style=flat)](https://coveralls.io/r/paulborza/arrow-function-load-balancer?branch=master)
[![Dependency Status](https://img.shields.io/david/paulborza/arrow-function-load-balancer.svg?style=flat)](https://david-dm.org/paulborza/arrow-function-load-balancer)
[![Dev. Dependency Status](https://img.shields.io/david/dev/paulborza/arrow-function-load-balancer.svg?style=flat)](https://david-dm.org/paulborza/arrow-function-load-balancer?type=dev)
[![NPM version](https://img.shields.io/npm/v/arrow-function-load-balancer.svg?style=flat)](https://www.npmjs.com/package/arrow-function-load-balancer)

## Installation

```bash
npm install --save arrow-function-load-balancer
```

## Usage

The power of two choices [load balancing algorithm](http://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf) (P2c) is recommended over the random load balancing algorithm.

```javascript
import { P2cBalancer, RandomBalancer } from 'arrow-function-load-balancer';

// TODO: Update this list with your proxies or virtual machines.
const proxies = [
    'http://proxy1.arrowfunction.com/',
    'http://proxy2.arrowfunction.com/',
    'http://proxy3.arrowfunction.com/',
];

// Initializes the power of two choices (P2c) balancer with three proxies.
const balancer = new P2cBalancer(proxies.length);

// P2c balancer is preferred over the random balancer.
// const balancer = new RandomBalancer(proxies.length);

for (let i = 0; i < 100; i++) {
    const proxy = proxies[balancer.pick()];

    // TODO: Use the assigned proxy to scrape a website,
    // shift traffic to a virtual machine etc.
    console.log(proxy);
}
```

## Contributing

Got a new load balancing algorithm you'd like to see implemented in this package?
Please go ahead and [create a work item](https://github.com/paulborza/arrow-function-load-balancer/issues/new) for me; or better yet, send a pull request and I'll be sure to take a look at it within 24 hours. Thanks!
