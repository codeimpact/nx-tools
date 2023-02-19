import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import { Schema } from './schema';
import applicationGenerator from './generator';

describe('nx-browser-extension:application generator', () => {
  let appTree: Tree;
  const schema: Schema = {
    skipFormat: false,
    manifestVersion: '3',
    optionsPage: true,
    backgroundScript: true,
    newTabPage: true,
    contentScript: true,
    devtoolsPage: true,
    name: 'my-app',
    style: 'scss',
    strict: true,
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should run successfully', async () => {
    await applicationGenerator(appTree, schema);
    const config = readProjectConfiguration(appTree, 'my-app');
    expect(config).toBeDefined();
  });
});
