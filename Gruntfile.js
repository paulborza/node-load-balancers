module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: [
                'dist/',
                'tscommand-*.txt',
            ],
        },

        coveralls: {
            default: {
                src: 'coverage/lcov.info',
            },
        },

        eslint: {
            target: [
                'Gruntfile.js',
            ],
        },

        shell: {
            test: {
                command: 'node node_modules/jest/bin/jest.js --coverage',
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
                force: true,
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
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.registerTask('default', ['eslint', 'ts', 'tslint', 'shell:test', 'coveralls']);
};
