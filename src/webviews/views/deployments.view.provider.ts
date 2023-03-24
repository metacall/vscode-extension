import * as vscode from "vscode";

export class DeploymentsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "metacall.deploymentsView";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;
    this._view.webview.options = {
      // for enabling scripts in the webview
      enableScripts: true,
      // for enabling loading resources
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      // an Event Listener for receiving messages from the extension and making action based on it.
      // will be used later for some actions
    });
  }
  private _getHtmlForWebview(webview: vscode.Webview): string {
    // empty body for now
    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Metacall Deployments</title>
			</head>
			<body>
      </body>
			</html>`;
  }
}
