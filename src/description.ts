#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


export function getDescription(command: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, '../../resources/descriptions.txt');

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const match = fileContent.match(new RegExp(`${command}:(.*?)(?=\\n\\w+:|$)`, 's'));

    return match ? match[1].trim() : "";
}