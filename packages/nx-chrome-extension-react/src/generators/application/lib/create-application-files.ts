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

  generateFiles(
    host,
    path.join(__dirname, '../files'),
    options.projectRoot,
    templateVariables
  );

  createTsConfig(
    host,
    options.projectRoot,
    {},
    templateVariables.offsetFromRoot + 'tsconfig.base.json'
  );
}
