import required_args from './required_args.json';
import stoper from './stoper';


type configType = {
    [arg: string]: string
};
const validateArgs = (args: string[]) : configType | null => {
    if(!required_args.every(reqArg => args.includes(reqArg))) return null;
    
    const config = <configType>{};
    required_args.forEach(reqArg => {
        if(~args.indexOf(reqArg))
            config[reqArg] = args[args.indexOf(reqArg) + 1];
    });

    return config;
};

const argConfig = (name: string, password: string) => {
    const args = process.argv.slice(2);

    const config = validateArgs(args);
    if(!config){
        stoper("You forgot point necessary argument", 9);
    }

    if(config!['-name'] != name || config!['-password'] != password){
        stoper("Wrong name or password :3", 9);
    }
};
export default argConfig;