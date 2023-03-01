import { WebExtServeSchema } from './schema';
import { ExecutorContext } from '@nrwl/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
export default async function runServe(
  options: WebExtServeSchema,
  context: ExecutorContext,
) {
  const projectRoot = context.workspace.projects[context.projectName].root;
  //const projectRootPath = normalizePath(`${context.root}/${projectRoot}`);

  return await runCommands(
    {
      commands: [`cmd`, `echo hidd`],
      parallel: false,
      __unparsed__: [],
    },
    context
  );
}

