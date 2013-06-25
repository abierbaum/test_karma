module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  pkg_name = 'karma_test';
  src_files = ['src/*.js'];
  spec_files = ['spec/*.js'];

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
      files: ['Gruntfile.js', src_files, spec_files],
      tasks: ['full']
    }
  });

  // Default task(s).
  grunt.registerTask('full', ['clean','copy','jshint', 'concat', 'uglify']);
  grunt.registerTask('dev', ['full', 'watch']);
  grunt.registerTask('default', ['dev']);

};
