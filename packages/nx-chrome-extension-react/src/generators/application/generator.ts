import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { addReact } from './lib/add-react';
import * as path from 'path';
import { NormalizedSchema, Schema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (
  host: Tree,
  options: Schema
) {
  const normalizedOptions = normalizeOptions(host, options);

  const tasks = [];

  // Add @types/chrome if typescript is used.
  if (normalizedOptions.js !== true) {
    const devDependencies = {
      '@types/chrome': '0.0.216',
    }
    const addNpmPackagesTask = addDependenciesToPackageJson(host, {}, devDependencies);
    tasks.push(addNpmPackagesTask);
  }

  // Add react
  const addReactTask = await addReact(host, options);
  tasks.push(addReactTask);

  // addProjectConfiguration(host, normalizedOptions.projectName, {
  //   root: normalizedOptions.projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${normalizedOptions.projectRoot}/src`,
  //   targets: {
  //     build: {
  //       executor: '@codeimpact/nx-chrome-extension:build',
  //     },
  //   },
  //   tags: normalizedOptions.parsedTags,
  // });
  addFiles(host, normalizedOptions);
  await formatFiles(host);
  return runTasksInSerial(...tasks);
}
