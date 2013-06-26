module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  pkg_name = 'karma_test';
  src_files = grunt.file.expand(['src/*.js']);
  spec_files = grunt.file.expand(['spec/*.js']);

  dist_dir = 'dist/';
  min_file = dist_dir + pkg_name + '.min.js';

  grunt.initConfig({
    clean: {
      dist: [dist_dir]
    },
    copy: {
       dist: {
         dest: dist_dir,
         src: [src_files, 'index.html']
       }
    },
    concat: {
      dist: {
        src: src_files,
        dest: dist_dir + pkg_name + '.js'
      }
    },
    uglify: {
      dist: {
        dest: dist_dir + pkg_name + '.min.js',
        src: ['<%= concat.dist.dest %>']
      }
    },
    jshint: {
      files: ['Gruntfile.js', src_files, spec_files]
    },
    watch: {
      //files: ['Gruntfile.js', src_files, spec_files],
      //tasks: ['full']
      karma: {
         files: ['Gruntfile.js', src_files, spec_files],

         tasks: ['full', 'karma:unit:run', 'karma:coverage']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: [].concat(src_files, spec_files),
        browsers: ['PhantomJS']
      },
      unit: {
        background: true
      },
      build: {
        singleRun: true
      },
      // Single run build that gives coverage results
      coverage: {         
          singleRun: true,
          browsers: ['PhantomJS'],
          preprocessors: {
            'src/*.js': 'coverage'
          },

          // test results reporter to use
          // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
          reporters: ['progress', 'coverage'],

          //Code Coverage options. report type available:
          //- html (default)
          //- lcov (lcov and html)
          //- lcovonly
          //- text (standard output)
          //- text-summary (standard output)
          //- cobertura (xml format supported by Jenkins)
          coverageReporter: {
              // cf. http://gotwarlost.github.io/istanbul/public/apidocs/
              dir : 'coverage/',
              reporters: [{
                 type: 'html'
              }, {
                 type: 'text-summary'
              }]
          },
          // use different ports so it will work in parallel with above
          port: 10876,
          runnerPort: 10100
      }
    }
  });

  // Default task(s).
  grunt.registerTask('full', ['clean','copy','jshint', 'concat', 'uglify']);
  grunt.registerTask('dev', ['full', 'karma:unit', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'jshint', 'karma:build', 'concat', 'uglify']);
  grunt.registerTask('default', ['dev']);

};
