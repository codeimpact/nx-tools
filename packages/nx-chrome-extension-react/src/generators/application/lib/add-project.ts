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

  project.targets = {
    build: createBuildTarget(options),
    serve: createServeTarget(options),
    live: createNewServe(options),
  };

  addProjectConfiguration(host, options.projectName, {
    ...project,
  });
}
function createBuildTarget(options: NormalizedSchema): TargetConfiguration {
  return {
    executor: '@nrwl/vite:build',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      outputPath: joinPathFragments(
        'dist',
        options.projectRoot != '.'
          ? options.projectRoot
          : options.projectName
      ),
      "configurations": {
        "development": {
          "mode": "development"
        },
        "production": {
          "mode": "production"
        }
      }
    },
  };
}

function createNewServe(options: NormalizedSchema): TargetConfiguration {
  return {
    executor: '@codeimpact/nx-chrome-extension-react:serve',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      outputPath: joinPathFragments(
        'dist',
        options.projectRoot != '.'
          ? options.projectRoot
          : options.projectName
      ),
      "configurations": {
        "development": {
          "mode": "development"
        },
        "production": {
          "mode": "production"
        }
      }
    },
  };
}

function createServeTarget(options: NormalizedSchema): TargetConfiguration {
  return {
    executor: '@nrwl/vite:build',
    outputs: ['{options.outputPath}'],
    defaultConfiguration: 'production',
    options: {
      outputPath: joinPathFragments(
        'dist',
        options.projectRoot != '.'
          ? options.projectRoot
          : options.projectName
      ),
      "watch": true,
      "configurations": {
        "development": {
          "mode": "development"
        },
        "production": {
          "mode": "production"
        }
      }
    },
  };
}
