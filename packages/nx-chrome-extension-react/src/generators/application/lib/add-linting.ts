import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  joinPathFragments,
  Tree,
  updateJson,
} from '@nrwl/devkit';

import { NormalizedSchema } from '../schema';
import { Linter, lintProjectGenerator } from '@nrwl/linter';
import { mapLintPattern } from '@nrwl/linter/src/generators/lint-project/lint-project';
import { extendReactEslintJson, extraEslintDependencies } from '@nrwl/react';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

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
