import fs from 'fs';
import { Stream } from 'stream';
import zlib, { gzip } from 'zlib';
import stoper from './stoper';


export default class FsMenubar{
    protected readonly path; 

    constructor(path: string){
        this.path = path;
    }

    checkExist(){
        fs.stat(this.path, err => {
            if(err) stoper(err.message, 2);
        });
    }

    write(data: string, endHandle: () => void){
        this.checkExist();

        const gzip = zlib.createGzip();
        const writeStream = fs.createWriteStream(this.path, {
            start: 0
        });

        Stream.pipeline(
            async function*(){
                for await (const ch of data){
                    yield ch;
                }
            }, 
            gzip, 
            writeStream,
            endHandle
        );
    }

    read(endHandle: (data: string) => void){
        this.checkExist();

        const readStream = fs.createReadStream(this.path);
        readStream.on('data', data => {
            zlib.unzip(data, (err, result) => {
                if(err) stoper(err.message, 2);
                endHandle(result.toString('utf8'));
            });
        })
    }

    create(endHandle: () => void){
        fs.createWriteStream(this.path);
    }

    remove(endHandle: () => void){
        this.checkExist();

        fs.rm(this.path, {force: true}, err => err);
        endHandle();
    }

    watch(changeHandle: (type: string ,data: string) => void, endHandle: () => void){
        this.checkExist();

        fs.watch(this.path, {recursive: true}, changeHandle);
        endHandle();
    }
}