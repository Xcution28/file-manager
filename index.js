import { createInterface } from 'readline';
import { homedir } from 'os';

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

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});
