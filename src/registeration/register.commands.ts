import * as vscode from "vscode";
import { chooseInput, createNewTask, showInputBox } from "../utils/utilities";
import { OpenUrlTreeItem } from "../views/tree.views/OpenUrlTreeItem";
import { GenericTreeItem } from "@microsoft/vscode-azext-utils";

export const registerCommands = (context: vscode.ExtensionContext) => {
  const helloWorldCommand = vscode.commands.registerCommand(
    "metacall.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from metacall! Let's deploy...🚀"
      );
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

  const deployWithUrlCommand = vscode.commands.registerCommand(
    "metacall.deployWithRepoUrl",
    async (item: GenericTreeItem) => {
      const url: string | undefined = await showInputBox("Enter the Repo URL");

      if (url) {
        const deployWithUrlTask: vscode.Task = createNewTask(
          "shell.DeployWithUrl",
          "Deploy With Repo URL Terminal",
          "metacall.deployWithRepoUrl",
          `metacall-deploy --addrepo=${url}`
        );
        try {
          await vscode.tasks.executeTask(deployWithUrlTask);
        } catch (error) {
          console.log(error);
        }
      } else {
        vscode.window.showErrorMessage("Not valid URL");
      }
    }
  );

  const inspectCommand = vscode.commands.registerCommand(
    "metacall.inspect",
    async () => {
      const inspectFormat = await chooseInput(
        "Choose Format",
        "Table",
        "Raw",
        "OpenAPIv3"
      );
      if (inspectFormat) {
        const inspectTask: vscode.Task = createNewTask(
          "shell.Inspect",
          "Inspect Terminal",
          "metacall.inspect",
          `metacall-deploy --inspect=${inspectFormat}`
        );
        try {
          // table format hang the terminal
          // should make the name of the terminal dynamic with the formats
          await vscode.tasks.executeTask(inspectTask);
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    }
  );

  context.subscriptions.push(
    helloWorldCommand,
    helpCommand,
    deployCommand,
    logoutCommand,
    installMetacallCLICommand,
    openUrlCommand,
    deployWithUrlCommand,
    inspectCommand
  );
};
