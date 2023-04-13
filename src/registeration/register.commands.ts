import * as vscode from "vscode";
import { InstallCheck, createNewTask } from "../utils/utilities";
import { OpenUrlTreeItem } from "../views/tree.views/OpenUrlTreeItem";

export const registerCommands = (context: vscode.ExtensionContext) => {
  const helloWorldCommand = vscode.commands.registerCommand(
    "metacall.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from metacall! Let's deploy...🚀"
      );
    }
  );

  const checkInstallCommand = vscode.commands.registerCommand(
    "metacall.checkInstall",
    async () => {
      try {
        InstallCheck.checkInstall();
      } catch (error) {
        console.log(error);
      }
    }
  );

  const helpCommand = vscode.commands.registerCommand(
    "metacall.help",
    async () => {
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
    }
  );

  const deployCommand = vscode.commands.registerCommand(
    "metacall.createDeploy",
    async () => {
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
    }
  );

  const logoutCommand = vscode.commands.registerCommand(
    "metacall.logout",
    async () => {
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
    }
  );

  const installMetacallCLICommand = vscode.commands.registerCommand(
    "metacall.installCLI",
    async () => {
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
    }
  );

  const openUrlCommand = vscode.commands.registerCommand(
    "metacall.openUrl",
    async (item: OpenUrlTreeItem) => {
      await item.openUrl();
    }
  );

  context.subscriptions.push(
    helloWorldCommand,
    helpCommand,
    deployCommand,
    logoutCommand,
    installMetacallCLICommand,
    openUrlCommand
  );
};
