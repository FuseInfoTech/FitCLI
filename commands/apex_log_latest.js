const forceUtils = require('../lib/forceUtils.js');
const edge = require('edge');
const path = require('path');


// edge appears to require an absolute path to the dll.
var dirParts = __dirname.split(path.sep);
dirParts.pop(); // commands folder
dirParts.push('lib');
dirParts.push('NodeEdge.dll');
var ddlPath = dirParts.join(path.sep);

var clrMethod = edge.func({assemblyFile: ddlPath});


const {
  exec
} = require('child_process');

(function () {
  'use strict';

  module.exports = {
    topic: 'apex',
    command: 'log:latest',
    description: 'get the latest apex log',
    help: 'help text for fitdx:apex:log:latest',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    },{
      name: 'filter',
      char: 'f',
      description: 'filter to events',
      hasValue: true
    },{
      name: 'debugOnly',
	  char: 'd',
      description: 'premade filter for USER_DEBUG output only',
      hasValue: false
    },{
      name: 'json',
      description: 'output as json',
      hasValue: false
    },{
      name: 'csv',
      description: 'output as csv',
      hasValue: false
    },{
      name: 'summary',
	  char: 's',
      description: 'output summary',
      hasValue: false
    },{
      name: 'human',
      description: 'output in a format more friendly for squishy biologicals',
      hasValue: false
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;
	  
	  //console.log('targetUsername:' + targetUsername);
	  
	  //console.log('DLL output:' + clrMethod(6, true));

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          targetUsername = org.authConfig.username;

          const apexLogListCommand = `sfdx force:apex:log:list -u ${targetUsername} --json`;
		  
		  //console.log('running command:' + apexLogListCommand);

          exec(apexLogListCommand, (err, stdout, stderr) => {
            if (stderr && err) {
              console.log('apexLogListCommand:stderr', stderr);
              return;
            }

            const apexLogListJsonOut = JSON.parse(stdout);

            if (apexLogListJsonOut.status === 0) {
              
              if (apexLogListJsonOut.result.length > 0) {

                const logId = apexLogListJsonOut.result[apexLogListJsonOut.result.length - 1].Id;
                const apexLogGetByIdCommand = `sfdx force:apex:log:get -i ${logId} -u ${targetUsername}`;

				//console.log('Getting log:' + apexLogListCommand);
				
                exec(apexLogGetByIdCommand, (err, stdout, stderr) => {
                  if (stderr && err) {
                    console.log('apexLogListCommand:stderr', stderr);
                    return;
                  }

				  //console.log(stdout);
				  //console.log(clrMethod(stdout, true));
				  
				  var oMode = '';
				  if(context.flags.json) {
					  oMode = 'json';
				  } else if(context.flags.csv) {
					  oMode = 'csv';
				  } else if(context.flags.summary) {
					  oMode = 'summary';
				  } else if(context.flags.human) {
					  oMode = 'human';
				  }
				  //console.log('outputMode:' + oMode);
				  
				  var filterSettings = '';
				  if(context.flags.debugOnly) {
					  filterSettings = 'USER_DEBUG';
				  } else {
					  filterSettings = context.flags.filter;
				  }
				  
				  var payload = {
					  debugLog: stdout,
					  filter: filterSettings,
					  outputMode: oMode
				  };
				  
				  console.log(clrMethod(payload, true));
                  
                });
              }
            }
          });
        });
      });
    }
  };
}());