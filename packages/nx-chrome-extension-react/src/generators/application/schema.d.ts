import { Linter } from '@nrwl/linter';

export type SupportedStyles =
  | 'css'
  | 'scss'
  | 'styl'
  | 'less'
  | 'styled-components'
  | '@emotion/styled'
  | 'styled-jsx'
  | 'none';

export interface Schema {
  name: string;
  tags?: string;
  directory?: string;
  manifestVersion?: string;
  popup?: boolean;
  background?: boolean;
  optionsPage?: boolean;
  contentScript?: boolean;
  devtoolsPage?: boolean;
  style: SupportedStyles;
  linter: Linter;
  skipFormat?: boolean;
  unitTestRunner?: 'vitest' | 'none';
  skipWorkspaceJson?: boolean;
  js?: boolean;
  strict?: boolean;
  standaloneConfig?: boolean;
  compiler?: 'babel' | 'swc';
  skipPackageJson?: boolean;
  rootProject?: boolean;
}

export interface NormalizedSchema<T extends Schema = Schema> extends T {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
