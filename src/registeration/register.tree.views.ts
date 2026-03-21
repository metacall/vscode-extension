import * as vscode from "vscode";
import { HelpsTreeItem } from "../views/tree.views/Help.Feedback.Item";
import { NativeTreeDataProvider } from "../views/tree.views/NativeTreeDataProvider";
import { HomeTreeItem } from "../views/tree.views/home.tree.item";

export const registerTrees = (context: vscode.ExtensionContext) => {
  const helpRoot = new HelpsTreeItem();
  const helpTreeDataProvider = new NativeTreeDataProvider(helpRoot);

  const helpTreeView = vscode.window.createTreeView(
    "metacall.helpAndFeedbackView",
    { treeDataProvider: helpTreeDataProvider, canSelectMany: false }
  );

  const homeRoot = new HomeTreeItem();
  const homeTreeDataProvider = new NativeTreeDataProvider(homeRoot);

  const homeTreeView = vscode.window.createTreeView("metacall.homeView", {
    treeDataProvider: homeTreeDataProvider,
    canSelectMany: false,
  });

  context.subscriptions.push(helpTreeView, homeTreeView);
};
