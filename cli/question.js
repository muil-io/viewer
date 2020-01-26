const readline = require('readline');

const ask = async (question, errorMessage, hideOutput) =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const stdin = process.openStdin();

    if (hideOutput) {
      process.stdin.on('data', char => {
        // eslint-disable-next-line no-param-reassign
        char += '';
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            stdin.pause();
            break;
          default:
            process.stdout.clearLine();
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(question + Array(rl.line.length + 1).join('*'));
            break;
        }
      });
    }

    rl.question(question, answer => {
      if (!answer) {
        reject(new Error(errorMessage));
      }
      resolve(answer);
      rl.close();
    });
  });

module.exports = ask;
