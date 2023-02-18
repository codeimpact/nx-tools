import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';
import * as path from 'path';

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
    path.join(__dirname, '../files/app'),
    options.projectRoot,
    templateVariables
  );
}
