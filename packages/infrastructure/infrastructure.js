const core = require('@aws-cdk/core');
const PipelineConstruct = require('./PipelineConstruct');

const app = new core.App();

new PipelineConstruct(app, 'PipelineConstruct');

app.synth();
