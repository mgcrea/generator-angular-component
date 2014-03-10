'use strict';
angular.module('<%= props.githubUser %>.<%= _.camelize(props.name) %>', [])
  .service('<%= _.camelize(props.githubUser + props.name) %>', function() {
    this.runtimeObj = 'Alo';
  });
