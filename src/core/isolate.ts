import ivm from 'isolated-vm';

const isolateTest = async () => {
  const isolate = new ivm.Isolate({ memoryLimit: 30 });
  const context = isolate.createContextSync();
  const jail = context.global;
  jail.setSync('log', function (...args: unknown[]) {
    console.log(...args);
  });

  jail.setSync('ret', 0);

  const hostile = isolate.compileScriptSync(
    `const result = 5 + 5; log('hello world', result); ret = result`,
  );
  const resp = await hostile.run(context);
  console.log('resp:', resp);
};

export default isolateTest;
