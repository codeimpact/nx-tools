import { Tree } from 'nx/src/generators/tree';
import { writeJson } from 'nx/src/generators/utils/json';
import { TsconfigModel } from '../models/tsconfig.model';

export function createTsConfig(
  host: Tree,
  projectRoot: string,
  options: {
    strict?: boolean;
    style?: string;
    bundler?: string;
    rootProject?: boolean;
    unitTestRunner?: string;
  },
  relativePathToRootTsConfig: string
) {
  const json = {
    compilerOptions: {
      jsx: 'react-jsx',
      allowJs: false,
      esModuleInterop: false,
      allowSyntheticDefaultImports: true,
      strict: options.strict,
    },
    files: [],
    include: [],
    references: [
      {
        path: './tsconfig.app.json',
      },
    ],
  } as TsconfigModel;

  if (options.style === '@emotion/styled') {
    json.compilerOptions.jsxImportSource = '@emotion/react';
  }

  json.compilerOptions.types = options.unitTestRunner === 'vitest' ? ['vite/client', 'vitest'] : ['vite/client'];
  json.extends = relativePathToRootTsConfig;

  writeJson(host, `${projectRoot}/tsconfig.json`, json);
}
