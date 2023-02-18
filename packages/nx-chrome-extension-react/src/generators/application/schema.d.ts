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


export interface ApplicationGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  manifestVersion?: number;
  popup?: boolean;
  background?: boolean;
  optionsPage?: boolean;
  contentScript?: boolean;
  devtoolsPage?: boolean;
  style: SupportedStyles;
  linter: Linter;
  skipFormat?: boolean;
  unitTestRunner?: 'jest' | 'vitest' | 'none';
  js?: boolean;
  strict?: boolean;
  standaloneConfig?: boolean;
  compiler?: 'babel' | 'swc';
  skipPackageJson?: boolean;
  rootProject?: boolean;
}
