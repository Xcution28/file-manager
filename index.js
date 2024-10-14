import { createInterface } from 'readline';
import { homedir } from 'os';
import * as navigation from './src/commands/navigation.js';

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
    }
}
