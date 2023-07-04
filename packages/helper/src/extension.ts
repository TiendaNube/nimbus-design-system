import * as vscode from "vscode";
import { Subscriptions, HoverProvider } from "./features";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This lin``e of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "@nimbus-ds/vscode-components" is now active!'
  );

  const subscriptions = new Subscriptions();
  const hoverProvider = new HoverProvider();

  const hover = vscode.languages.registerHoverProvider(
    subscriptions.documents,
    hoverProvider
  );

  subscriptions.setSubscriptions(hover);
  context.subscriptions.push(...subscriptions.getSubscriptions());
}
