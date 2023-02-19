import { Schema } from './schema';

export default async function runExecutor(
  options: Schema,
) {
  console.log('Executor ran for Serve', options);
  return {
    success: true
  };
}

