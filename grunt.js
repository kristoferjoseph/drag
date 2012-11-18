module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '// <%= pkg.name %> <%= pkg.version %>\n// Build Date: <%= grunt.template.today("yyyy-mm-dd") %>\n\n// (c) 2012 Kristofer Joseph.\n// This may be freely distributed under the MIT license.'
        },
        min: {
            dist: {
                src: ['<banner>', 'js/drag.js'],
                dest: 'bin/drag.min.js'
            }
        },
        lint: {
            all: ['js/drag.js']
        },
        watch: {
            files: '<config:lint.all>',
            tasks: 'mocha'
        },
        docco: {
            app: {
                src: ['js/drag.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-docco');
    grunt.registerTask('default', ['lint', 'min', 'docco']);
};