const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

const log = console.log;

program.version('1.0.0').description('Simple Password Generator');

program
  .option('-l, --length <number>', 'Length of password', '8')
  .option('-s, --save', 'Save password to passwords.txt')
  .option('-nn, --no-numbers', 'Remove numbers')
  .option('-ns, --no-symbols', 'Remove symbols')
  .parse();

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save to file
if (save) savePassword(generatedPassword);

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

// Output generated password
log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));
