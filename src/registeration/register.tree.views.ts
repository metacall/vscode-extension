import * as vscode from "vscode";
import { HelpsTreeItem } from "../views/tree.views/Help.Feedback.Item";
import { AzExtTreeDataProvider } from "@microsoft/vscode-azext-utils";
import { HomeTreeItem } from "../views/tree.views/home.tree.item";

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

  const homeRoot = new HomeTreeItem(undefined);
  const homeTreeDataProvider = new AzExtTreeDataProvider(
    homeRoot,
    "metacall.deployWithRepoUrl"
  );

  const homeTreeView = vscode.window.createTreeView("metacall.homeView", {
    treeDataProvider: homeTreeDataProvider,
    canSelectMany: false,
  });

  context.subscriptions.push(helpTreeView, homeTreeView);
};
