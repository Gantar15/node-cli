
export default function stoper(err: string, code: number){
    process.stderr.write(err+'\n');
    process.exit(code);
}