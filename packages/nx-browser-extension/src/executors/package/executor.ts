import { WebExtBuilderSchema } from './schema';
import { ExecutorContext, normalizePath } from '@nrwl/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
export default async function runExecutor(
  options: WebExtBuilderSchema,
  context: ExecutorContext
) {
  const projectRootPath = normalizePath(`${context.root}/${options.sourceDir}`);
  const outputPath = normalizePath(`${context.root}/${options.artifactsDir}`);
  const args = [];
  args.push(`--source-dir ${projectRootPath}`);
  args.push(`-o`);
  args.push(`--artifacts-dir ${outputPath}`);

  const allArgs = args.join(' ');

  return await runCommands(
    {
      commands: [`npx web-ext build ${allArgs}`],
      parallel: false,
      __unparsed__: [],
    },
    context
  );
}

