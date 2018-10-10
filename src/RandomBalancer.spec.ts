/*
 * Copyright (c) 2017-present Borza Research
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { RandomBalancer } from './RandomBalancer';

test('variation of 10K requests', () => {
    const balancer = new RandomBalancer(10);
    const bins = new Array(10);

    // Initializes the elements of the array to zero.
    for (let i = 0; i < bins.length; i++) {
        bins[i] = 0;
    }

    // Issues 10K requests.
    for (let i = 0; i < 1e4; i++) {
        bins[balancer.pick()]++;
    }

    for (const bin of bins) {

        // The percentage of assigned requests for each bin should be close to 10%.
        // Tests up to the first decimal point.
        expect(bin / 1e4).toBeCloseTo(0.1, 1);
    }
});
