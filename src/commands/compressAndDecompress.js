import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

let currentDir;

export function setCurrentDir(dir) {
    currentDir = dir;
}

export function compress(srcPath, destPath) {
    const fullSrcPath = resolve(currentDir, srcPath);
    console.log(fullSrcPath, 'path to file');
    const fullDestPath = resolve(currentDir, destPath);
    console.log(fullDestPath, 'path to destination');

    const readStream = createReadStream(fullSrcPath);
    const writeStream = createWriteStream(fullDestPath);

    readStream.on('error', (err) => {
        console.error(`Read stream error: ${err.message}`);
    });

    writeStream.on('error', (err) => {
        console.error(`Write stream error: ${err.message}`);
    });

    readStream.pipe(createBrotliCompress()).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File compressed from ${srcPath} to ${destPath} successfully`);
    });
}

export function decompress(srcPath, destPath) {
    const fullSrcPath = resolve(currentDir, srcPath);
    const fullDestPath = resolve(currentDir, destPath);

    const readStream = createReadStream(fullSrcPath);
    const writeStream = createWriteStream(fullDestPath);

    readStream.on('error', (err) => {
        console.error(`Read stream error: ${err.message}`);
    });

    writeStream.on('error', (err) => {
        console.error(`Write stream error: ${err.message}`);
    });

    readStream.pipe(createBrotliDecompress()).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`File decompressed from ${srcPath} to ${destPath} successfully`);
    });
}
