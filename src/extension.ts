import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let NEXT_TERM_ID = 1;
  let createDeployButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  createDeployButton.command = 'metacall.createDeploy';
  createDeployButton.text = 'Deploy as Faas';
  createDeployButton.show();
  context.subscriptions.push(createDeployButton);

  console.log("Terminals: " + (<any>vscode.window).terminals.length);
  console.log('Congratulations, your extension "MetaCall" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("metacall.helloWorld", () => {
      vscode.window.showInformationMessage(
        "Hello World from metacall! Let's deploy...🚀"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('metacall.help', () => {
			if (ensureTerminalExists()) {
				selectTerminal().then((terminal) => {
					if (terminal) {
            terminal.sendText("metacall-deploy --help");
            terminal.show();
					}
				});
			}
      else {
        const terminal = vscode.window.createTerminal(
          `MetaCall #${NEXT_TERM_ID++}`
        );
        terminal.sendText("metacall-deploy --help");
        terminal.show();
      }
		})
  );

  context.subscriptions.push(
		vscode.commands.registerCommand('metacall.createDeploy', () => {
			if (ensureTerminalExists()) {
				selectTerminal().then((terminal) => {
					if (terminal) {
						terminal.sendText("metacall-deploy");
            terminal.show();
					}
				});
			}
      else {
        const terminal = vscode.window.createTerminal(
          `MetaCall #${NEXT_TERM_ID++}`
        );
        terminal.sendText("metacall-deploy");
        terminal.show();
      }
		})
	);
}

function selectTerminal(): Thenable<vscode.Terminal | undefined> {
	interface TerminalQuickPickItem extends vscode.QuickPickItem {
		terminal: vscode.Terminal;
	}
	const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
	const items: TerminalQuickPickItem[] = terminals.map((t) => {
		return {
			label: `name: ${t.name}`,
			terminal: t,
		};
	});
	return vscode.window.showQuickPick(items).then((item) => {
		return item ? item.terminal : undefined;
	});
}

function ensureTerminalExists(): boolean {
	if ((<any>vscode.window).terminals.length === 0) {
		return false;
	}
	return true;
}

export function deactivate() {}
