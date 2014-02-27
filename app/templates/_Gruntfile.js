// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project meta
    pkg: require('./package.json'),
    bower: require('./bower.json'),
    meta: {
      banner: '/**\n' +
      ' * <%%= pkg.name %>\n' +
      ' * @version v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%%= pkg.homepage %>\n' +
      ' * @author <%%= pkg.author.name %> <<%%= pkg.author.email %>>\n' +
      ' * @license <%= props.license %> License, http://www.opensource.org/licenses/<%= props.license %>\n' +
      ' */\n'
    },

    // Project settings
    yo: {
      // Configurable paths
      app: require('./bower.json').appPath || 'src',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {<% if (props.jsPreprocessor === 'coffee') { %>
      coffee: {
        files: ['<%%= yo.app %>/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },<% } else { %>
      js: {
        files: ['<%%= yo.app %>/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },<% } %><% if (props.cssPreprocessor === 'less') { %>
      less: {
        files: ['<%%= yo.app %>/{,*/}*.less'],
        tasks: ['less:dev', 'autoprefixer']
      },<% } else if (props.cssPreprocessor === 'compass') { %>
      compass: {
        files: ['<%%= yo.app %>/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yo.app %>/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yo.app %>/*.html',
          '.tmp/{,*/}*.css',<% if (props.jsPreprocessor === 'coffee') { %>
          '.tmp/{,*/}*.js',<% } %>
          '<%%= yo.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yo.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yo.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yo.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',<% if (props.jsPreprocessor === 'none') { %>
        '<%%= yo.app %>/scripts/{,*/}*.js'<% } %>
      ]<% if (props.jsPreprocessor === 'none') { %>,
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }<% } %>
    },

    // Empties folders to start fresh
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

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        src: '<%%= yo.app %>/index.html',
        ignorePath: '<%%= yo.app %>/',
        exclude: ['bower_components/jquery/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

<% if (props.jsPreprocessor === 'coffee') { %>    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yo.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>

<% if (props.cssPreprocessor === 'less') { %>    // Compiles Less to CSS and generates necessary files if requested
    less: {
      options: {
      },
      dist: {
        options: {
          dumpLineNumbers: false
        },
        files: [{
          expand: true,
          cwd: '<%%= yo.app %>',
          src: '*.less',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          dumpLineNumbers: 'comments'
        },
        files: [{
          expand: true,
          cwd: '<%%= yo.app %>',
          src: '*.less',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },<% } else if (props.cssPreprocessor === 'compass') { %>    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yo.app %>',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yo.app %>/images',
        javascriptsDir: '<%%= yo.app %>/scripts',
        fontsDir: '<%%= yo.app %>/styles/fonts',
        importPath: '<%%= yo.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yo.dist %>/images/generated'
        }
      },
      dev: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yo.app %>/index.html',
      options: {
        dest: '<%%= yo.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yo.dist %>/{,*/}*.html'],
      css: ['<%%= yo.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yo.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%%= yo.app %>'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yo.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yo.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yo.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yo.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yo.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%%= yo.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yo.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yo.app %>',
          dest: '<%%= yo.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yo.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yo.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [<% if (props.jsPreprocessor === 'coffee') { %>
        'coffee:dist',<% } %><% if (props.cssPreprocessor === 'less') { %>
        'less:dev'<% } else if (props.cssPreprocessor === 'compass') { %>
        'compass:dev'<% } else { %>
        'copy:styles'<% } %>
      ],
      test: [<% if (props.jsPreprocessor === 'coffee') { %>
        'coffee',<% } %><% if (props.cssPreprocessor === 'less') { %>
        'less'<% } else if (props.cssPreprocessor === 'compass') { %>
        'compass'<% } else { %>
        'copy:styles'<% } %>
      ],
      dist: [<% if (props.jsPreprocessor === 'coffee') { %>
        'coffee',<% } %><% if (props.cssPreprocessor === 'less') { %>
        'less:dist',<% } else if (props.cssPreprocessor === 'compass') { %>
        'compass:dist',<% } else { %>
        'copy:styles',<% } %>
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      options: {
        configFile: 'test/karma.conf.js',
      },
      unit: {
        singleRun: true
      },
      server: {
        autoWatch: true
      }
    }
  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    // 'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

};
