'use strict';
angular.module('<%= props.githubUser %>.<%= _.camelize(props.name) %>', [])
  .filter('<%= _.camelize(props.githubUser + props.name) %>', function() {
    return function(text) {
      return 'it works';
    };
  });
