import path = require("path");
import * as vscode from "vscode";
import { extVars } from "../statics/extension.variables";
import { OpenUrlTreeItem } from "../tree.views/OpenUrlTreeItem";

export function getIconPath(iconName: string): string {
  return path.join(getResourcesPath(), iconName);
}

function getResourcesPath(): string {
  return extVars.context.asAbsolutePath("icons");
}

const createNewTask = (
  type: string,
  name: string,
  source: string,
  command: string
): vscode.Task => {
  return new vscode.Task(
    { type: type },
    vscode.TaskScope.Workspace,
    name,
    source,
    new vscode.ShellExecution(command)
  );
};

export const registerCommands = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.helloWorld", () => {
      vscode.window.showInformationMessage(
        "Hello World from metacall! Let's deploy...🚀"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.help", async () => {
      const helpTask: vscode.Task = createNewTask(
        "shell.Help",
        "Help Terminal",
        "metacall.help",
        "metacall-deploy --help"
      );

      try {
        await vscode.tasks.executeTask(helpTask);
      } catch (error) {
        console.log(error);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.createDeploy", async () => {
      const deployTask: vscode.Task = createNewTask(
        "shell.Deploy",
        "Deploy Terminal",
        "metacall.createDeploy",
        "metacall-deploy"
      );

      try {
        await vscode.tasks.executeTask(deployTask);
      } catch (error) {
        console.log(error);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.logout", async () => {
      const logoutTask: vscode.Task = createNewTask(
        "shell.Logout",
        "Logout Terminal",
        "metacall.logout",
        "metacall-deploy --logout"
      );

      try {
        await vscode.tasks.executeTask(logoutTask);
      } catch (error) {
        console.log(error);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.installCLI", async () => {
      const installMetacallCLITask: vscode.Task = createNewTask(
        "shell.InstallCLI",
        "Install Metacall CLI Terminal",
        "metacall.installCLI",
        "npm i -g @metacall/deploy"
      );

      try {
        await vscode.tasks.executeTask(installMetacallCLITask);
      } catch (error) {
        console.log(error);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "metacall.openUrl",
      async (item: OpenUrlTreeItem) => {
        await item.openUrl();
      }
    )
  );
};
