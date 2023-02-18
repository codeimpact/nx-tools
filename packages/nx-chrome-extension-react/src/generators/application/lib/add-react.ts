import { Tree } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react';
import { Schema } from '../schema';

export async function addReact(
  host: Tree,
  options: Schema
) {
  console.log('here');
  console.log(options);
  return await applicationGenerator(host, {
    ...options,
    e2eTestRunner: 'none',
    pascalCaseFiles: true,
    classComponent: false,
    routing: false,
    globalCss: false,
    bundler: 'vite',
    minimal: true,
  });
}
