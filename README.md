# Generator-angular-component [![Build Status](https://secure.travis-ci.org/mgcrea/generator-angular-component.png?branch=master)](https://travis-ci.org/mgcrea/generator-angular-component)

A lightweight AngularJS generator for [Yeoman](http://yeoman.io). Ideally suited to bootstrap small components.


## Getting started

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-angular-component`
- Run: `yo angular-component`


## Structure

The basic structure of the project is given in the following way:

```
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── CONTRIBUTING.md
├── Gruntfile.js
├── README.md
├── bower.json
├── bower_components
│   ├── angular
│   │   ├── .bower.json
│   │   ├── angular.js
│   │   ├── angular.min.js
│   │   └── bower.json
│   ├── angular-mocks
│   │   ├── .bower.json
│   │   ├── README.md
│   │   ├── angular-mocks.js
│   │   └── bower.json
│   └── jquery
│       ├── .bower.json
│       ├── .gitignore
│       ├── README.md
│       ├── bower.json
│       ├── component.json
│       ├── composer.json
│       ├── jquery-migrate.js
│       ├── jquery-migrate.min.js
│       ├── jquery.js
│       ├── jquery.min.js
│       ├── jquery.min.map
│       └── package.json
├── dist
├── karma.conf.js
├── package.json
├── src
│   └── my-module.js
└── test
    ├── .jshintrc
    └── spec
        └── my-module.js
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
