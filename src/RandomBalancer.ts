/*
 * Copyright (c) 2017 Paul Borza
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export class RandomBalancer {
    private count: number;

    constructor(count: number) {
        this.count = count;
    }

    public pick() {
        const result = Math.trunc(Math.random() * this.count);

        return result;
    }
}
