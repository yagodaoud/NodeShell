#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPriceUrl = fetchPriceUrl;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
async function fetchPriceUrl(ticker) {
    if (!ticker) {
        return "A ticker must be provided.";
    }
    const url = 'https://www.google.com/search?q=' + ticker + '+usd';
    const response = await (0, node_fetch_1.default)(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });
    if (!response.ok) {
        return "An error occurred.";
    }
    const html = await response.text();
    const $ = cheerio_1.default.load(html);
    const text = $('body').text();
    const match = text.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)[^\d]*USD/);
    if (match) {
        const price = ticker.toUpperCase() + ' price: $' + match[1];
        return price;
    }
    console.log('Not found');
    return "Not found";
}
