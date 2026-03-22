import {
  CLI_URL,
  TUTORIAL_URL,
  REPO_URL,
  REPORT_ISSUE_URL,
  WEBSITE_URL,
} from "../../statics/urls";
import * as vscode from "vscode";
import { l10n } from "vscode";
import { getIconPath } from "../../utils/utilities";
import { OpenUrlTreeItem } from "./OpenUrlTreeItem";

export class HelpsTreeItem extends vscode.TreeItem {
  public label: string = "Help and Feedback";
  public contextValue: string = "help";

  constructor() {
    super("Help and Feedback", vscode.TreeItemCollapsibleState.Expanded);
    this.contextValue = "help";
  }

  private values?: vscode.TreeItem[];

  public async getChildren(): Promise<vscode.TreeItem[]> {
    return (
      this.values ??
      (this.values = [
        this.readDocumentationTreeItem,
        this.watchVideosTreeItem,
        this.contributeTreeItem,
        this.reportIssuesTreeItem,
        this.installMetacallCLITreeItem,
        this.openWebsiteTreeItem,
        this.cliHelpTreeItem,
      ])
    );
  }

  private get installMetacallCLITreeItem(): vscode.TreeItem {
    const node = new vscode.TreeItem(
      l10n.t("Install Metacall Deploy CLI"),
      vscode.TreeItemCollapsibleState.None
    );
    node.contextValue = "Install Metacall Deploy CLI";
    node.command = {
      command: "metacall.installCLI",
      title: l10n.t("Install Metacall Deploy CLI"),
    };
    node.iconPath = getIconPath("metacall.png");
    node.id = "0";

    return node;
  }

  private get watchVideosTreeItem(): vscode.TreeItem {
    const node = new OpenUrlTreeItem(
      l10n.t("Watch Metacall Faas Tutorial"),
      TUTORIAL_URL,
      {
        dark: vscode.Uri.file(getIconPath("/dark/play-circle.svg")),
        light: vscode.Uri.file(getIconPath("/light/play-circle.svg")),
      }
    );

    node.id = "1";

    return node;
  }

  private get readDocumentationTreeItem(): vscode.TreeItem {
    const node = new OpenUrlTreeItem(
      l10n.t("Read Metacall CLI Documentation"),
      CLI_URL,
      {
        dark: vscode.Uri.file(getIconPath("dark/book.svg")),
        light: vscode.Uri.file(getIconPath("light/book.svg")),
      }
    );

    node.id = "2";

    return node;
  }

  private get openWebsiteTreeItem(): vscode.TreeItem {
    const node = new OpenUrlTreeItem(
      l10n.t("Open Metacall Website"),
      WEBSITE_URL,
      {
        dark: vscode.Uri.file(getIconPath("dark/browser.svg")),
        light: vscode.Uri.file(getIconPath("light/browser.svg")),
      }
    );

    node.id = "3";

    return node;
  }

  private get cliHelpTreeItem(): vscode.TreeItem {
    const node = new vscode.TreeItem(
      l10n.t("Metacall CLI Help"),
      vscode.TreeItemCollapsibleState.None
    );
    node.contextValue = "Metacall CLI Help";
    node.command = {
      command: "metacall.help",
      title: l10n.t("Metacall CLI Help"),
    };
    node.iconPath = {
      dark: vscode.Uri.file(getIconPath("dark/question.svg")),
      light: vscode.Uri.file(getIconPath("light/question.svg")),
    };
    node.id = "4";

    return node;
  }

  private get contributeTreeItem(): vscode.TreeItem {
    const node = new OpenUrlTreeItem(l10n.t("Contribute"), REPO_URL, {
      dark: vscode.Uri.file(getIconPath("dark/issues.svg")),
      light: vscode.Uri.file(getIconPath("light/issues.svg")),

    });

    node.id = "5";

    return node;
  }

  private get reportIssuesTreeItem(): vscode.TreeItem {
    const node = new OpenUrlTreeItem(
      l10n.t("Report Issue"),
      REPORT_ISSUE_URL,
      {
        dark: vscode.Uri.file(getIconPath("dark/comment.svg")),
        light: vscode.Uri.file(getIconPath("light/comment.svg")),
      }
    );
    node.id = "6";

    return node;
  }
}
