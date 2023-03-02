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
  args.push(`--outDir ${outputPath}`);
  args.push(`--minify esbuild`);
  args.push('--emptyOutDir');
  if (options.watch) {
    args.push('--watch');
  }

  let backgroundParseCmd = '';
  if (options.manifestVersion === 3 && options.backgroundDir) {
    const backgroundSrcPath = normalizePath(`${projectRootPath}/${options.backgroundDir}`);
    const backgroundDestPath = normalizePath(`${outputPath}/${options.backgroundDir}`).replace('.ts', 'js');
    backgroundParseCmd = `npx tsup ${backgroundSrcPath} --format iife --out-dir ${backgroundDestPath}/index.js --no-splitting`;
    backgroundParseCmd = (options.watch) ? `${backgroundParseCmd} --watch true` : `${backgroundParseCmd}`;
  }

  const allArgs = args.join(' ');

  return await runCommands(
    {
      cwd: projectRootPath,
      commands: [`vite build ${allArgs}`, backgroundParseCmd],
      parallel: false,
      __unparsed__: [],
    },
    context
  );
}

