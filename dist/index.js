"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var line = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'boba>',
    historySize: 20
});
line.prompt(true);
line.on('line', function (msg) {
    console.log(msg + ' dadada');
    line.prompt(true);
    line.question("pos: ", function (pos) {
        readline_1.default.cursorTo(process.stdout, +pos, 20);
    });
});
line.on('SIGINT', function () {
    console.log('\ncli out');
    line.close();
});
line.question("your name: ", function (name) {
    var oldPrompt = line.getPrompt();
    var promptFragment = oldPrompt.slice(0, oldPrompt.length - 1);
    line.setPrompt("".concat(promptFragment, "{").concat(name, "}>"));
    line.prompt(true);
});
