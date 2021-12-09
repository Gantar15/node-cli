
export default function stoper(err: string, code: number){
    process.stderr.write(err);
    process.exit(code);
}