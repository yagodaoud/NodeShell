#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
async function fetchUrl(url) {
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
    const match = text.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)[^\d]*Dólar americano/);
    if (match) {
        const price = 'BTC Price: $' + match[1];
        console.log(price);
        return price;
    }
    return "";
}
fetchUrl('https://www.google.com/search?q=btc+usd');
