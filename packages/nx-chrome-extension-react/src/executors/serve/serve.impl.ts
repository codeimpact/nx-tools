import { Schema } from './schema';
import {
  ExecutorContext,
  joinPathFragments,
  parseTargetString,
  readTargetOptions,
  workspaceLayout,
} from '@nrwl/devkit';

export default async function* fileServerExecutor(
  options: Schema,
  context: ExecutorContext
) {
  let running = false;

  console.log('lets do it');
  // const run = () => {
  //   if (!running) {
  //     running = true;
  //     try {
  //       const args = getBuildTargetCommand(options);
  //       execFileSync(pmCmd, args, {
  //         stdio: [0, 1, 2],
  //       });
  //     } catch {
  //       throw new Error(
  //         `Build target failed: ${chalk.bold(options.buildTarget)}`
  //       );
  //     } finally {
  //       running = false;
  //     }
  //   }
  // };
  //
  // let disposeWatch: () => void;
  // if (options.watch) {
  //   disposeWatch = createFileWatcher(context.root, run);
  // }
  //
  // // perform initial run
  // run();
  //
  // const outputPath = getBuildTargetOutputPath(options, context);
  //
  // if (options.spa) {
  //   const src = join(outputPath, 'index.html');
  //   const dst = join(outputPath, '404.html');
  //
  //   // See: https://github.com/http-party/http-server#magic-files
  //   copyFileSync(src, dst);
  // }
  //
  // const args = getHttpServerArgs(options);
  //
  // const { path: pathToHttpServerPkgJson, packageJson } = readModulePackageJson(
  //   'http-server',
  //   module.paths
  // );
  // const pathToHttpServerBin = packageJson.bin['http-server'];
  // const pathToHttpServer = resolve(
  //   pathToHttpServerPkgJson.replace('package.json', ''),
  //   pathToHttpServerBin
  // );
  //
  // const serve = fork(pathToHttpServer, [outputPath, ...args], {
  //   stdio: 'pipe',
  //   cwd: context.root,
  //   env: {
  //     FORCE_COLOR: 'true',
  //     ...process.env,
  //   },
  // });
  //
  // const processExitListener = () => {
  //   serve.kill();
  //   if (disposeWatch) {
  //     disposeWatch();
  //   }
  //
  //   if (options.spa) {
  //     unlinkSync(join(outputPath, '404.html'));
  //   }
  // };
  // process.on('exit', processExitListener);
  // process.on('SIGTERM', processExitListener);
  // serve.stdout.on('data', (chunk) => {
  //   if (chunk.toString().indexOf('GET') === -1) {
  //     process.stdout.write(chunk);
  //   }
  // });
  // serve.stderr.on('data', (chunk) => {
  //   process.stderr.write(chunk);
  // });
  //
  // yield {
  //   success: true,
  //   baseUrl: `${options.ssl ? 'https' : 'http'}://${options.host}:${
  //     options.port
  //   }`,
  // };
  //
  // return new Promise<{ success: boolean }>((res) => {
  //   serve.on('exit', (code) => {
  //     if (code == 0) {
  //       res({ success: true });
  //     } else {
  //       res({ success: false });
  //     }
  //   });
  //});
}
