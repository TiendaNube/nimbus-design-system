// UseClientInjectionPlugin.ts
import { Compiler } from "webpack";
import { RawSource } from "webpack-sources";

class UseClientInjectionPlugin {
  apply(compiler: Compiler) {
    // Use the 'emit' hook (works in both Webpack 4 and 5; Webpack 5 offers processAssets too)
    compiler.hooks.emit.tapAsync(
      "UseClientInjectionPlugin",
      (compilation, callback) => {
        Object.keys(compilation.assets).forEach((assetName) => {
          if (assetName.endsWith(".js")) {
            const asset = compilation.assets[assetName];
            let source = asset.source().toString();

            // If the file doesn't already start with "use client", inject it.
            if (
              !source.startsWith(`"use client";`) &&
              !source.startsWith(`'use client';`)
            ) {
              source = `"use client";\n${source}`;
              // Use RawSource to create a proper asset source.
              compilation.assets[assetName] = new RawSource(source) as any;
              console.log(`Injected "use client" in: ${assetName}`);
            }
          }
        });
        callback();
      }
    );
  }
}

export { UseClientInjectionPlugin };
