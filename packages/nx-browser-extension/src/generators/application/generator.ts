import { formatFiles, joinPathFragments, readProjectConfiguration, Tree,
  updateProjectConfiguration } from '@nrwl/devkit';
import { Schema } from './schema';
import { normalizeOptions } from './lib/normalize-options';
import { createApplicationFiles } from './lib/create-application-files';
import { applicationGenerator } from '@nrwl/react';
import { installCommonDependencies } from './lib/install-common-dependencies';

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

  delete (config.targets.preview);
  const distPath = joinPathFragments(
    'dist',
    options.projectRoot != '.'
      ? options.projectRoot
      : options.projectName
  );

  config.targets.build.executor = '@codeimpact/nx-browser-extension:build';
  config.targets.build.options.outputPath = `${distPath}/build`;

  config.targets.package = {
    executor: '@codeimpact/nx-browser-extension:package',
    dependsOn: ['build'],
    options: {
      artifactsDir: `${distPath}/package`,
    },
  };
  await updateProjectConfiguration(host, config.name, config);

  installCommonDependencies(host, options);

  await formatFiles(host);
}
