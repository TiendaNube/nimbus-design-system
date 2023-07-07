import fs from "fs";
import path from "path";
import { dotCase } from "change-case";
import { JSXOpeningElement } from "@babel/types";
import * as vscode from "vscode";
import * as babelParser from "@babel/parser";
import * as babelTraverse from "@babel/traverse";

import { Document, DocumentProps } from "./types";

export class HoverProvider implements vscode.HoverProvider {
  private hovered = {
    tag: "",
    prop: "",
  };

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ) {
    const text = document.getText();
    const wordRange = document.getWordRangeAtPosition(position);
    const currentWord = wordRange ? document.getText(wordRange) : "";
    this.getHoveredElement(document, position, text, currentWord);
    const documentation = HoverProvider.getDocumentationFile(this.hovered.tag);

    if (this.isNimbusComponent(text) && documentation) {
      if (this.hovered.prop) {
        const prop = documentation.props.find(
          (docprop) => docprop.title === this.hovered.prop
        );
        if (prop) {
          const md = HoverProvider.generateDocProps(
            prop,
            documentation.docLink
          );
          return new vscode.Hover(md, new vscode.Range(position, position));
        }
        if (this.hovered.tag) {
          const md = HoverProvider.generateDocTag(documentation);
          return new vscode.Hover(md, new vscode.Range(position, position));
        }
      }
    }

    return {
      contents: [],
    };
  }

  static generateDocProps(
    prop: DocumentProps,
    docLink: string
  ): vscode.MarkdownString {
    const content = new vscode.MarkdownString(
      `<h3>${prop.title} ${
        prop.required ? '<span style="color:#FF0000;">*</span>' : ""
      }</h3>`
    );
    HoverProvider.generateDocProp(content, prop);
    content.appendMarkdown(`<p>${HoverProvider.getLinkDoc(docLink)}</p>`);
    content.supportHtml = true;
    content.isTrusted = true;
    return content;
  }

  static generateDocTag(document: Document): vscode.MarkdownString {
    const content = new vscode.MarkdownString(`<h1>${document.name}</h1>`);
    content.appendMarkdown(
      `<p>${HoverProvider.getLinkDoc(document.docLink)}</p>`
    );
    document.props.forEach((prop) => {
      content.appendMarkdown(`<hr />`);
      content.appendMarkdown(
        `<h3>${prop.title} ${
          prop.required ? '<span style="color:#FF0000;">*</span>' : ""
        }</h3>`
      );
      HoverProvider.generateDocProp(content, prop);
    });

    content.supportHtml = true;
    content.isTrusted = true;
    return content;
  }

  static generateDocProp(content: vscode.MarkdownString, prop: DocumentProps) {
    content.appendMarkdown(`<p>${prop.description}</p>`);
    content.appendMarkdown(`<ul>`);
    HoverProvider.formatTypes(content, prop);
    content.appendMarkdown(`</ul>`);
  }

  private getHoveredElement(
    document: vscode.TextDocument,
    position: vscode.Position,
    text: string,
    currentWord: string
  ) {
    const hovered = { tag: "", prop: "" };
    const ast = babelParser.parse(text, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    babelTraverse.default(ast, {
      JSXOpeningElement(elementPath) {
        const { start, end }: JSXOpeningElement = elementPath.node;
        const tagRange = new vscode.Range(
          document.positionAt(start ?? 0),
          document.positionAt(end ?? 0)
        );
        if (tagRange.contains(position)) {
          const { name, object, property } = elementPath.node.name as {
            name?: string;
            object?: { name: string };
            property?: { name: string };
          };
          hovered.tag = name ?? `${object?.name ?? ""}.${property?.name ?? ""}`;
        }
      },
      JSXAttribute(elementPath) {
        if (currentWord === elementPath.node.name.name) {
          hovered.prop = currentWord;
        }
        const { name, value } = elementPath.node;
        if (value?.start && value?.end) {
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

    this.hovered = hovered;
  }

  static formatTypes(
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

  private isNimbusComponent(text: string): boolean {
    const { tag } = this.hovered;
    const tagName = tag.split(".")?.[0] ?? tag;

    const ast = babelParser.parse(text, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    const importComponent = {
      tag: this.hovered.tag,
      isNimbusComponent: false,
    };

    babelTraverse.default(ast, {
      ImportDeclaration(declarationPath) {
        const importDeclaration = declarationPath.node;
        const importSource = importDeclaration.source.value;
        if (importSource.startsWith("@nimbus-ds/")) {
          const importedSpecifiers = importDeclaration.specifiers;
          importedSpecifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.local.name === tagName
            ) {
              const importedComponentName = (
                specifier.imported as { name: string }
              ).name;
              if (tag.indexOf(".") === -1) {
                importComponent.tag = importedComponentName;
              }
              importComponent.isNimbusComponent = true;
            }
          });
        }
      },
    });
    this.hovered.tag = importComponent.tag;
    return importComponent.isNimbusComponent;
  }

  static getLinkDoc(link: string): string {
    return `You can see the complete documentation by clicking <a href="${link}">here</a>.`;
  }

  static getDocumentationFile(tag: string): Document | null {
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
