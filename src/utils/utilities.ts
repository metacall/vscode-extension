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
