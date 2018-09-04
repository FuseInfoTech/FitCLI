const apexLogLatest = require('./commands/apex_log_latest.js');
const deploymentFish = require('./commands/deployment_fish.js');
const dependencyAnalysis = require('./commands/dependency_analysis.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'apex',
    description: 'commands for apex'
  },{
    name: 'dependencies',
    description: 'commands for dependencies analysis'
  },{
    name: 'deployment',
    description: 'commands for deployment'
  }];

  exports.namespace = {
    name: 'fitdx',
    description: 'Various commands from FuseIT'
  };

  exports.commands = [
    apexLogLatest,
	deploymentFish,
	dependencyAnalysis
  ];

}());