import { registerCommands } from "./utils/utilities";
import { DeploymentsViewProvider } from "./webviews/views/deployments.view.provider";
import { HomeViewProvider } from "./webviews/views/home.view.provider";
import * as vscode from "vscode";
export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Hello World from metacall!");

  // registering all commands
  registerCommands(context);

  const homeViewProvider = new HomeViewProvider(context.extensionUri);
  const deploymentsViewProvider = new DeploymentsViewProvider(
    context.extensionUri
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      HomeViewProvider.viewType,
      homeViewProvider
    )
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      DeploymentsViewProvider.viewType,
      deploymentsViewProvider
    )
  );
}

export function deactivate() {
  // Close all terminals when extension is deactivated
  for (const terminal of vscode.window.terminals) {
    terminal.dispose();
  }
}
