import * as vscode from "vscode";
import { HelpsTreeItem } from "../views/tree.views/Help.Feedback.Item";
import { AzExtTreeDataProvider } from "@microsoft/vscode-azext-utils";

export const registerTrees = (context: vscode.ExtensionContext) => {
  const helpRoot = new HelpsTreeItem(undefined);
  const helpTreeDataProvider = new AzExtTreeDataProvider(
    helpRoot,
    "metacall.helpView"
  );

  const helpTreeView = vscode.window.createTreeView(
    "metacall.helpAndFeedbackView",
    { treeDataProvider: helpTreeDataProvider, canSelectMany: false }
  );

  context.subscriptions.push(helpTreeView);
};
