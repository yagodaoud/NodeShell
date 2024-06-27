#!/usr/bin/env node

import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function fetchPriceUrl(ticker: string, type: string): Promise<string> {

    if (!ticker) {
        return "A ticker must be provided.";
    }

    if (ticker.toLowerCase() === 'usd') {
        return "You can't search for usd/usd.";
    }

    const url = `https://www.google.com/search?q=${ticker}+usd&gl=us&hl=en`

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });
    
    if (!response.ok) {
        return "An error occurred.";
    }

    const html = await response.text();

    const $ = cheerio.load(html);     
    
    const text = $('body').text();

    let regex = new RegExp(`(\\d{1,3}(?:[.,]\\d{3})*(?:[.,]\\d+)?)[^\\d]*United States Dollar`)

    if (type == 's') {
        regex = new RegExp(`(?:Stock Price)(\\d{1,3}(?:[.,]\\d{3})*(?:[.,]\\d+)?)`);
    }

    let match = text.match(regex);

    if (match) {
        const price = ticker.toUpperCase() + ' price: $' + match[1];
        return price;
    }

    return "Not found";
}
