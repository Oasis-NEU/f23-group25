"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const database_1 = __importDefault(require("./database"));
function displayLeetCodeQuestions() {
    const filePath1 = 'f23-group25/ext-test/src/question.txt';
    const filePath2 = 'f23-group25/ext-test/src/testCode.py';
    const leetCodeQuestions = fs.readFileSync(filePath1, 'utf-8');
    const pyCode = fs.readFileSync(filePath2, 'utf-8');
    vscode.window.showInformationMessage('Here are sum questions!');
    vscode.workspace.openTextDocument({ content: leetCodeQuestions }).then((doc) => {
        vscode.window.showTextDocument(doc, vscode.ViewColumn.One, true);
    });
    vscode.workspace.openTextDocument({ language: 'python', content: pyCode }).then((doc) => {
        vscode.window.showTextDocument(doc, vscode.ViewColumn.Two, true);
    });
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ext-test" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("ext-test.helloWorld", () => {
        vscode.window
            .showInputBox({
            prompt: "Enter the ID of the question you want to solve",
            placeHolder: "Question ID",
        })
            .then((value) => {
            if (value) {
                // Handle the input value here
                // You can use the value to fetch the corresponding question from the database
                const question = database_1.default.questions.find((q) => q.id === Number(value));
                if (question) {
                    vscode.window.showInformationMessage(question.title);
                }
                else {
                    vscode.window.showErrorMessage("Question not found");
                }
            }
        });
    });
    let display = vscode.commands.registerCommand('ext-test.displayLeetCodeQuestions', displayLeetCodeQuestions);
    context.subscriptions.push(disposable);
    context.subscriptions.push(display);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map