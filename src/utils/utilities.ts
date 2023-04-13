import path = require("path");
import { extVars } from "../statics/extension.variables";
import * as vscode from "vscode";
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

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export async function chooseInput(placeHolder: string, ...choices: string[]) {
  let i = 0;
  const result = await vscode.window.showQuickPick(choices, {
    placeHolder: placeHolder,
  });
  return result;
}
