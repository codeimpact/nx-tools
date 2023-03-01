import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { NormalizedSchema, Schema } from '../schema';

export function normalizeOptions(
  tree: Tree,
  options: Schema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = names(options.name).fileName;
  const project = projectDirectory.replace('/', '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const normalized = {
    ...options,
    projectName,
    project,
    projectRoot,
    projectDirectory,
    parsedTags,
  } as NormalizedSchema;

  normalized.manifestVersion = (options.manifestVersion === 'v3') ? '3' : '2';
  normalized.popupPage = normalized.popupPage ?? false;

  normalized.description = options.description || `Description for the ${normalized.projectName} extension`;

  return normalized;
}
