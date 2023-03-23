import { registerCommands } from "./utils/utilities";
import { HomeViewProvider } from "./webviews/views/home.view.provider";
import * as vscode from "vscode";
export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Hello World from metacall!");

  // registering all commands
  registerCommands(context);

  const homeViewProvider = new HomeViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      HomeViewProvider.viewType,
      homeViewProvider
    )
  );
}

export function deactivate() {
  // Close all terminals when extension is deactivated
  for (const terminal of vscode.window.terminals) {
    terminal.dispose();
  }
}
