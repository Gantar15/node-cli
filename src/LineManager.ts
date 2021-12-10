import readline from 'readline';
import fs from 'fs';
import EventEmitter from 'events';


export default class LineManager extends EventEmitter{
    protected readonly line: readline.Interface;

    protected promptStart(){
        this.line.prompt(true);
    }

    constructor(name: string, onLine?: (line: string) => void){
        super();
        this.line = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: `baboc->{${name}}>`,
            historySize: 20
        });
        this.promptStart();
        
        this.line.on('line', msg => {
            this.emit('line', msg);
            onLine ? onLine(msg) : void 0;
            this.promptStart();
        })
        
        this.line.on('SIGINT', () => {
            const askEnd = () => this.ask("Are you sure you want to exit from this excellent cli (y-yes, n-no) ? ", resp => {
                if(resp.match(/^yes|y$/i)) {
                    console.log('\nCli exit -_-');
                    this.line.close();
                    process.exit(2);
                };
                if(resp.match(/^no|n$/i)) return;
                else askEnd();
            });
            askEnd();
        });
    }

    write(msg: string | Buffer){
        this.line.write(msg);
        this.promptStart();
    }

    writeLine(msg: string | Buffer){
        this.line.write(msg+'\n');
        this.promptStart();
    }

    ask(question: string, handler: (answer: string) => void){
        this.line.question(question, handler);
        this.promptStart();
    }
}