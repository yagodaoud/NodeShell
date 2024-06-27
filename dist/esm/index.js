#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchPriceUrl } from './priceFetcher.js';
import { getDescription } from './description.js';
yargs(hideBin(process.argv))
    .command('hello [name]', 'Greet the user', (yargs) => {
    return yargs.positional('name', {
        describe: 'name to greet',
        default: 'world'
    });
}, (argv) => {
    console.log(`Hello, ${argv.name}!`);
})
    .command('fetch [ticker]', getDescription('fetch'), (yargs) => {
    return yargs.positional('ticker', {
        describe: 'ticker to find the price of',
        type: 'string',
        demandOption: true,
    })
        .option('s', {
        alias: 'stock',
        describe: 'flag necessary to fetch for stocks',
        demandOption: false,
        default: ''
    });
}, async (argv) => {
    const type = argv.s ? 's' : '';
    if (type === 's') {
        argv.ticker = argv.s;
    }
    const price = await fetchPriceUrl(argv.ticker, type);
    console.log(price);
})
    .help()
    .argv;
