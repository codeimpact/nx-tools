import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit';
import { addReact } from './lib/add-react';
import { Schema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { createApplicationFiles } from './lib/create-application-files';
import { reactInitGenerator } from '@nrwl/react';

export default async function (
  host: Tree,
  schema: Schema
) {
  const options = normalizeOptions(host, schema);

  const tasks = [];

  const initTask = await reactInitGenerator(host, {
    ...options,
    skipBabelConfig: true,
    skipHelperLibs: true,
    e2eTestRunner: 'none'
  });

  tasks.push(initTask);


  createApplicationFiles(host, options);

  // Add @types/chrome if typescript is used.
  if (options.js !== true) {
    const devDependencies = {
      '@types/chrome': '0.0.216',
    }
    const addNpmPackagesTask = addDependenciesToPackageJson(host, {}, devDependencies);
    tasks.push(addNpmPackagesTask);
  }

  // Add react
  // const addReactTask = await addReact(host, options);
  // tasks.push(addReactTask);

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
  await formatFiles(host);
  return runTasksInSerial(...tasks);
}
