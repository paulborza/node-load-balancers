/*
 * Copyright (c) 2017-present Paul Borza
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: [
                'dist/',
                'tscommand-*.txt',
            ],
        },

        eslint: {
            target: [
                'Gruntfile.js',
            ],
        },

        shell: {
            test: {
                command: 'node node_modules/jest/bin/jest.js --coverage --config=jest.json',
            },
        },

        ts: {
            default: {
                options: {
                    rootDir: 'src/',
                },
                outDir: 'dist/',
                tsconfig: true,
            },
        },

        tslint: {
            options: { 
                configuration: 'tslint.json',
            },
            files: {
                src: [
                    'src/**/*.ts',
                ],
            },
        },

        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/**/*.ts',
                ],
                tasks: ['default'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.registerTask('default', ['eslint', 'ts', 'tslint', 'shell:test']);
};
