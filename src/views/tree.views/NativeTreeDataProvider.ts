import * as vscode from 'vscode';

export interface INativeTreeItem extends vscode.TreeItem {
	getChildren?(): Promise<vscode.TreeItem[]>;
}

export class NativeTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null> = new vscode.EventEmitter<vscode.TreeItem | undefined | null>();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null> = this._onDidChangeTreeData.event;

	constructor(private readonly root: INativeTreeItem) {}

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: INativeTreeItem): Promise<vscode.TreeItem[]> {
		if (!element) {
			return this.root.getChildren ? this.root.getChildren() : [];
		}
		return element.getChildren ? element.getChildren() : [];
	}
}
