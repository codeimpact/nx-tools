import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { Schema } from './schema';
import { Linter } from '@nrwl/linter/src/generators/utils/linter';

describe('nx-chrome-extension generator', () => {
  let appTree: Tree;
  const options: Schema = {linter: Linter.None, style: "none", name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
