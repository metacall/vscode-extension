import { registerCommands } from "./utils/utilities";
import { DeploymentsViewProvider } from "./webviews/views/deployments.view.provider";
import { HomeViewProvider } from "./webviews/views/home.view.provider";
import * as vscode from "vscode";
import { LandingPageViewProvider } from "./webviews/views/landingPage.view.provider";

// interface MetacallState extends vscode.Memento {
//   isFirstRun?: boolean;
// }

export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Hello World from metacall!");

  // registering all commands
  registerCommands(context);

  // Check if this is the first time the extension is being run
  const extensionState = context.globalState.get("metacall.extensionState");

  // if first time, show the landing page with documenation and instructions
  if (!extensionState) {
    const panel = vscode.window.createWebviewPanel(
      "metacall.landingPage",
      "Welcome to Metacall",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    const landingPageViewProvider = new LandingPageViewProvider(
      panel,
      context.extensionUri
    );
    context.subscriptions.push(landingPageViewProvider);
    context.globalState.update("metacall.extensionState", true);
  }

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
