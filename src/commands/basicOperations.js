import { resolve, basename } from 'path';
import {
    writeFile,
    rename,
    unlink,
    createReadStream,
    createWriteStream,
} from 'fs';

let currentDir;

export function setCurrentDir(dir) {
    currentDir = dir;
}

export function cat(path) {
    const fullPath = resolve(currentDir, path);
    const readStream = createReadStream(fullPath, 'utf8');
    readStream.on('data', (chunk) => console.log(chunk));
    readStream.on('error', (err) => console.log(`Operation failed: ${err.message}`));
    readStream.on('end', () => console.log('File read successfully'));
}

export function add(fileName) {
    const fullPath = resolve(currentDir, fileName);
    writeFile(fullPath, '', (err) => {
        if (err) {
            console.log(`Operation failed: ${err.message}`);
        } else {
            console.log(`File ${fileName} created successfully`);
        }
    });
}

export function rn(oldPath, newName) {
    const fullOldPath = resolve(currentDir, oldPath);
    const fullNewPath = resolve(currentDir, newName);
    rename(fullOldPath, fullNewPath, (err) => {
        if (err) {
            console.log(`Operation failed: ${err.message}`);
        } else {
            console.log(`File renamed from ${oldPath} to ${newName} successfully`);
        }
    });
}

export function cp(srcPath, destPath) {
    const fullSrcPath = resolve(currentDir, srcPath);
    const fullDestPath = resolve(currentDir, destPath, basename(srcPath));
    const readStream = createReadStream(fullSrcPath);
    const writeStream = createWriteStream(fullDestPath);
    readStream.pipe(writeStream);
    readStream.on('error', (err) => console.log(`Operation failed: ${err.message}`));
    writeStream.on('error', (err) => console.log(`Operation failed: ${err.message}`));
    writeStream.on('finish', () => console.log(`File copied from ${srcPath} to ${destPath} successfully`));
}

export function mv(srcPath, destPath) {
    cp(srcPath, destPath);
    rm(srcPath);
}

export function rm(path) {
    const fullPath = resolve(currentDir, path);
    unlink(fullPath, (err) => {
        if (err) {
            console.log(`Operation failed: ${err.message}`);
        } else {
            console.log(`File ${path} deleted successfully`);
        }
    });
}
