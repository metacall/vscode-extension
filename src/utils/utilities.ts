import * as vscode from "vscode";

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
