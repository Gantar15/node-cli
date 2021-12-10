import fs from 'fs';
import { Stream } from 'stream';
import zlib, { gzip } from 'zlib';
import stoper from './stoper';


export default class FsMenubar{
    readonly path: string; 
    isFile!: boolean;
    isDirectory!: boolean;

    constructor(path: string){
        this.path = path;
        
        fs.stat(this.path, (err, stat) => {
            if(!err) {
                this.isDirectory = stat.isDirectory();
                this.isFile = stat.isFile();
            }
        });
    }

    checkExist(){
        fs.stat(this.path, err => {
            if(err) stoper(err.message, 2);
        });
    }

    write(data: string, endHandle?: () => void){
        if(!this.path.match(/^.*\..+$/))
            stoper("You must pass the path to the file", 9);
            
        const gzip = zlib.createGzip();
        const writeStream = fs.createWriteStream(this.path, {
            flags: 'a'
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

    read(endHandle?: (data: string) => void){
        this.checkExist();

        if(this.isFile){
            const readStream = fs.createReadStream(this.path);
            readStream.on('data', data => {
                zlib.unzip(data, (err, result) => {
                    if(err) {
                        endHandle ? endHandle(data.toString('utf8')) : null;
                        return;
                    }
                    endHandle ? endHandle(result.toString('utf8')) : null;
                });
            })
        }
        else if(this.isDirectory){
            fs.readdir(this.path, {
                encoding: 'utf8',
                withFileTypes: true
            }, (err, files) => {
                if(err)
                    stoper(`Cannot read dir ${this.path} -_-`, 2);

                const filenames = files.reduce((str, file) => str + ", " + file.name, '').slice(2);
                endHandle ? endHandle(filenames) : null;
            });
        }
    }

    create(endHandle?: () => void){
        if(this.path.match(/^.*\..+$/)){
            fs.createWriteStream(this.path);
            endHandle ? endHandle() : null;
        }
        else{
            fs.mkdir(this.path, {
                recursive: true
            }, err => {
                if(err)
                    stoper(err.message, 2);
            });
        }
        endHandle ? endHandle() : null;
    }

    remove(endHandle?: Function){
        fs.rm(this.path, {recursive: true}, err => {
            if(err)
                stoper(err.message, 9);
        });
        endHandle ? endHandle() : null;
    }

    watch(changeHandle: (type: string, data: string) => void, endHandle?: Function){
        this.checkExist();

        fs.watch(this.path, {recursive: true}, changeHandle);
        endHandle ? endHandle() : null;
    }
}