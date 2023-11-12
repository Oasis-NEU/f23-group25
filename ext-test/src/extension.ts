import * as vscode from "vscode";
import db from "./database";
import { title } from "process";

const fs = require('fs');
const path = require('path');

function writeToFile(question: {id: number;
								title: string;
								question: string;
    							example: string;
    							starterCode: string;}) {
	
	const directoryName = question.title;
	const textName = directoryName + '.txt';
	const codeName = directoryName + '.py';  

	fs.mkdir(directoryName, (err) =>{
		if (err) {
			console.error('Error creating the directory:', err);
		}
	});
	const dirPath = path.join(__dirname, directoryName);

	const textPath = path.join(dirPath, textName);
	const textContent = question.question + "\n\n" + question.example;
	fs.writeFile(textPath, textContent);

	const codePath = path.join(dirPath, codeName);
	fs.writeFile(codePath, question.starterCode);

	const currentWorkspaceFolders = vscode.workspace.workspaceFolders || [];
  	const newWorkspaceFolders = [...currentWorkspaceFolders, { uri: vscode.Uri.file(directoryName) }];
  	vscode.workspace.updateWorkspaceFolders(0, currentWorkspaceFolders.length, ...newWorkspaceFolders);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
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
					const question = db.questions.find((q) => q.id === Number(value));
					if (question) {
						writeToFile(question);
					} else {
						vscode.window.showErrorMessage("Question not found");
					}
				}
			});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
