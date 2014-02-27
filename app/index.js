'use strict';

// Required modules
//
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var Promise = require('bluebird');
var semver = require('semver');
var github = new (require('github'))({version: '3.0.0'});

// Debug
global.d = function() {
  var args = Array.prototype.slice.call(arguments);
  util.log((new Date()).toISOString() + ' - ' + util.inspect.call(null, args.length === 1 ? args[0] : args, false, 10, true));
};
global.dd = function() {
  global.d.apply(null, arguments);
  util.log((new Error()).stack);
  process.exit(1);
};

var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var done = this.async();

  // Have Yeoman greet the user.
  console.log(this.yeoman);

  // var props = this.props = {
  //   ngVersion: '~1.2.10',
  //   locale: 'fr',
  //   ngModules: ['animate', 'cookies', 'route', 'sanitize'],
  //   components: ['bootstrap:~3.1.0', 'angular-strap:~2.0.0', 'font-awesome:~4.0.0'],
  //   cssPreprocessor: 'less',
  //   supportLegacy: 'yes',
  //   name: path.basename(process.env.PWD),
  //   license: 'MIT',
  //   ghUser: 'mgcrea'
  // };
  // this.name = this._.dasherize(props.name);
  // props.title = this._.classify(props.name);
  // props.description = 'Yet another amazing AngularJS app';
  // props.version = '0.0.1';

  // // Modules
  // props.modules = this._.clone(props.ngModules)
  // .map(this._.classify)
  // .map(function(name) {
  //   return 'ng' + name;
  // });
  // if(props.components.indexOf('angular-strap:~2.0.0')) {
  //   props.modules.push('mgcrea.ngStrap');
  // }
  // return done();

  var versions = {
    'angular': '~1.2.10',
  };

  var prompts = [
    {
      name: 'ngVersion',
      message: 'What version of angular would you like to use?',
      validate: function(value) {
        return semver.validRange(value) ? true : 'Please enter a valid semantic version (semver.org)';
      },
      default: versions['angular']
    },
    {
      name: 'jsPreprocessor',
      message: 'Should I set up one of those JS preprocessors for you?',
      type: 'list',
      choices: ['none', 'coffee'],
      default: 0
    },
    {
      name: 'cssPreprocessor',
      message: 'Should I set up one of those CSS preprocessors for you?',
      type: 'list',
      choices: ['none', 'less', 'sass'],
      default: 1
    },
    {
      name: 'name',
      message: 'What\'s the base name of your project?',
      default: path.basename(process.env.PWD)
    },
    {
      name: 'license',
      message: 'Under which lincense your project shall be released?',
      default: 'MIT'
    },
    {
      name: 'ghUser',
      message: 'Would you mind telling me your username on GitHub?',
      default: 'mgcrea'
    }
  ];

  this.prompt(prompts, function(props) {
    this.props = props;
    this.versions = versions;
    this.name = this._.dasherize(props.name);
    if(!props.locale) props.locale = 'en';
    props.title = this._.classify(props.name);
    props.description = 'Yet another amazing AngularJS app';
    props.version = '0.1.0';
    done();
  }.bind(this));

};

Generator.prototype.userInfo = function userInfo() {

  var self = this, done = this.async(), props = this.props;
  if(!props.ghUser) done();

  Promise.promisify(github.user.getFrom)({user: props.ghUser})
  .then(function(user) {
    self.github = self._.pick(user, 'name', 'email', 'html_url');
  }).then(done);

};

Generator.prototype.projectFiles = function projectFiles() {

  // Dotfiles
  this.copy('gitignore', '.gitignore');
  // this.copy('gitattributes', '.gitattributes');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');

  // Package
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');

};

Generator.prototype.app = function app() {

  this.mkdir('src');

  // Scripts
  this.copy('src/_main.js', 'src/' + this.name + '.js');

};

