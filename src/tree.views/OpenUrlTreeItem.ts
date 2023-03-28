import * as vscode from "vscode";

import {
  AzExtParentTreeItem,
  GenericTreeItem,
} from "@microsoft/vscode-azext-utils";

export class OpenUrlTreeItem extends GenericTreeItem {
  private _url: string;

  public constructor(
    parent: AzExtParentTreeItem,
    label: string,
    url: string,
    iconPath?: vscode.ThemeIcon
  ) {
    super(parent, {
      commandId: "metacall.openUrl",
      contextValue: "openUrl",
      iconPath: iconPath,
      includeInTreeItemPicker: true,
      label,
    });
    this._url = url;
  }

  public async openUrl(): Promise<void> {
    vscode.env.openExternal(vscode.Uri.parse(this._url));
  }
}
