#!/usr/bin/env node
import fetch from 'node-fetch';
import cheerio from 'cheerio';
async function fetchUrl(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });
    if (!response.ok) {
        return "An error occurred.";
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $('body').text();
    const match = text.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)[^\d]*Dólar americano/);
    if (match) {
        const price = 'BTC Price: ${match[1]}';
        console.log('Extracted Data:', match[1]);
        return price;
    }
    return "";
}
fetchUrl('https://www.google.com/search?q=btc+usd');
