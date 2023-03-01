import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import { NormalizedSchema } from '../schema';
import * as path from 'path';
import { createTsConfig } from './create-ts-config';

export async function createApplicationFiles(host: Tree, options: NormalizedSchema) {
  const templateVariables = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  }

  host.delete(`${options.projectRoot}/src`);
  host.delete(`${options.projectRoot}/public`);
  host.delete(`${options.projectRoot}/index.html`);

  generateFiles(
    host,
    path.join(__dirname, '../files'),
    options.projectRoot,
    templateVariables
  );

  createTsConfig(
    host,
    options.projectRoot,
    {},
    templateVariables.offsetFromRoot + 'tsconfig.base.json'
  )

  if (options.newTabPage == false && options.popupPage == false) {
    host.delete(`${options.projectRoot}/src/components/WelcomePage`);
  }

  if (options.backgroundScript == false) {
    host.delete(`${options.projectRoot}/src/pages/background`);
  }

  if (options.contentScript == false) {
    host.delete(`${options.projectRoot}/src/pages/content`);
    host.delete(`${options.projectRoot}/src/components/ContentArea`);
  }

  if (options.newTabPage == false) {
    host.delete(`${options.projectRoot}/src/pages/newtab`);
  }

  if (options.optionsPage == false) {
    host.delete(`${options.projectRoot}/src/pages/options`);
    host.delete(`${options.projectRoot}/src/components/OptionsPage`);
  }

  if (options.devtoolsPage == false) {
    host.delete(`${options.projectRoot}/src/pages/devtools`);
    host.delete(`${options.projectRoot}/src/pages/panel`);
    host.delete(`${options.projectRoot}/src/components/DeveloperToolsPanel`);
  }

  if (options.popupPage == false) {
    host.delete(`${options.projectRoot}/src/pages/popup`);
  }
}
