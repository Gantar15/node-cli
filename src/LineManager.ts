import readline from 'readline';
import fs from 'fs';


export default class LineManager {
    protected readonly line: readline.Interface;

    protected promptStart(){
        this.line.prompt(true);
    }

    constructor(name: string, onLine?: (line: string) => void){
        this.line = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: `baboc${name}>`,
            historySize: 20
        });
        this.promptStart();
        
        this.line.on('line', msg => {
            onLine ? onLine(msg) : void 0;
            this.promptStart();
        })
        
        this.line.on('SIGINT', () => {
            console.log('\ncli out');
            this.line.close();
        });
    }

    write(msg: string | Buffer){
        this.line.write(msg);
        this.promptStart();
    }

    ask(question: string, handler: (answer: string) => void){
        this.line.question(question, handler);
        this.promptStart();
    }
}