import { resolve } from 'path';
import { readdir, stat } from 'fs';
import * as basicOperations from './basicOperations.js';
import * as hash from './hash.js';

let currentDir;

export function setCurrentDir(dir) {
    currentDir = dir;
    basicOperations.setCurrentDir(currentDir);
}

export function up() {
    const parentDir = resolve(currentDir, '..');
    if (parentDir !== currentDir) {
        currentDir = parentDir;
        basicOperations.setCurrentDir(currentDir);
        hash.setCurrentDir(currentDir);
    }
    console.log(`You are currently in ${currentDir}`);
}

export function cd(path) {
    const newPath = resolve(currentDir, path);
    stat(newPath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            console.log('Operation failed');
        } else {
            currentDir = newPath;
            basicOperations.setCurrentDir(currentDir);
            hash.setCurrentDir(currentDir);
            console.log(`You are currently in ${currentDir}`);
        }
    });
}

export function ls() {
    readdir(currentDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log('Operation failed');
        } else {
            const sortedFiles = files.sort((a, b) => {
                if (a.isDirectory() && !b.isDirectory()) return -1;
                if (!a.isDirectory() && b.isDirectory()) return 1;
                return a.name.localeCompare(b.name);
            });
            sortedFiles.forEach((file) => {
                console.log(`${file.name} ${file.isDirectory() ? 'DIR' : 'FILE'}`);
            });
        }
    });
}
