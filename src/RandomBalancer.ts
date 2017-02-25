/*
 * Copyright (c) 2017 Paul Borza
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export class RandomBalancer {
    private bins: number[];

    constructor(count: number) {
        this.bins = new Array(count);

        // Initializes the elements of the array to zero.
        for (let i = 0; i < this.bins.length; i++) {
            this.bins[i] = 0;
        }
    }

    public pick() {
        const result = Math.trunc(Math.random() * this.bins.length);

        this.bins[result]++;

        return result;
    }
}
