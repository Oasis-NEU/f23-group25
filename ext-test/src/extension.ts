import * as vscode from "vscode";
import db from "./database";
import fs from 'fs';
import path from "path";
import { title } from "process";


function writeToFile(question: {id: number;
								title: string;
								question: string;
    							example: string;
    							starterCode: string;}) {
	
	const directoryName: string = 'test_cases/' + question.title;
	const textName: string = question.title + '.txt';
	const codeName: string = question.title + '.py';

	const dirPath: string = path.join(__dirname, directoryName);
	fs.mkdir(dirPath, { recursive: true }, (err: Error | null) => {
		if (err) {
			console.error('Error creating the directory:', err);
		}
	});

	const textPath: string = path.join(dirPath, textName);
	const textContent: string = question.question + "\n\n" + question.example;
	fs.writeFile(textPath, textContent, (err: Error | null) => {
		if (err) {
		  console.error('Error writing to the file:', err);
		}
	});

	const codePath: string = path.join(dirPath, codeName);
	fs.writeFile(codePath, question.starterCode, (err: Error | null) => {
		if (err) {
		  console.error('Error writing to the file:', err);
		}
	});

	const currentWorkspaceFolders = vscode.workspace.workspaceFolders || [];
  	const newWorkspaceFolders = [...currentWorkspaceFolders, { uri: vscode.Uri.file(dirPath) }];
  	vscode.workspace.updateWorkspaceFolders(0, currentWorkspaceFolders.length, ...newWorkspaceFolders);
}

function displayLeetCodeQuestions() {

	const filePath1 = 'f23-group25/ext-test/src/question.txt';
	const filePath2 = 'f23-group25/ext-test/src/testCode.py';
	const leetCodeQuestions = fs.readFileSync(filePath1, 'utf-8');
	const pyCode = fs.readFileSync(filePath2, 'utf-8');

	vscode.window.showInformationMessage('Here are sum questions!');
	vscode.workspace.openTextDocument({ content: leetCodeQuestions }).then((doc) => {
		vscode.window.showTextDocument(doc, vscode.ViewColumn.One, true);
	});
	vscode.workspace.openTextDocument({ language : 'python', content: pyCode }).then((doc) => {
		vscode.window.showTextDocument(doc, vscode.ViewColumn.Two, true);
	});
	
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
	let disposable = vscode.commands.registerCommand("ext-test.loadQuestion", () => {
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

	let display = vscode.commands.registerCommand('ext-test.displayLeetCodeQuestions', displayLeetCodeQuestions);

	context.subscriptions.push(disposable);
	context.subscriptions.push(display);
}

// This method is called when your extension is deactivated
export function deactivate() {}
