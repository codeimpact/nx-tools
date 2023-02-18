import { Tree } from 'nx/src/generators/tree';
import { writeJson } from 'nx/src/generators/utils/json';

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
  } as any;

  if (options.style === '@emotion/styled') {
    json.compilerOptions.jsxImportSource = '@emotion/react';
  }

  json.compilerOptions.types = options.unitTestRunner === 'vitest' ? ['vite/client', 'vitest'] : ['vite/client'];
  json.extends = relativePathToRootTsConfig;

  writeJson(host, `${projectRoot}/tsconfig.json`, json);
}

export function extractTsConfigBase(host: Tree) {
  //shared.extractTsConfigBase(host);

  if (host.exists('vite.config.ts')) {
    const vite = host.read('vite.config.ts').toString();
    host.write(
      'vite.config.ts',
      vite.replace(`projects: []`, `projects: ['tsconfig.base.json']`)
    );
  }
}
