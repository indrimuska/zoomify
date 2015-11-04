module.exports = function(grunt) {
	
	// Load plugins
	require('load-grunt-tasks')(grunt);
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: {
					'dist/zoomify.js': ['src/zoomify.js'],
					'dist/zoomify.css': ['src/zoomify.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! Zoomify - v<%= pkg.version %> - https://github.com/indrimuska/zoomify - (c) 2015 Indri Muska - MIT */\n'
			},
			main: {
				files: {
					'dist/zoomify.min.js': ['dist/zoomify.js']
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'dist/zoomify.min.css': ['dist/zoomify.css']
				}
			}
		},
		'sync-json': {
			options: {
				include: ['name', 'description', 'version']
			},
			bower: {
				files: {
					"bower.json": "package.json"
				}
			}
		}
	});
	
	// Default tasks.
	grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'sync-json']);
	
};