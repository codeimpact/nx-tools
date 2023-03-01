import {
  addDependenciesToPackageJson,
  formatFiles,
  GeneratorCallback,
  joinPathFragments, readProjectConfiguration,
  Tree,
  updateJson, updateProjectConfiguration
} from '@nrwl/devkit';
import { Schema, NormalizedSchema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { createApplicationFiles } from './lib/create-application-files';
import {applicationGenerator, extendReactEslintJson, extraEslintDependencies } from '@nrwl/react';
import { installCommonDependencies } from './lib/install-common-dependencies';
import { Linter, lintProjectGenerator } from '@nrwl/linter';
import { mapLintPattern } from '@nrwl/linter/src/generators/lint-project/lint-project';
import { resolve } from 'path';

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

export default async function createBrowserExtension(
  host: Tree,
  schema: Schema
) {
  const options = normalizeOptions(host, schema);

  await applicationGenerator(host, {
    name: options.name,
    style: options.style,
    skipFormat: false,
    directory: options.directory,
    tags: options.tags,
    unitTestRunner: options.unitTestRunner,
    inSourceTests: false,
    e2eTestRunner: 'none',
    linter: options.linter,
    pascalCaseFiles: true,
    classComponent: false,
    routing: false,
    globalCss: true,
    strict: true,
    bundler: 'vite',
    minimal: true,
    rootProject: options.rootProject
  });

  await createApplicationFiles(host, options);

  const config = readProjectConfiguration(host, options.project);
  config.targets.serve.executor = '@codeimpact/nx-browser-extension:serve';
  config.targets.build.executor = '@codeimpact/nx-browser-extension:build';
  delete(config.targets.preview);

  const buildPath = config.targets.build.options.outputPath;
  config.targets.package = {
    executor: '@codeimpact/nx-browser-extension:package',
    dependsOn: ['build'],
    options: {
      sourceDir: config.targets.build.options.outputPath,
      artifactsDir: resolve(buildPath, '..'),
    },
  };
  await updateProjectConfiguration(host, config.name, config);

  await formatFiles(host);
}
