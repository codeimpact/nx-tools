import { addDependenciesToPackageJson, ensurePackage, formatFiles, Tree } from '@nrwl/devkit';
import { Schema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { createApplicationFiles } from './lib/create-application-files';
import { reactInitGenerator } from '@nrwl/react';
import { extractTsConfigBase } from './lib/create-ts-config';
import { addProject } from './lib/add-project';
import { addLinting } from '@nrwl/react/src/generators/library/lib/add-linting';
import { installCommonDependencies } from './lib/install-common-dependencies';
export const nxVersion = require('../../../package.json').version;

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

  if (!options.rootProject) {
    extractTsConfigBase(host);
  }


  createApplicationFiles(host, options);
  addProject(host, options);
  ensurePackage(host, '@nrwl/vite', nxVersion);

  const { initGenerator } = await import('@nrwl/vite');
  const viteTask = await initGenerator(host, {
    uiFramework: 'react',
  });
  tasks.push(viteTask);

  // Add @types/chrome if typescript is used.
  if (options.js !== true) {
    const devDependencies = {
      '@types/chrome': '0.0.216',
    }
    const addNpmPackagesTask = addDependenciesToPackageJson(host, {}, devDependencies);
    tasks.push(addNpmPackagesTask);
  }

  const lintTask = await addLinting(host, options);
  tasks.push(lintTask);

  const stylePreprocessorTask = installCommonDependencies(host, options);
  tasks.push(stylePreprocessorTask);

  await formatFiles(host);
  return runTasksInSerial(...tasks);
}
