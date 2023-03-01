import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';

export function installCommonDependencies(
  host: Tree,
  options: NormalizedSchema
) {
  const devDependencies = {}
  return devDependencies
    ? addDependenciesToPackageJson(host, {}, {...devDependencies, '@types/chrome': '0.0.216'})
    : {};
}
