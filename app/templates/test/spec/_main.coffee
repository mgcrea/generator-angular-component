'use strict'

describe 'Module: <%= _.camelize(props.name) %>', ->

  scope = $sandbox = $compile = $timeout = undefined

  # load the controller's module
  beforeEach(module('<%= props.githubUser %>.<%= _.camelize(props.name) %>'))

  beforeEach(inject(($injector, $rootScope, _$compile_, _$timeout_) ->
    scope = $rootScope
    $compile = _$compile_
    $timeout = _$timeout_

    $sandbox = $('<div id="sandbox"></div>').appendTo($('body'))
    undefined
  ))

  afterEach( ->
    $sandbox.remove()
    scope.$destroy()
  )

  templates = {
    'default': {
      scope: {}
      element: '<div my-directive></div>'
    }
  }

  compileDirective = (template) ->
    template = if template then templates[template] else templates['default']
    angular.extend(scope, template.scope || templates['default'].scope)
    $element = $(template.element).appendTo($sandbox)
    $element = $compile($element)(scope)
    scope.$digest()
    $element

  it 'should correctly display hello world', ->
    elm = compileDirective()
    expect(elm.text()).toBe('hello world')
