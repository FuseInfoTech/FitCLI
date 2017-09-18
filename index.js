const apexLogLatest = require('./commands/apex_log_latest.js');
const deploymentFish = require('./commands/deployment_fish.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'apex',
    description: 'commands for apex'
  }, 
{
    name: 'deployment',
    description: 'commands for deployments'
  }];

  exports.namespace = {
    name: 'fit',
    description: 'Various commands from FuseIT'
  };

  exports.commands = [
    apexLogLatest,
	deploymentFish
  ];

}());