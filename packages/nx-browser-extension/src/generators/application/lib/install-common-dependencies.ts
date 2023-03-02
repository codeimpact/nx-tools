import { addDependenciesToPackageJson, installPackagesTask, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';

export function installCommonDependencies(
  host: Tree,
  options: NormalizedSchema
) {
  addDependenciesToPackageJson(
    host,
    {
      'webextension-polyfill': 'latest',
    },
    {
      "@types/chrome": "^0.0.181",
      '@types/firefox-webext-browser': 'latest',
      '@types/webextension-polyfill': 'latest',
      'web-ext': 'latest',
      'web-ext-types': 'latest',
    }
  );
  installPackagesTask(host);
}
