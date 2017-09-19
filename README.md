# sfdx-fit-plugins

A plugin for the Salesforce CLI built by Daniel Ballinger and containing a lot of helpful commands.

## Setup

### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:FuseInfoTech/FitCLI.git`

3. Install npm modules: `npm install`

4. Link the plugin: `sfdx plugins:link`

## Get the latest debug log

`sfdx fitdx:apex:log:latest -u <targetusername>`

## Get a summary of the latest debug log

`sfdx fitdx:apex:log:latest -u <targetusername> --summary`

## Filter the latest debug log to just the USER_DEBUG entries

`sfdx fitdx:apex:log:latest -u <targetusername> --debugOnly`

## Filter the latest debug log to only the events of interest

`sfdx fitdx:apex:log:latest -u <targetusername> --filter USER_INFO,CODE_UNIT_STARTED`

## Convert the latest debug log to JSON

`sfdx fitdx:apex:log:latest -u <targetusername> --json`

## Deployment

`sfdx fitdx:deployment:fish`
