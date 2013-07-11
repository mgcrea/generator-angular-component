'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
// var ncp = require('ncp').ncp;

// Extract user info from github
var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});
var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

function AngularComponent(args, options, config) {
  /* jshint unused:false */
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

module.exports = AngularComponent;

util.inherits(AngularComponent, yeoman.generators.Base);

// AngularComponent.prototype.ncp = ncp;

AngularComponent.prototype.askFor = function askFor() {
  var done = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'username'
  }, {
    name: 'name',
    message: 'What\'s the base name of your project?',
    default: 'myModule'
  }, {
    name: 'license',
    message: 'Under which lincense your project shall be released?',
    default: 'MIT'
  }, {
    type: 'confirm',
    name: 'angularUnstable',
    message: 'Do you need the unstable branch of AngularJS?',
    default: false
  }, {
    type: 'confirm',
    name: 'cssRequired',
    message: 'Does your module requires CSS styles?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.props = props;
    // For easier access in the templates.
    this.name = this._.dasherize(props.name);
    props.version = '0.0.1';
    done();
  }.bind(this));
};

AngularComponent.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.props.githubUser, function (res) {
    /* jshint camelcase:false */
    this.github = _.pick(res, 'name', 'email', 'html_url');
    done();
  }.bind(this));
};

AngularComponent.prototype.src = function src() {
  this.mkdir('src');
  this.template('src/_main.js', 'src/' + this.name + '.js');
  this.mkdir('dist');
};

AngularComponent.prototype.test = function test() {
  this.mkdir('test');
  this.mkdir('test/spec');
  this.template('test/spec/_main.js', 'test/spec/' + this.name + '.js');
  this.template('_karma.conf.js', 'karma.conf.js');
  this.copy('test/jshintrc', 'test/.jshintrc');
};

AngularComponent.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('README.md');
  this.template('Gruntfile.js');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
};
