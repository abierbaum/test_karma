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

         tasks: ['full', 'karma:unit:run']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: [].concat(src_files, spec_files)
      },
      unit: {
        background: true
      },
      build: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('full', ['clean','copy','jshint', 'concat', 'uglify']);
  grunt.registerTask('dev', ['full', 'karma:unit', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'jshint', 'karma:build', 'concat', 'uglify']);
  grunt.registerTask('default', ['dev']);

};
