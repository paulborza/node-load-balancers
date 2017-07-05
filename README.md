# Load balancers for Node

[![build status](https://gitlab.com/paulborza/node-load-balancers/badges/master/build.svg)](https://gitlab.com/paulborza/node-load-balancers/commits/master)
[![coverage report](https://gitlab.com/paulborza/node-load-balancers/badges/master/coverage.svg)](https://gitlab.com/paulborza/node-load-balancers/commits/master)
[![npm](https://img.shields.io/npm/dm/load-balancers.svg)](https://www.npmjs.com/package/load-balancers)

## Installation

```bash
npm install --save load-balancers
```

## Comparison of load balancers

- The Random Balancer is a bit chaotic; it doesn't distribute requests as evenly as you'd think because there's no such thing as perfect randomness.
- The Power of 2 Choices (P2c) Balancer comes very close to the ideal load balancer. Pick the P2c Balancer over the Random Balancer!

The following chart depicts 1M requests routed to 10 proxies (exactly like in the following code example). Since there are 10 proxies, each proxy should receive 100K requests. But notice that's not the case with the random load balancer. That's why the power of two choices load balancing algorithm is recommended over a random approach.

![1M requests routed to 10 proxies](https://raw.githubusercontent.com/paulborza/node-load-balancers/master/docs/comparison.png)

## Usage

```javascript
import {
    P2cBalancer,
    RandomBalancer,
} from 'load-balancers';

// TODO: Update this list with your proxies or virtual machines.
const proxies = [
    'https://proxy1.borza.ro/',
    'https://proxy2.borza.ro/',
    'https://proxy3.borza.ro/',
    'https://proxy4.borza.ro/',
    'https://proxy5.borza.ro/',
    'https://proxy6.borza.ro/',
    'https://proxy7.borza.ro/',
    'https://proxy8.borza.ro/',
    'https://proxy9.borza.ro/',
    'https://proxy10.borza.ro/',
];

// Initializes the Power of 2 Choices (P2c) Balancer with five proxies.
const balancer = new P2cBalancer(proxies.length);

// P2c Balancer is preferred over the Random Balancer.
// const balancer = new RandomBalancer(proxies.length);

for (let i = 0; i < 1000000; i++) {
    const proxy = proxies[balancer.pick()];

    // TODO: Use the assigned proxy to scrape a website,
    // shift traffic to a virtual machine etc.
    console.log(proxy);
}
```

## Contributing

Got a new load balancing algorithm you'd like to see implemented in this package?
Please go ahead and [create a work item](/issues/new) for me; or better yet, send a pull request and I'll be sure to take a look at it within 24 hours. Thanks!

## Technical papers

- [The power of two choices in randomized load balancing](http://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf)
