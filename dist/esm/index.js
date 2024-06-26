#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
yargs(hideBin(process.argv))
    .command('hello [name]', 'Greet the user', (yargs) => {
    return yargs.positional('name', {
        describe: 'name to greet',
        default: 'world'
    });
}, (argv) => {
    console.log(`Hello, ${argv.name}!`);
})
    .help()
    .argv;
