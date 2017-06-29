# Load balancers for Node

[![build status](https://gitlab.com/paulborza/node-load-balancers/badges/master/build.svg)](https://gitlab.com/paulborza/node-load-balancers/commits/master)
[![coverage report](https://gitlab.com/paulborza/node-load-balancers/badges/master/coverage.svg)](https://gitlab.com/paulborza/node-load-balancers/commits/master)

## Installation

```bash
npm install --save load-balancers
```

## Comparison of load balancers

- The Random Balancer is a bit chaotic; it doesn't distribute requests as evenly as you'd think because there's no such thing as perfect randomness.
- The Power of Two Choices (P2c) Balancer comes very close to the ideal load balancer. **Use the P2c Balancer over the Random Balancer!**

The following chart depicts 10,000 requests routed to five proxies (exactly like in the following code sample).
Then the numer of requests are normalized to 100%. Since there are five proxies, each proxy should receive 20% of the traffic.
But notice that's not the case with the random load balancing algorithm.
That's why the power of two choices load balancing algorithm is recommended over the random load balancing algorithm.

![Comparison of load balancing algorithms](https://raw.githubusercontent.com/paulborza/node-load-balancers/master/docs/errors.png)

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
];

// Initializes the Power of 2 Choices (P2c) Balancer with five proxies.
const balancer = new P2cBalancer(proxies.length);

// P2c Balancer is preferred over the Random Balancer.
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
Please go ahead and [create a work item](https://github.com/paulborza/node-load-balancers/issues/new) for me; or better yet, send a pull request and I'll be sure to take a look at it within 24 hours. Thanks!

## Technical papers

- [The power of two choices in randomized load balancing](http://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf)
