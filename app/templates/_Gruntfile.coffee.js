// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration
  grunt.initConfig({
    pkg: require('./package.json'),
    bower: require('./bower.json'),
    yo: {
      // Configurable paths
      name: '<%%= pkg.name %>',
      src: require('./bower.json').appPath || 'src',
      dist: 'dist'
    },
    meta: {
      banner: '/**\n' +
      ' * <%%= pkg.name %>\n' +
      ' * @version v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%%= pkg.homepage %>\n' +
      ' * @author <%%= pkg.author.name %> <<%%= pkg.author.email %>>\n' +
      ' * @license <%= props.license %> License, http://www.opensource.org/licenses/<%= props.license %>\n' +
      ' */\n'
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    watch: {
      coffee: {
        files: ['<%%= yo.src %>/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      test: {
        files: '<%%= jshint.test.src %>',
        tasks: ['jshint:test', 'karma:unit']
      },
      less: {
        files: ['<%%= yo.src %>/{,*/}*.less'],
        tasks: ['less:dev']
      },
      app: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yo.src %>/{,*/}*.html',
          '{.tmp,<%%= yo.src %>}/styles/{,*/}*.css',
          '{.tmp,<%%= yo.src %>}/{,*/}*.json',
          '{.tmp,<%%= yo.src %>}/scripts/{,*/}*.js',
          '{.tmp,<%%= yo.src %>}/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        // Use a system-assigned port.
        port: 0,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '127.0.0.1',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yo.src %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yo.src %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yo.dist %>/*',
            '!<%%= yo.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    less: {
      options: {
        paths: ['<%%= yo.src %>']
      },
      dev: {
        options: {
          dumpLineNumbers: 'all',
        },
        files: {
          '<%%= yo.src %>/<%%= pkg.name %>.css': ['<%%= yo.src %>/{,*/}*.less']
        }
      },
      dist: {
        options: {
          compress: true,
          report: 'gzip'
        },
        files: {
          '<%%= yo.dist %>/<%%= pkg.name %>.css': ['<%%= yo.src %>/{,*/}*.less']
        }
      }
    },
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          '<%%= yo.src %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yo.src %>',
          src: '**/*.coffee',
          dest: '<%%= yo.dist %>/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '<%%= yo.dist %>/scripts',
          ext: 'Spec.js'
        }]
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    },
    concat: {
      options: {
        banner: '<%%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: '(function(window, document, undefined) {\n\'use strict\';\n',
          footer: '\n})(window, document);\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },
        files: {
          '<%%= yo.dist %>/<%%= pkg.name %>.js': [
            '<%%= yo.src %>/{,*/}*.js'
          ]
        }
      }
    },
    ngmin: {
      options: {
        expand: true
      },
      dist: {
        files: {
          '<%%= yo.dist %>/scripts/<%%= yo.name %>.js': ['<%%= yo.dist %>/scripts/<%%= yo.name %>.js']
        }
      }
    },
    ngtemplates: {
      options: {
        module: 'ngTemplates',
      },
      dist: {
        files: {
          '<%%= yo.dist %>/<%%= yo.name %>.tpl.js': [
            '<%%= yo.src %>/{,*/}*.html'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%%= meta.banner %>',
        report: 'gzip'
      },
      dist: {
        files: {
          '<%%= yo.dist %>/scripts/<%%= yo.name %>.min.js': ['<%%= Object.keys(ngmin.dist.files)[0] %>'],
          '<%%= yo.dist %>/scripts/<%%= yo.name %>.tpl.min.js': ['<%%= Object.keys(ngtemplates.dist.files)[0] %>']
        }
      }
    }
  });

  grunt.registerTask('server', [
    'clean:server',
    'less:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'coffee:dist',
    'coffee:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'coffee:dist',
    'less:dist',
    'ngmin:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('release', [
    'test',
    'bump-only',
    'dist',
    'bump-commit'
  ]);

  grunt.registerTask('default', ['build']);

};
