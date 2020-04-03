const core = require('@aws-cdk/core');
const PipelineConstruct = require('@bug-cdk/constructs/PipelineConstruct');

const app = new core.App();

new PipelineConstruct(app, 'PipelineConstruct');

app.synth();
