import * as vscode from "vscode";


export class OpenUrlTreeItem extends vscode.TreeItem {
  private _url: string;

  public constructor(
    label: string,
    url: string,
    iconPath?: vscode.ThemeIcon | { dark: vscode.Uri; light: vscode.Uri }
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.command = {
      command: "metacall.openUrl",
      title: "Open URL",
      arguments: [this],
    };
    this.contextValue = "openUrl";
    this.iconPath = iconPath;
    this._url = url;
  }

  public async openUrl(): Promise<void> {
    vscode.env.openExternal(vscode.Uri.parse(this._url));
  }
}
