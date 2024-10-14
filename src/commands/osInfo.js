import { cpus, homedir, userInfo } from 'os';

export function os(args) {
    const [ flag ] = args;
    switch (flag) {
        case '--EOL':
            console.log(JSON.stringify(process.env.OS_EOL || process.platform === 'win32' ? '\r\n' : '\n'));
            break;
        case '--cpus':
            const cpusInfo = cpus();
            console.log(`Overall amount of CPUS: ${cpusInfo.length}`);
            cpusInfo.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock rate - ${cpu.speed / 1000} GHz`);
            });
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(process.arch);
            break;
        default:
            console.log('Invalid input');
    }
}
