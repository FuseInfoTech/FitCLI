const edge = require('edge-js');
var clrMethod = edge.func({
		assemblyFile: 'D:\\Development\\sfdx-fitdx-plugin-master\\lib\\NodeEdge.dll'
	});

const {
	exec
} = require('child_process');

(function () {
	'use strict';

	module.exports = {
		topic: 'dependencies',
		command: 'report',
		description: 'Analysis Metadata Component Dependencies',
		help: 'help text for fitdx:dependencies:report',
		flags: [{
				name: 'targetusername',
				char: 'u',
				description: 'username for the target org',
				hasValue: true
			}, {
				name: 'augmented',
				char: 'a',
				description: 'Pull additional metadata into the graph (SLOWER)',
				hasValue: false
			}
		],
		run(context) {

			let targetUsername = context.flags.targetusername;
			//console.log('targetUsername:' + targetUsername);

			const apexLogListCommand = `sfdx force:org:display -u ${targetUsername} --json`;

			//console.log('running command:' + apexLogListCommand);

			var aPro = context.flags.augmented;
			if(aPro == null) {
				aPro = false;
			}
			
			var accessToken = '';
			var instanceUrl = '';
			
			exec(apexLogListCommand, (err, stdout, stderr) => {
				if (stderr && err) {
					console.log('orgDisplayCommand:stderr', stderr);
					return;
				}

				const apexLogListJsonOut = JSON.parse(stdout);

				//console.log('apexLogListJsonOut: %j', apexLogListJsonOut);
				
				if (apexLogListJsonOut.status === 0) {

					//console.log('apexLogListJsonOut.result: %j', apexLogListJsonOut.result);
				
					if (apexLogListJsonOut.result != null) {

						accessToken = apexLogListJsonOut.result.accessToken;
						instanceUrl = apexLogListJsonOut.result.instanceUrl;
						
						//console.log('accessToken:' + accessToken);
						//console.log('instanceUrl:' + instanceUrl);
						
						var oMode = '';
						if (context.flags.json) {
							oMode = 'json';
						} else if (context.flags.csv) {
							oMode = 'csv';
						} else if (context.flags.summary) {
							oMode = 'summary';
						} else if (context.flags.human) {
							oMode = 'human';
						}
						//console.log('outputMode:' + oMode);

						var payload = {
							sfdxOrgAlias: targetUsername,
							sessionId: accessToken,
							serverUrl: instanceUrl,
							outputMode: oMode,
							augmentedProcessing: aPro
						};
						
						//console.log('payload: %j', payload);

						console.log(clrMethod(payload, true));
					}
				} else {
					console.log('Error status %j', apexLogListJsonOut.status);
					return;
				}
			});
			

			

		}
	};
}
	());
