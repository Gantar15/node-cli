import required_args from './store/required_args.json';
import users from './store/users.json';
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

const argConfig = () => {
    const args = process.argv.slice(2);

    const config = validateArgs(args);
    if(!config){
        stoper("You forgot point necessary argument", 9);
    }

    const writenName = config!['-name'];
    const writenPassword = config!['-password'];

    //@ts-expect-error
    if(users[writenName] != writenPassword){
        stoper("Wrong name or password :3", 9);
    }

    return [writenName, writenPassword];
};
export default argConfig;