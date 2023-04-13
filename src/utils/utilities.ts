import * as path from "path";
import { extVars } from "../statics/extension.variables";
import * as vscode from "vscode";
import * as child_process from 'child_process';
export function getIconPath(iconName: string): string {
  return path.join(getResourcesPath(), iconName);
}

function getResourcesPath(): string {
  return extVars.context.asAbsolutePath("icons");
}

export const createNewTask = (
  type: string,
  name: string,
  source: string,
  command: string
): vscode.Task => {
  return new vscode.Task(
    { type: type },
    vscode.TaskScope.Workspace,
    name,
    source,
    new vscode.ShellExecution(command)
  );
};

export class InstallCheck {
  public static async checkInstall(): Promise<boolean> {
    try {
      const version = child_process.execSync('metacall-deploy --version').toString().trim();
      if (/^\d+\.\d+\.\d+$/.test(version)) {
        vscode.window.showInformationMessage('Metacall is installed!');
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      vscode.window.showWarningMessage('Metacall is not installed', 'Install Metacall').then((selection) => {
        if (selection === 'Install Metacall') {
          vscode.commands.executeCommand('metacall.installCLI');
        }
      });
      return false;
    }
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export async function showInputBox(placeHolder: string) {
  const result = await vscode.window.showInputBox({
    value: "",
    placeHolder: placeHolder,
    validateInput: (text) => {
      if (!isValidUrl(text)) {
        return "Invalid URL";
      }
    },
  });
  return result;
}

export async function chooseInput(placeHolder: string, ...choices: string[]) {
  let i = 0;
  const result = await vscode.window.showQuickPick(choices, {
    placeHolder: placeHolder,
  });
  return result;
}
