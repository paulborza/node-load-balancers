/*
 * Copyright (c) 2017-present Paul Borza
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { P2cBalancer } from './P2cBalancer';

test('variation of 10K requests', () => {
    const balancer = new P2cBalancer(10);
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
        // Tests up to the third decimal point.
        expect(bin / 1e4).toBeCloseTo(0.1, 3);
    }
});

test('overflow', () => {
    const offset = Number.MAX_SAFE_INTEGER - 1;
    const balancer = new P2cBalancer(2, offset);
    const bins = new Array(2);

    // Initializes the elements of the array to zero.
    for (let i = 0; i < bins.length; i++) {
        bins[i] = 0;
    }

    // Issues 10K requests.
    for (let i = 0; i < 1e4; i++) {
        bins[balancer.pick()]++;
    }

    for (const bin of bins) {

        // The percentage of assigned requests for each bin should be close to 50%.
        // Tests up to the third decimal point.
        expect(bin / 1e4).toBeCloseTo(0.5, 3);
    }
});
