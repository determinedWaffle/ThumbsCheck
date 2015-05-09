module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        // Add filespec list here
        ['Gruntfile.js', 'app/**/*.js', 'server.js']
      ],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'app/bower_components/**/*.js'
        ]
      }
    },
    
    watch: {
      scripts: {
        files: ['app/**/*.js', 'server.js'],
        tasks: ['jshint']
      }
    },

    shell: {
      deployProduction: {
        command: 'firebase deploy',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('deploy', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'jshint', 'shell:deployProduction' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });
};