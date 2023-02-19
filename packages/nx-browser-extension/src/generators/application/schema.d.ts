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

export interface NxBrowserExtensionGeneratorSchema {
  name: string;
  directory?: string;
  description?: string;
  manifestVersion?: string;
  firefoxBuild?: boolean;
  popupPage?: boolean;
  backgroundScript?: boolean;
  optionsPage?: boolean;
  newTabPage?: boolean;
  contentScript?: boolean;
  devtoolsPage?: boolean;
  style?: SupportedStyles;
  linter?: Linter;
  skipFormat?: boolean;
  skipWorkspaceJson?: boolean;
  unitTestRunner?: 'vitest' | 'none';

  tags?: string;
  strict?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}

export interface NormalizedSchema<T extends Schema = Schema> extends T {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
