'use strict';

// Load dependencies.
var angular = require('angular');
var bookmarkleter = require('./bookmarkleter');

var App = angular.module('bookmarkleter', []);

App.run(function($rootScope) {

  $rootScope.urlencode = true;
  $rootScope.anonymize = true;
  $rootScope.mangleVars = true;

  $rootScope.updateBookmarklet = function() {

    var code = $rootScope.input;

    if(!code) return;

    var bookmarkletOptions = {
      urlencode: $rootScope.urlencode,
      anonymize: $rootScope.anonymize,
      jQuery: $rootScope.requiresJQuery,
      mangleVars: $rootScope.mangleVars
    };

    // Make a bookmarklet and show to user. Capture parse errors.
    try {
      $rootScope.output = bookmarkleter(code, bookmarkletOptions);
      $rootScope.error = null;
    } catch(err) {
      $rootScope.error = err.message;
      $rootScope.output = null;
      return;
    }

  };

});

App.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/./);
});
