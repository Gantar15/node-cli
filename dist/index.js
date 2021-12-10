"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LineManager_1 = __importDefault(require("./src/LineManager"));
var argConfig_1 = __importDefault(require("./src/argConfig"));
var stoper_1 = __importDefault(require("./src/stoper"));
var FsMenubar_1 = __importDefault(require("./src/FsMenubar"));
function start() {
    try {
        var _a = (0, argConfig_1.default)(), name_1 = _a[0], password = _a[1];
        var lineManager_1 = new LineManager_1.default(name_1);
        var startMenu_1 = function () { return lineManager_1.ask('Write path: ', function (path) {
            var menu = new FsMenubar_1.default(path);
            var operations = ['create', 'read', 'write', 'remove', 'watch'];
            var fsMenubarHandler = function (variant) {
                var selected = parseInt(variant);
                if (selected && selected >= 1 && selected <= 4) {
                    switch (selected) {
                        case 1:
                            menu.create(function () {
                                lineManager_1.writeLine('Success');
                            });
                            break;
                        case 2:
                            menu.read(function (data) {
                                lineManager_1.writeLine(data);
                            });
                            break;
                        case 3:
                            lineManager_1.ask("Write some data: ", function (data) {
                                return menu.write(data, function () {
                                    lineManager_1.writeLine('Success');
                                });
                            });
                            break;
                        case 4:
                            menu.remove(function () {
                                lineManager_1.writeLine('Success');
                            });
                            break;
                        case 5:
                            menu.watch(function (type, data) {
                                lineManager_1.writeLine("type: ".concat(type, ", data: ").concat(data));
                            });
                            break;
                    }
                }
            };
            lineManager_1.ask("\n                Select something\n                    1) ".concat(operations[0], "\n                    2) ").concat(operations[1], "\n                    3) ").concat(operations[2], "\n                    4) ").concat(operations[3], "\n                    5) ").concat(operations[4], "\n            "), fsMenubarHandler);
        }); };
        lineManager_1.write('To invoke menu write -m\n');
        lineManager_1.on('line', function (msg) {
            if (msg == '-m')
                startMenu_1();
        });
    }
    catch (err) {
        (0, stoper_1.default)(err, 2);
    }
}
start();
