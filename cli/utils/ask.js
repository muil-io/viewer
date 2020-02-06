import readline from 'readline';

const ask = async (question, hideOutput = false) =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (hideOutput) {
      process.stdin.on('data', char => {
        // eslint-disable-next-line no-param-reassign
        char += '';
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            break;
          default:
            process.stdout.clearLine();
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(question + Array(rl.line.length + 1).join('*'));
            break;
        }
      });
    }

    rl.question(question, async answer => {
      if (!answer) {
        rl.close();
        const innerAnswer = await ask(question, hideOutput);
        resolve(innerAnswer);
      } else {
        resolve(answer);
        rl.close();
      }
    });
  });

export default ask;
