import * as vscode from "vscode";
import { LandingPageViewProvider } from "./views/webviews/views/landingPage.view.provider";
import { extVars } from "./statics/extension.variables";
import { registerTrees } from "./registeration/register.tree.views";
import { registerWebViews } from "./registeration/register.web.views";
import { registerCommands } from "./registeration/register.commands";


export async function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Hello World from metacall!");

  // assigning context to extension variables
  extVars.context = context;

  // registering all commands
  registerCommands(context);

  // registering all trees
  registerTrees(context);

  // registering all web views
  registerWebViews(context);

  
}

export function deactivate() {
  // Close all terminals when extension is deactivated
  for (const terminal of vscode.window.terminals) {
    terminal.dispose();
  }
}
