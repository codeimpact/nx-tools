import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';
import * as path from 'path';
import { createTsConfig } from './create-ts-config';

export function createApplicationFiles(host: Tree, options: NormalizedSchema) {
  const templateVariables = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  }

  console.log('template variables');
  console.log(templateVariables);
  generateFiles(
    host,
    path.join(__dirname, '../files'),
    options.projectRoot,
    templateVariables
  );

  console.log('this options');
  console.log(options);

  createTsConfig(
    host,
    options.projectRoot,
    {},
    templateVariables.offsetFromRoot + 'tsconfig.base.json'
  );
}
