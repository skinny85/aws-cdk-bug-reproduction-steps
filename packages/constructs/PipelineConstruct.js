const core = require('@aws-cdk/core');
const codepipeline = require('@aws-cdk/aws-codepipeline');
const codepipelineActions = require('@aws-cdk/aws-codepipeline-actions');
const codecommit = require('@aws-cdk/aws-codecommit');
const codebuild = require('@aws-cdk/aws-codebuild');

class PipelineConstruct extends core.Stack {
	constructor(parent, id) {
		super(parent, id);

		const pipeline = new codepipeline.Pipeline(this, 'Pipeline');

		const repository = codecommit.Repository.fromRepositoryArn(this, 'Repository', 'arn:aws:codecommit:us-west-2:000000000000:repository');
		const sourceOutput = new codepipeline.Artifact('SourceOutput');
		const sourceAction = new codepipelineActions.CodeCommitSourceAction({
			actionName: 'CodeCommit',
			repository,
			branch: 'master',
			output: sourceOutput,
		});
		pipeline.addStage({
			stageName: 'Source',
			actions: [sourceAction],
		});

		const project = new codebuild.PipelineProject(this, 'Project', {
			environment: {
				buildImage: codebuild.LinuxBuildImage.STANDARD_3_0,
			},
		});
		const buildOutput = new codepipeline.Artifact('BuildOutput');
		const buildAction = new codepipelineActions.CodeBuildAction({
			actionName: 'CodeBuild',
			project,
			input: sourceOutput,
			outputs: [buildOutput],
		});
		pipeline.addStage({
			stageName: 'Build',
			actions: [buildAction],
		});
	}
}

module.exports = PipelineConstruct;
