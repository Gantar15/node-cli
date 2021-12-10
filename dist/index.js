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
    var name = "valera_admin";
    var password = "admin";
    try {
        (0, argConfig_1.default)(name, password);
        var lineManager_1 = new LineManager_1.default(name);
        var startMenu_1 = function () { return lineManager_1.ask('Write path to potential file: ', function (path) {
            var menu = new FsMenubar_1.default(path);
            var operations = ['create', 'read', 'write', 'remove', 'watch'];
            var fsMenubarHandler = function (variant) {
                var selected = parseInt(variant);
                if (selected && selected >= 1 && selected <= 4) {
                    switch (selected) {
                        case 1:
                            menu.create(function () { return startMenu_1(); });
                            break;
                        case 2:
                            menu.read(function (data) {
                                lineManager_1.write(data);
                                startMenu_1();
                            });
                            break;
                        case 3:
                            lineManager_1.ask("Write some data: ", function (data) {
                                return menu.write(data, function () { return startMenu_1(); });
                            });
                            break;
                        case 4:
                            menu.remove(function () { return startMenu_1(); });
                            break;
                        case 5:
                            menu.watch(function (type, data) { return lineManager_1.write(data); }, function () { return startMenu_1(); });
                            break;
                        default:
                            startMenu_1();
                    }
                }
            };
            lineManager_1.ask("\n                Select something\n                    1) ".concat(operations[0], "\n                    2) ").concat(operations[1], "\n                    3) ").concat(operations[2], "\n                    4) ").concat(operations[3], "\n                    5) ").concat(operations[4], "\n            "), fsMenubarHandler);
        }); };
        startMenu_1();
    }
    catch (err) {
        (0, stoper_1.default)("Uncknown error", 2);
    }
}
start();
