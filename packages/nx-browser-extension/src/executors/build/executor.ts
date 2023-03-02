import { BuildExecutorSchema } from './schema';
import { ExecutorContext, normalizePath } from '@nrwl/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext,
) {
  const p = context.projectsConfigurations.projects[context.projectName];
  const projectRootPath = normalizePath(`${context.root}/${p.root}`);
  const outputPath = normalizePath(`${context.root}/${options.outputPath}`);

  const args = [];
  args.push('--outDir', outputPath);
  if (options.watch) {
    args.push('--watch');
  }

  const allArgs = args.join(' ');

  return await runCommands(
    {
      cwd: projectRootPath,
      commands: [`vite build ${allArgs}`],
      parallel: false,
      __unparsed__: [],
    },
    context
  );
}

