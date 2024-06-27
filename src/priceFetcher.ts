#!/usr/bin/env node

import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function fetchPriceUrl(ticker: string): Promise<string> {

    if (!ticker) {
        return "A ticker must be provided.";
    }
    const url = 'https://www.google.com/search?q=' + ticker + '+usd'

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

    const match = text.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)[^\d]*USD/);

    if (match) {
        const price = ticker.toUpperCase() + ' price: $' + match[1];
        console.log(price);
        return price;
    }

    console.log('Not found');
    return "Not found";
}
