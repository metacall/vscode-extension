import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Use a provided VS Code executable (via env vars) or download VS Code and run the integration test
		const vscodeExecutablePath =
			process.env.VSCODE_EXECUTABLE || process.env.VSCODE_EXECUTABLE_PATH;
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			...(vscodeExecutablePath ? { vscodeExecutablePath } : {})
		});
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
