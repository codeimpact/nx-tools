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
    test: createTestTarget(options),
    lint: createLintTarget(options),
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
    executor: '@codeimpact/nx-browser-extension:serve',
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

function createLintTarget(options: NormalizedSchema): TargetConfiguration {
  return {
    "executor": "@nrwl/linter:eslint",
    "outputs": ["{options.outputFile}"],
    "options": {
      "lintFilePatterns": ["packages/test/**/*.{ts,tsx,js,jsx}"]
    }
  };
}

function createTestTarget(options: NormalizedSchema): TargetConfiguration {
  return {
    "executor": "@nrwl/vite:test",
    "outputs": ["{projectRoot}/coverage"],
    "options": {
      "passWithNoTests": true
    }
  };
}
