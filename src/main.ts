import * as core from '@actions/core';
import { GitHub, context } from '@actions/github';

type OutputType = 'string' | 'json';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const outputType = core.getInput('output', {
      required: true,
    }) as OutputType;

    if (outputType !== 'string' && outputType !== 'json') {
    }
    const github = new GitHub(token);
  } catch (error) {
    core.setFailed(`Unexpected Failure. ${error}`);
  }
}

run();
