#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchPriceUrl } from './priceFetcher.js';
yargs(hideBin(process.argv))
    .command('hello [name]', 'Greet the user', (yargs) => {
    return yargs.positional('name', {
        describe: 'name to greet',
        default: 'world'
    });
}, (argv) => {
    console.log(`Hello, ${argv.name}!`);
})
    .command('fetch [ticker]', 'Fetch the price of a currency', (yargs) => {
    return yargs.positional('ticker', {
        describe: 'ticker to find the price of',
        default: ''
    });
}, async (argv) => {
    const price = await fetchPriceUrl(argv.ticker);
    console.log(price);
})
    .help()
    .argv;
