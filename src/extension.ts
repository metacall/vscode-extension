import * as vscode from "vscode";
import { createNewTask } from "./utilities";
export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Hello World from metacall!");

  let createDeployButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  createDeployButton.command = "metacall.createDeploy";
  createDeployButton.text = "Deploy as Faas";
  createDeployButton.show();
  context.subscriptions.push(createDeployButton);

  console.log("Terminals: " + (<any>vscode.window).terminals.length);
  console.log('Congratulations, your extension "MetaCall" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.helloWorld", () => {
      vscode.window.showInformationMessage(
        "Hello World from metacall! Let's deploy...🚀"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.help", () => {
      const helpTask: vscode.Task = createNewTask(
        "shell.Help",
        "Help Terminal",
        "metacall.help",
        "metacall-deploy --help"
      );

      try {
        vscode.tasks.executeTask(helpTask);
      } catch (error) {
        console.log(error);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.createDeploy", () => {
      const deployTask: vscode.Task = createNewTask(
        "shell.Deploy",
        "Deploy Terminal",
        "metacall.createDeploy",
        "metacall-deploy"
      );

      try {
        vscode.tasks.executeTask(deployTask);
      } catch (error) {
        console.log(error);
      }
    })
  );
}

export function deactivate() {
  // Close all terminals when extension is deactivated
  for (const terminal of vscode.window.terminals) {
    terminal.dispose();
  }
}
