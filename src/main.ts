import { context, getOctokit } from '@actions/github';
import { getInput, info, setFailed, setOutput } from '@actions/core';

/**
 * Output formats:
 *
 * - "json": general purpose data structure
 * - "string": use " " as dilimiter for command line usage
 */
type OutputType = 'string' | 'json';

async function run(): Promise<void> {
  if (context.eventName !== 'pull_request') {
    setFailed(
      `This action only support "pull_request" event. Recieved ${context.eventName}.`,
    );
  }

  try {
    // the "output" constraint is defined in `action.yaml`
    const outputType = getInput('output', {
      required: true,
    }) as OutputType;

    if (outputType !== 'json' && outputType !== 'string') {
      setFailed(
        `output is required to be "string" or "json. Recieved ${outputType}`,
      );
    }

    // get head and base commit SHAs for commit comparison later
    const base: string | undefined = context.payload.pull_request?.base.sha;
    const head: string | undefined = context.payload.pull_request?.head.sha;

    if (base === undefined || head === undefined) {
      throw Error(`
Base commit SHA or Head commit SHA is missing.
Base commit SHA: ${base}
Head commit SHA: ${head}
      `);
    }

    info(`Base commit SHA: ${base}`);
    info(`Head commit SHA: ${head}`);

    const token = getInput('token', { required: true });
    const octokit = getOctokit(token);

    const { data } = await octokit.rest.repos.compareCommits({
      base,
      head,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    const output = (data.files ?? []).map((file) => file.filename);

    const hasInvalidFilenames = output.some((filename) =>
      filename.includes(' '),
    );

    if (hasInvalidFilenames && outputType === 'string') {
      setFailed(
        'Some of the changed files have a filename with whitespaces. Please use the "json" output format or remove the whitespaces from your filenames.',
      );
    }

    if (outputType === 'json') {
      setOutput('filenames', JSON.stringify(output));
    }

    if (outputType === 'string') {
      setOutput('filenames', output.join(' '));
    }
  } catch (error) {
    setFailed(`Unexpected Failure. ${error}`);
  }
}

run();
