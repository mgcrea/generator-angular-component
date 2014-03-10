'use strict';
angular.module('<%= props.githubUser %>.<%= _.camelize(props.name) %>', [])
  .factory('<%= _.camelize(props.githubUser + props.name) %>', function() {
    var runtimeObj = 'Alo';
    return {
      runtimeObj: runtimeObj
    };
  });
