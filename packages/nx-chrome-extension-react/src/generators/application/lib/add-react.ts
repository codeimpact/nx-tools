import { Tree } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/react';
import { Schema } from '../schema';
import { SupportedStyles } from '@nrwl/react/typings/style';
import { Linter } from '@nrwl/linter';

export async function addReact(
  host: Tree,
  options: Schema
): Promise<() => (void | Promise<void>)> {

  const reactAppSchema = {
    name: options.name,
    style: options.style as SupportedStyles,
    skipFormat: options.skipFormat,
    directory: options.directory,
    tags: options.tags,
    unitTestRunner: options.unitTestRunner as 'jest' | 'vitest' | 'none',
    inSourceTests: false,
    e2eTestRunner: 'none' as 'cypress' | 'none',
    linter: options.linter as Linter,
    pascalCaseFiles: true,
    classComponent: false,
    routing: false,
    skipWorkspaceJson: options.skipWorkspaceJson,
    js: options.js,
    globalCss: false,
    strict: options.strict,
    setParserOptionsProject: false,
    standaloneConfig: options.standaloneConfig,
    compiler: options.compiler as 'babel' | 'swc',
    remotes: [],
    skipPackageJson: options.skipPackageJson,
    rootProject: options.rootProject,
    bundler: 'vite' as 'webpack' | 'vite',
    minimal: true
  };

  return await applicationGenerator(host, reactAppSchema);
}
