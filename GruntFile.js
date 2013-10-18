module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        all: ['Gruntfile.js', 'lib/jqq.js', 'tests/specs/*.js']
    },
    jasmine: {
        components: {
            src: ['lib/jqq.js'],
            options: {
                vendor: ['http://code.jquery.com/jquery-1.7.2.js'],
                specs: 'tests/specs/*Spec.js'
            }
        }
    }
});


// Load the plugin that provides the "jasmine" task.
grunt.loadNpmTasks('grunt-contrib-jasmine');

// Default task(s).
grunt.registerTask('default', ['jasmine' ]);

// Travis task(s).
grunt.registerTask('travis', ['jasmine']);

};
