import {
  CLI_URL,
  TUTORIAL_URL,
  REPO_URL,
  REPORT_ISSUE_URL,
  WEBSITE_URL,
} from "../../statics/urls";
import {
  AzExtParentTreeItem,
  AzExtTreeItem,
  GenericTreeItem,
} from "@microsoft/vscode-azext-utils";
import { l10n, Uri } from "vscode";
import { getIconPath } from "../../utils/utilities";
import { OpenUrlTreeItem } from "./OpenUrlTreeItem";

export class HelpsTreeItem extends AzExtParentTreeItem {
  public label: string = "Help and Feedback";
  public contextValue: string = "help";

  private values?: GenericTreeItem[];

  public async loadMoreChildrenImpl(): Promise<AzExtTreeItem[]> {
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

  public hasMoreChildrenImpl(): boolean {
    return false;
  }

  public compareChildrenImpl(
    item1: AzExtTreeItem,
    item2: AzExtTreeItem
  ): number {
    if (!item1 || !item1.id) {
      return -1;
    }
    if (!item2 || !item2.id) {
      return 1;
    }
    return item1?.id.localeCompare(item2?.id);
  }

  private get installMetacallCLITreeItem(): AzExtTreeItem {
    const node = new GenericTreeItem(this, {
      label: l10n.t("Install Metacall Deploy CLI"),
      contextValue: "Install Metacall Deploy CLI",
      commandId: "metacall.installCLI",
      iconPath: getIconPath("metacall.png"),
      includeInTreeItemPicker: true,
    });

    node.id = "0";

    return node;
  }

  private get watchVideosTreeItem(): AzExtTreeItem {
    const node = new OpenUrlTreeItem(
      this,
      l10n.t("Watch Metacall Faas Tutorial"),
      TUTORIAL_URL,
      {
        dark: Uri.file(getIconPath("/dark/play-circle.svg")),
        light: Uri.file(getIconPath("/light/play-circle.svg")),
      }
    );

    node.id = "1";

    return node;
  }

  private get readDocumentationTreeItem(): AzExtTreeItem {
    const node = new OpenUrlTreeItem(
      this,
      l10n.t("Read Metacall CLI Documentation"),
      CLI_URL,
      {
        dark: Uri.file(getIconPath("dark/book.svg")),
        light: Uri.file(getIconPath("light/book.svg")),
      }
    );

    node.id = "2";

    return node;
  }

  private get openWebsiteTreeItem(): AzExtTreeItem {
    const node = new OpenUrlTreeItem(
      this,
      l10n.t("Open Metacall Website"),
      WEBSITE_URL,
      {
        dark: Uri.file(getIconPath("dark/browser.svg")),
        light: Uri.file(getIconPath("light/browser.svg")),
      }
    );

    node.id = "3";

    return node;
  }

  private get cliHelpTreeItem(): AzExtTreeItem {
    const node = new GenericTreeItem(this, {
      label: l10n.t("Metacall CLI Help"),
      contextValue: "Metacall CLI Help",
      commandId: "metacall.help",
      iconPath: {
        dark: Uri.file(getIconPath("dark/question.svg")),
        light: Uri.file(getIconPath("light/question.svg")),
      },
      includeInTreeItemPicker: true,
    });

    node.id = "4";

    return node;
  }

  private get contributeTreeItem(): AzExtTreeItem {
    const node = new OpenUrlTreeItem(this, l10n.t("Contribute"), REPO_URL, {
      dark: Uri.file(getIconPath("dark/issues.svg")),
      light: Uri.file(getIconPath("light/issues.svg")),
    });

    node.id = "5";

    return node;
  }

  private get reportIssuesTreeItem(): AzExtTreeItem {
    const node = new OpenUrlTreeItem(
      this,
      l10n.t("Report Issue"),
      REPORT_ISSUE_URL,
      {
        dark: Uri.file(getIconPath("dark/comment.svg")),
        light: Uri.file(getIconPath("light/comment.svg")),
      }
    );
    node.id = "6";

    return node;
  }
}
