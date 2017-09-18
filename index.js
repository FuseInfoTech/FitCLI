const apexLogLatest = require('./commands/apex_log_latest.js');
const deploymentFish = require('./commands/deployment_fish.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'apex',
    description: 'commands for apex'
  }];

  exports.namespace = {
    name: 'fitdx',
    description: 'Various commands from FuseIT'
  };

  exports.commands = [
    apexLogLatest,
	deploymentFish
  ];

}());