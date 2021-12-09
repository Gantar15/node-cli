import fs from 'fs';
import zlib from 'zlib';
import LineManager from './src/LineManager';
import argConfig from './src/argConfig';
import stoper from './src/stoper';


function Start(){
    const name = "valera_admin";
    const password = "admin";

    try{
        const lineManager = new LineManager(name);
        argConfig(name, password);
    }   
    catch(err: any){
        stoper("Uncknown error", 2);
    }
}
Start();