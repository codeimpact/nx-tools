import { WebExtServeSchema } from './schema';
import { ExecutorContext, logger, runExecutor } from '@nrwl/devkit';

interface BuildTargetResult {
  success: boolean;
  outputPath?: string;
  outfile?: string;
}

export default async function runServe(
  options: WebExtServeSchema,
  context: ExecutorContext,
) {
  let project: string;
  let target: string;
  let configuration: string;

  if (options.browserTarget != null) {
    [project, target, configuration] = options.browserTarget.split(':');
  } else if (options.buildTarget != null) {
    [project, target, configuration] = options.buildTarget.split(':');
  }

  for await (const s of await runExecutor<BuildTargetResult>(
    {project, target, configuration},
    {watch: true},
    context
  )) {
    if (s.success === true) {
      logger.info('Application built successfully.');

      //   const outputPath = s.outputPath || s.outfile.replace('main.js', '');
      //
      //   if (runnerSub == null) {
      //     runnerSub = startWebExt(options.webExtOptions, outputPath).subscribe(
      //       () => {
      //         logger.info('WebExt started successfully.');
      //       },
      //       (err) => {
      //         runnerSub = null;
      //         throw err;
      //       },
      //       () => {
      //         throw new Error('WebExt closed.');
      //       }
      //     );
      //   }
      // } else {
      //   logger.error(s);
      //   if (runnerSub != null) {
      //     runnerSub.unsubscribe();
      //     runnerSub = null;
      //   }
      //   throw new Error('Application failed to build.');
      // }
    }
  }

  return { success: true };
}
