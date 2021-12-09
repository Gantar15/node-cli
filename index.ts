import fs from 'fs';
import readline from 'readline';
import zlib from 'zlib';

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'boba>',
    historySize: 20
});
line.prompt(true);

line.on('line', msg => {
    console.log(msg + ' dadada');
    line.prompt(true);
})

line.on('SIGINT', () => {
    console.log('\ncli out');
    line.close();
});

line.question("your name: ", name => {
    const oldPrompt = line.getPrompt(); 
    const promptFragment = oldPrompt.slice(0, oldPrompt.length-1);
    line.setPrompt(`${promptFragment}{${name}}>`);
    line.prompt(true);
});