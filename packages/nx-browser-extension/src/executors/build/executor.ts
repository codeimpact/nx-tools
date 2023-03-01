import { BuildExecutorSchema } from './schema';
import { ExecutorContext } from '@nrwl/devkit';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext,
) {
  console.log(options);
  console.log('Executor ran for Build', options);
  return {
    success: true
  };
}

