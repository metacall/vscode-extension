import * as vscode from "vscode";
// import metacallIcon from "./assets/metacall-icon.png";

export class LandingPageViewProvider {
  private _panel: vscode.WebviewPanel;
  private _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Initialize the view
    this._panel.webview.html = this._getHtmlContent();
  }

  private _getHtmlContent(): string {
    const imageUrl = this._extensionUri.with({
      path: this._extensionUri.path + "/icons/metacall-128px.png",
    });

    // Can be edited as per the final version
    console.log(imageUrl);
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metacall Home</title>
    </head>

    <body>
    <h1>Welcome to Metacall</h1>
    <p>A Visual Studio Extension for deploying MetaCall projects.
    MetaCall is on VS Code Extension Marketplace. Just search "MetaCall" on VS Code EXTENSIONS sidebar .
    Select the Install button, and VS Code will download and install the extension from the Marketplace. When the installation is complete, the Install button will be replaced with a Manage gear button.</p>

    <h2>Features</h2>
    <p>MetaCall Visual Studio Extension provides one click deployment so you don't even need to use the command line for deploying MetaCall projects.
    This makes working with project alot convenient as Visual Studio is quite Famous among developers.</p>

    <h2>Requirements</h2>
    <ul>
      <li>installation of metacall deploy</li>
      <li>installation of latest vscode version</li>
      <li>Active plan for Metacall Deploy</li>
    </ul>

    <h2>Extension Settings</h2>
    <p>Include if your extension adds any VS Code settings through the <code>contributes.configuration</code> extension point.</p>
    <p>For example:</p>
    <p>This extension contributes the following settings:</p>
    <ul>
      <li><code>metacall.deploy</code>: Create Deploy</li>
      <li><code>metacall.logout</code>: Logout from metacall account</li>
      <li><code>metacall.help</code>: metacall deploy help</li>
    </ul>
    
    <br>
    <p>For more information about Metacall, please visit <a href="https://metacall.io">https://metacall.io</a></p>

    </body>
    </html>
    `;
  }

  // Clean up resources
  public dispose(): void {
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
