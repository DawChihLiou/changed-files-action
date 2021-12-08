import * as core from '@actions/core';

type OutputType = 'string' | 'json';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const outputType = core.getInput('output', {
      required: true,
    }) as OutputType;

    if (outputType !== 'string' && outputType !== 'json') {
    }
  } catch (error) {
    core.setFailed(`Unexpected Failure. ${error}`);
  }
}

run();
