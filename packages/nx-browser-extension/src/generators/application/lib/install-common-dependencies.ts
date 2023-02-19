import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
export const lessVersion = '3.12.2';
export const sassVersion = '^1.55.0';
export const stylusVersion = '^0.55.0';
import { NormalizedSchema } from '../schema';

export function installCommonDependencies(
  host: Tree,
  options: NormalizedSchema
) {
  let devDependencies = null;
    switch (options.style) {
      case 'scss':
        devDependencies = { sass: sassVersion };
        break;
      case 'less':
        devDependencies = { less: lessVersion };
        break;
      case 'styl':
        devDependencies = { stylus: stylusVersion };
        break;
    }

  return devDependencies
    ? addDependenciesToPackageJson(host, {}, {...devDependencies, '@types/chrome': '0.0.216'})
    : {};
}
