module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '// <%= pkg.name %> <%= pkg.version %>\n// Build Date: <%= grunt.template.today("yyyy-mm-dd") %>\n\n// (c) 2012 Kristofer Joseph.\n// This may be freely distributed under the MIT license.'
        },
        min: {
            dist: {
                src: ['<banner>', 'js/dragon.js'],
                dest: 'bin/dragon.min.js'
            }
        },
        mocha: {
            all: ['test/index.html']
        },
        lint: {
            all: ['js/dragon.js']
        },
        watch: {
            files: '<config:lint.all>',
            tasks: 'mocha'
        },
        docco: {
            app: {
                src: ['js/dragon.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-docco');
    grunt.registerTask('default', ['lint', 'min', 'docco']);
};