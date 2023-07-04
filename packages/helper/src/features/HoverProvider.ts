import fs from "fs";
import path from "path";
import { dotCase } from "change-case";
import { JSXOpeningElement } from "@babel/types";
import * as vscode from "vscode";
import * as babelParser from "@babel/parser";
import * as babelTraverse from "@babel/traverse";

import { Document, DocumentProps } from "./types";

export class HoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ) {
    const text = document.getText();
    const wordRange = document.getWordRangeAtPosition(position);
    const currentWord = wordRange ? document.getText(wordRange) : "";
    const hovered = this.getHoveredElement(
      document,
      position,
      text,
      currentWord
    );

    if (hovered.prop) {
      const documentation = this.getDocumentationFile(hovered.tag);
      if (documentation) {
        const prop = documentation.props.find(
          (docprop) => docprop.title === hovered.prop
        );
        if (prop) {
          const md = this.generateDocProps(prop, documentation.docLink);
          return new vscode.Hover(md, new vscode.Range(position, position));
        }
      }
    }

    if (hovered.tag) {
      const documentation = this.getDocumentationFile(hovered.tag);
      if (documentation) {
        const md = this.generateDocTag(documentation);
        return new vscode.Hover(md, new vscode.Range(position, position));
      }
    }

    return {
      contents: [],
    };
  }

  private generateDocProps(
    prop: DocumentProps,
    docLink: string
  ): vscode.MarkdownString {
    const content = new vscode.MarkdownString(
      `<h3>${prop.title} ${
        prop.required ? '<span style="color:#FF0000;">*</span>' : ""
      }</h3>`
    );
    this.generateDocProp(content, prop);
    content.appendMarkdown(`<p>${this.getLinkDoc(docLink)}</p>`);
    content.supportHtml = true;
    content.isTrusted = true;
    return content;
  }

  private generateDocTag(document: Document): vscode.MarkdownString {
    const content = new vscode.MarkdownString(`<h1>${document.name}</h1>`);
    content.appendMarkdown(`<p>${this.getLinkDoc(document.docLink)}</p>`);
    document.props.forEach((prop) => {
      content.appendMarkdown(`<hr />`);
      content.appendMarkdown(
        `<h3>${prop.title} ${
          prop.required ? '<span style="color:#FF0000;">*</span>' : ""
        }</h3>`
      );
      this.generateDocProp(content, prop);
    });

    content.supportHtml = true;
    content.isTrusted = true;
    return content;
  }

  private generateDocProp(content: vscode.MarkdownString, prop: DocumentProps) {
    content.appendMarkdown(`<p>${prop.description}</p>`);
    content.appendMarkdown(`<ul>`);
    this.formatTypes(content, prop);
    content.appendMarkdown(`</ul>`);
  }

  private getHoveredElement(
    document: vscode.TextDocument,
    position: vscode.Position,
    text: string,
    currentWord: string
  ): {
    tag: string;
    prop: string;
  } {
    const hovered = { tag: "", prop: "" };
    const ast = babelParser.parse(text, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    babelTraverse.default(ast, {
      JSXOpeningElement(elementPath) {
        const { start, end }: JSXOpeningElement = elementPath.node;
        const tagRange = new vscode.Range(
          document.positionAt(start || 0),
          document.positionAt(end || 0)
        );
        if (tagRange.contains(position)) {
          const { name, object, property } = elementPath.node.name as {
            name?: string;
            object?: { name: string };
            property?: { name: string };
          };
          hovered.tag = name || `${object?.name || ""}.${property?.name || ""}`;
        }
      },
      JSXAttribute(elementPath) {
        if (currentWord === elementPath.node.name.name) {
          hovered.prop = currentWord;
        }
        const { name, value } = elementPath.node;
        if (value && value.start && value.end) {
          const propValueRange = new vscode.Range(
            document.positionAt(value.start),
            document.positionAt(value.end)
          );
          if (propValueRange.contains(position)) {
            hovered.prop = name.name as string;
          }
        }
      },
    });

    return hovered;
  }

  private formatTypes(
    content: vscode.MarkdownString,
    documentProp: DocumentProps
  ) {
    const li = `<li><code>{{type}}</code></li>`;
    switch (true) {
      case !!documentProp?.anyOf?.length:
        documentProp.anyOf
          ?.filter((prop) => prop.type !== "object")
          .forEach((anyType) => {
            anyType.enum?.forEach((en) => {
              content.appendMarkdown(li.replace("{{type}}", en));
            });
            if (!anyType.enum?.length) {
              content.appendMarkdown(li.replace("{{type}}", anyType.type));
            }
          });
        break;
      case !!documentProp.enum?.length:
        documentProp.enum?.forEach((en) => {
          content.appendMarkdown(li.replace("{{type}}", en));
        });
        break;
      case Array.isArray(documentProp.type):
        (documentProp.type as string[])?.forEach((type) => {
          content.appendMarkdown(li.replace("{{type}}", type));
        });
        break;
      default:
        content.appendMarkdown(
          li.replace("{{type}}", documentProp.type as string)
        );
        break;
    }
  }

  private getLinkDoc(link: string): string {
    return `You can see the complete documentation by clicking <a href="${link}">here</a>.`;
  }

  private getDocumentationFile(tag: string): Document | null {
    const tagName = dotCase(tag);
    try {
      const content = fs.readFileSync(
        path.join(__dirname, `./elements/${tagName}.docs.json`),
        "utf8"
      );
      return content && JSON.parse(content);
    } catch (error) {
      console.log(`Documentation file "${tagName}.docs.json" not found`);
      return null;
    }
  }
}
