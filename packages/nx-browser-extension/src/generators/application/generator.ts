import {
  addDependenciesToPackageJson,
  ensurePackage,
  formatFiles,
  GeneratorCallback,
  joinPathFragments,
  Tree,
  updateJson
} from '@nrwl/devkit';
import { Schema, NormalizedSchema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { createApplicationFiles } from './lib/create-application-files';
import { extendReactEslintJson, extraEslintDependencies, reactInitGenerator } from '@nrwl/react';
import { extractTsConfigBase } from './lib/create-ts-config';
import { addProject } from './lib/add-project';
import { installCommonDependencies } from './lib/install-common-dependencies';
import { Linter, lintProjectGenerator } from '@nrwl/linter';
import { mapLintPattern } from '@nrwl/linter/src/generators/lint-project/lint-project';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const nxVersion = require('../../../package.json').version;

async function addLinting(host: Tree, options: NormalizedSchema) {
  const tasks: GeneratorCallback[] = [];
  if (options.linter === Linter.EsLint) {
    const lintTask = await lintProjectGenerator(host, {
      linter: options.linter,
      project: options.projectName,
      tsConfigPaths: [
        joinPathFragments(options.projectRoot, 'tsconfig.app.json'),
      ],
      unitTestRunner: options.unitTestRunner,
      eslintFilePatterns: [
        mapLintPattern(
          options.projectRoot,
          '{ts,tsx,js,jsx}',
          options.rootProject
        ),
      ],
      skipFormat: true,
      rootProject: options.rootProject,
      skipPackageJson: options.skipPackageJson,
    });
    tasks.push(lintTask);

    updateJson(
      host,
      joinPathFragments(options.projectRoot, '.eslintrc.json'),
      extendReactEslintJson
    );

    if (!options.skipPackageJson) {
      const installTask = await addDependenciesToPackageJson(
        host,
        extraEslintDependencies.dependencies,
        {
          ...extraEslintDependencies.devDependencies
        }
      );
      tasks.push(installTask);
    }
  }
  return runTasksInSerial(...tasks);
}

export default async function applicationGenerator(
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
  const { viteConfigurationGenerator } = await import('@nrwl/vite');
  const viteTask = await viteConfigurationGenerator(host, {
    uiFramework: 'react',
    project: options.projectName,
    newProject: true,
    includeVitest: options.unitTestRunner === 'vitest',
    inSourceTests: false
  });
  tasks.push(viteTask);

  const lintOptions = {
    ...options,
    'js': false
  }

  const lintTask = await addLinting(host, lintOptions);
  tasks.push(lintTask);

  const stylePreprocessorTask = installCommonDependencies(host, options);
  tasks.push(stylePreprocessorTask);

  await formatFiles(host);
  return runTasksInSerial(...tasks);
}
