module.exports = (variables, { tpl }) => {
  const name = `${variables.componentName.replace("Svg", "")}Icon`;
  const exp = [
    {
      type: "ExportDefaultDeclaration",
      declaration: { type: "Identifier", name },
    },
  ];

  const componentName = `${name}: React.FC<IconProps>`;

  return tpl`
        import React from "react";
        import { IconProps } from "../src/index.types";
        import { sizes } from "../src/index.definitions";

        ${variables.interfaces};
        
        export const ${componentName} = ({ size="small", ...props }) => (
          ${variables.jsx}
        );
        
        ${name}.displayName = "${name}";
        
  `;
};
