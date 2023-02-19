import { BuildExecutorSchema } from './schema';
import executor from './executor';

const options: BuildExecutorSchema = {};

describe('Serve Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
