import { NormalizedSchema } from '../schema';
import {
  addProjectConfiguration,
  joinPathFragments,
  ProjectConfiguration,
  TargetConfiguration,
} from '@nrwl/devkit';

export function addProject(host, options: NormalizedSchema) {
  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'application',
    targets: {},
    tags: options.parsedTags,
  };

  addProjectConfiguration(host, options.projectName, {
    ...project,
  });
}

function maybeJs(options: NormalizedSchema, path: string): string {
  return options.js && (path.endsWith('.ts') || path.endsWith('.tsx'))
    ? path.replace(/\.tsx?$/, '.js')
    : path;
}
