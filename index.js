import { createInterface } from 'readline';
import { homedir } from 'os';
import * as navigation from './src/commands/navigation.js';
import * as basicOperations from './src/commands/basicOperations.js';
import * as osInfo from './src/commands/osInfo.js';
import * as hash from './src/commands/hash.js';
import * as compressAndDecompress from './src/commands/compressAndDecompress.js';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let currentDir = homedir();
let username;

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

navigation.setCurrentDir(currentDir);
basicOperations.setCurrentDir(currentDir);
hash.setCurrentDir(currentDir);
compressAndDecompress.setCurrentDir(currentDir);

rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');
    handleCommand(command, args);
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});

function handleCommand(command, args) {
    switch (command) {
        case 'up':
            navigation.up();
            break;
        case 'cd':
            navigation.cd(args[0]);
            break;
        case 'ls':
            navigation.ls();
            break;
        case 'cat':
            basicOperations.cat(args[0]);
            break;
        case 'add':
            basicOperations.add(args[0]);
            break;
        case 'rn':
            basicOperations.rn(args[0], args[1]);
            break;
        case 'cp':
            basicOperations.cp(args[0], args[1]);
            break;
        case 'mv':
            basicOperations.mv(args[0], args[1]);
            break;
        case 'rm':
            basicOperations.rm(args[0]);
            break;
        case 'os':
            osInfo.os(args);
            break;
        case 'hash':
            hash.hash(args[0]);
            break;
        case 'compress':
            compressAndDecompress.compress(args[0], args[1]);
            break;
        case 'decompress':
            compressAndDecompress.decompress(args[0], args[1]);
            break;
    }
}
