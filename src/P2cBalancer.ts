/*
 * Copyright (c) 2017 Paul Borza
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Implementation of the Power of Two Choices algorithm.
 * Amazing for its simplicity and effectiveness.
 * http://www.eecs.harvard.edu/~michaelm/postscripts/tpds2001.pdf.
 * A simple variation of random choice, but instead of selecting a bin (server) randomly,
 * the idea becomes the following:
 * - Pick two bins (servers) randomly, call them "A" and "B".
 * - If "A" is under less load then select "A".
 * - Otherwise, select "B".
 */
export class P2cBalancer {
    private bins: number[];

    constructor(count: number) {
        this.bins = new Array(count);

        // Initializes the elements of the array to zero.
        for (let i = 0; i < this.bins.length; i++) {
            this.bins[i] = 0;
        }
    }

    public pick() {
        const a = Math.trunc(Math.random() * this.bins.length);
        const b = Math.trunc(Math.random() * this.bins.length);

        const result = this.bins[a] < this.bins[b] ? a : b;

        // Accounts for overflow if enough requests go through this balancer.
        if (this.bins[result] === Number.MAX_SAFE_INTEGER) {

            // Resets all bins as it assumes they have all received an equal
            // number of requests. Starts again from a blank state.
            for (let i = 0; i < this.bins.length; i++) {
                this.bins[i] = 0;
            }
        }

        // Increments the number of requests assigned to this bin.
        this.bins[result]++;

        return result;
    }
}
