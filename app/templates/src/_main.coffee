'use strict'

angular.module('<%= props.githubUser %>.<%= _.camelize(props.name) %>', [])

  .directive 'myDirective', ->
    restrict: 'EAC'
    scope: true
    compile: (tElement, tAttrs, transclude) ->
      tElement.html('<span>hello {{name}}</span>')
      (scope, iElement, iAttrs, controller) ->
        scope.name = 'world'
        undefined
