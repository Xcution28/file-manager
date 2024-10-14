import { resolve } from 'path';
import { readFile } from 'fs';
import { createHash } from 'crypto';

let currentDir;

export function setCurrentDir(dir) {
    currentDir = dir;
}

export function hash(path) {
    const fullPath = resolve(currentDir, path);
    readFile(fullPath, (err, data) => {
        console.log(fullPath, 'full path for checking')
        if (err) {
            console.log('Operation failed');
        } else {
            const hash = createHash('sha256').update(data).digest('hex');
            console.log(hash);
        }
    });
}
