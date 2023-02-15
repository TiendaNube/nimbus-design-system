module.exports = (variables, { tpl }) => {
  const componentName = `${variables.componentName}: React.FC<IconProps>`;

  return tpl`
        import React from "react";
        import { IconProps } from "../src/index.types";
        import { sizes } from "../src/index.definitions";

        ${variables.interfaces};
        
        const ${componentName} = ({ size="small", ...props }) => {
            return (
                ${variables.jsx}
            );
        }
        
        ${variables.exports};
  `;
};
