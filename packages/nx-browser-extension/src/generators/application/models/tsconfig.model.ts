export interface TsconfigModel {
  extends?: string;
  compilerOptions?: {
    jsx?: string;
    allowJs?: boolean;
    esModuleInterop?: boolean;
    allowSyntheticDefaultImports?: boolean;
    strict?: boolean;
    jsxImportSource?: string;
    types?: string[];
  };
  files?: string[];
  include?: string[];
  references?: {
    path?: string;
  }
}
