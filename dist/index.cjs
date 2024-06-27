#!/usr/bin/env node
"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const priceFetcher_js_1 = require("./priceFetcher.cjs");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
    const price = await (0, priceFetcher_js_1.fetchPriceUrl)(argv.ticker);
    console.log(price);
})
    .help()
    .argv;

