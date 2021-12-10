import LineManager from './src/LineManager';
import argConfig from './src/argConfig';
import stoper from './src/stoper';
import FsMenubar from "./src/FsMenubar";
import fs from 'fs';


function start(){
    try{
        const [name, password] = argConfig();
        
        const lineManager = new LineManager(name);
        
        const startMenu = () => lineManager.ask('Write path: ', path => {
            const menu = new FsMenubar(path);
            const operations = ['create', 'read', 'write', 'remove', 'watch'];

            const fsMenubarHandler = (variant: string) => {
                const selected = parseInt(variant);
                if(selected && selected >= 1 && selected <= 4){
                    switch(selected){
                        case 1:
                            menu.create(() => {
                                lineManager.writeLine('Success');
                            });
                            break;
                        case 2:
                            menu.read(data => {
                                lineManager.writeLine(data);
                            });
                            break;
                        case 3:
                            lineManager.ask("Write some data: ", data => 
                            menu.write(data, () => {
                                lineManager.writeLine('Success');
                            }));
                            break;
                        case 4:
                            menu.remove(() => {
                                lineManager.writeLine('Success');
                            });
                            break;
                        case 5:
                            menu.watch(
                                (type, data) => {
                                    lineManager.writeLine(`type: ${type}, data: ${data}`);
                                }
                            );
                            break;
                    }
                }
            };

            lineManager.ask(`
                Select something
                    1) ${operations[0]}
                    2) ${operations[1]}
                    3) ${operations[2]}
                    4) ${operations[3]}
                    5) ${operations[4]}
            `, fsMenubarHandler);
        });

        lineManager.write('To invoke menu write -m\n');
        lineManager.on('line', msg => {
            if(msg == '-m') startMenu();
        });
    }
    catch(err: any){
        stoper(err, 2);
    }
}
start();