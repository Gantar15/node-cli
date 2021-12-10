import LineManager from './src/LineManager';
import argConfig from './src/argConfig';
import stoper from './src/stoper';
import FsMenubar from "./src/FsMenubar";
import fs from 'fs';


function start(){
    const name = "valera_admin";
    const password = "admin";

    try{
        argConfig(name, password);
        
        const lineManager = new LineManager(name);
        
        const startMenu = () => lineManager.ask('Write path to potential file: ', path => {

            const menu = new FsMenubar(path);
            const operations = ['create', 'read', 'write', 'remove', 'watch'];

            const fsMenubarHandler = (variant: string) => {
                const selected = parseInt(variant);
                if(selected && selected >= 1 && selected <= 4){
                    switch(selected){
                        case 1:
                            menu.create(() => startMenu());
                            break;
                        case 2:
                            menu.read(data => {
                                lineManager.write(data);
                                startMenu();
                            });
                            break;
                        case 3:
                            lineManager.ask("Write some data: ", data => 
                            menu.write(data, () => startMenu()));
                            break;
                        case 4:
                            menu.remove(() => startMenu());
                            break;
                        case 5:
                            menu.watch((type, data) => lineManager.write(data),
                                () => startMenu());
                            break;
                        default:
                            startMenu();
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
        startMenu();
    }
    catch(err: any){
        stoper("Uncknown error", 2);
    }
}
start();