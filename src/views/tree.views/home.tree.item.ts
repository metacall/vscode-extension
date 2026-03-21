import * as vscode from "vscode";
import { l10n } from "vscode";
import { getIconPath } from "../../utils/utilities";

export class HomeTreeItem extends vscode.TreeItem {
  public label: string = "Home";
  public contextValue: string = "home";

  constructor() {
    super("Home", vscode.TreeItemCollapsibleState.Expanded);
    this.contextValue = "home";
  }

  private values?: vscode.TreeItem[];

  public async getChildren(): Promise<vscode.TreeItem[]> {
    return (
      this.values ??
      (this.values = [
        this.deployWithRepoUrlTreeItem,
        this.inspectTreeItem,
        this.deleteDeploymentTreeItem,
      ])
    );
  }

  private get deployWithRepoUrlTreeItem(): vscode.TreeItem {
    const node = new vscode.TreeItem(
      l10n.t("Deploy with Repository URL"),
      vscode.TreeItemCollapsibleState.None
    );
    node.contextValue = "Deploy with Repository URL";
    node.command = {
      command: "metacall.deployWithRepoUrl",
      title: l10n.t("Deploy with Repository URL"),
      arguments: [node],
    };
    node.iconPath = {
      dark: vscode.Uri.file(getIconPath("dark/link.svg")),
      light: vscode.Uri.file(getIconPath("light/link.svg")),
    };
    node.id = "0";

    return node;
  }

  private get inspectTreeItem(): vscode.TreeItem {
    const node = new vscode.TreeItem(
      l10n.t("Inspect Deployed Applications"),
      vscode.TreeItemCollapsibleState.None
    );
    node.contextValue = "Inspect";
    node.command = {
      command: "metacall.inspect",
      title: l10n.t("Inspect Deployed Applications"),
      arguments: [node],
    };
    node.iconPath = {
      dark: vscode.Uri.file(getIconPath("dark/inspect.svg")),
      light: vscode.Uri.file(getIconPath("light/inspect.svg")),
    };
    node.id = "1";
    return node;
  }

  private get deleteDeploymentTreeItem(): vscode.TreeItem {
    const node = new vscode.TreeItem(
      l10n.t("Delete Deployed Applications"),
      vscode.TreeItemCollapsibleState.None
    );
    node.contextValue = "Delete";
    node.command = {
      command: "metacall.deleteDeployment",
      title: l10n.t("Delete Deployed Applications"),
      arguments: [node],
    };
    node.iconPath = {
      dark: vscode.Uri.file(getIconPath("dark/trash.svg")),
      light: vscode.Uri.file(getIconPath("light/trash.svg")),
    };
    node.id = "2";
    return node;
  }
}
