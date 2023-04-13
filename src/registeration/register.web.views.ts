import * as vscode from "vscode";
import { DeploymentsViewProvider } from "../views/webviews/views/deployments.view.provider";
import { LandingPageViewProvider } from "../views/webviews/views/landingPage.view.provider";

export const registerWebViews = (context: vscode.ExtensionContext) => {
  const deploymentsViewProvider = new DeploymentsViewProvider(
    context.extensionUri
  );

  const deploymentsViewRegistration = vscode.window.registerWebviewViewProvider(
    DeploymentsViewProvider.viewType,
    deploymentsViewProvider
  );

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

  context.subscriptions.push(deploymentsViewRegistration);
};
