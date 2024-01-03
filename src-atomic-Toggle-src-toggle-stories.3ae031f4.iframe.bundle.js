"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[6873],{"./packages/react/src/atomic/Toggle/src/toggle.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,active:()=>active,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__,label:()=>label});const __WEBPACK_DEFAULT_EXPORT__={title:"Atomic/Toggle",component:__webpack_require__("./packages/react/src/atomic/Toggle/src/Toggle.tsx").Z,argTypes:{children:{control:{type:"text"}}},tags:["autodocs"]},basic={args:{}},active={args:{active:!0}},label={args:{label:"Label"}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...basic.parameters?.docs?.source}}},active.parameters={...active.parameters,docs:{...active.parameters?.docs,source:{originalSource:"{\n  args: {\n    active: true\n  }\n}",...active.parameters?.docs?.source}}},label.parameters={...label.parameters,docs:{...label.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "Label"\n  }\n}',...label.parameters?.docs?.source}}};const __namedExportsOrder=["basic","active","label"]},"./packages/react/src/atomic/Toggle/src/Toggle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Toggle});var nimbus_toggle_css_namespaceObject={};__webpack_require__.r(nimbus_toggle_css_namespaceObject),__webpack_require__.d(nimbus_toggle_css_namespaceObject,{container:()=>container,container__input:()=>container__input,container__slider:()=>container__slider});__webpack_require__("./node_modules/react/index.js");var Text=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),injectStylesIntoStyleTag=(__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/toggle/nimbus-toggle.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA61Uy27bMBC8+yuInKoDDTtF24T+gRz7BwFFLqVtKFLgw44QpN9ekKYdyXFQxc6Rs5zh7s4ul4/3987c7VbkZUGIRN9rPjCiNDxvFoRwjY2hGKDzjAgwAVyCdyhDy4jCQIU1AUxIaMN7RrbcfaPUYFdHT33PBZqGrqsU763HgNYw4kDzgFtIqIjOW8dIb/EgX1snwVHHJUZ/KtnyHujkBlVR62qzeF0sD9UwZUX0dIehRZNLq+1z4kq7OxGMAbWn+f5EY51pbznz2lsdQ87ZbsEpnaRalBJMxlKtYWBklU4tYNOGcijtWo3lb7N8idw66MasdTnP9eNP9AHVcDBjHDrf9NI/HwYNjHirUV7R+COxlPMxL18o41AgYXWyf8LJmKcGYnBcUx+d4gIesGl1atCezsVT42w0co7E2+1MDo6bo7FaT6mdTQHqewBJFfehIsA9TNxjNSjrIJt47PrNzebDkTnMwPLu148Tt8eYBpWR1c/vBflcnXmHuEg+V5c42nKtvqhDbdqSsntznR6l/5Do1VRyH7lc87cD70FO/wqCpo+BiRbEE0jyl0xX9P8P9Q477ob3vZ/l3Hn2rPzGQ3jVOuynbn2cunc2Xv7SLEe/RP6T5l5bWPmUZj93baVnPsHXfyultrO+BwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var container="_99rn8w0",container__input="_99rn8w1",container__slider="_99rn8w2";const toggle={classnames:{...nimbus_toggle_css_namespaceObject}};var Skeleton=__webpack_require__("./packages/react/src/atomic/Skeleton/src/Skeleton.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ToggleSkeleton=({width,"data-testid":dataTestId})=>(0,jsx_runtime.jsxs)("div",{className:toggle.classnames.container,children:[(0,jsx_runtime.jsx)(Skeleton.O,{width:"2rem",height:"1rem",borderRadius:"0.5rem","data-testid":"toggle-skeleton"}),(0,jsx_runtime.jsx)(Skeleton.O,{width:width??"2rem",height:"1rem",borderRadius:"0.25rem","data-testid":dataTestId})]});ToggleSkeleton.displayName="ToggleSkeleton";try{ToggleSkeleton.displayName="ToggleSkeleton",ToggleSkeleton.__docgenInfo={description:"",displayName:"ToggleSkeleton",props:{width:{defaultValue:null,description:"Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.",name:"width",required:!1,type:{name:"string"}},"data-testid":{defaultValue:null,description:"This is an attribute used to identify a DOM node for testing purposes.",name:"data-testid",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Toggle/src/components/ToggleSkeleton/ToggleSkeleton.tsx#ToggleSkeleton"]={docgenInfo:ToggleSkeleton.__docgenInfo,name:"ToggleSkeleton",path:"packages/react/src/atomic/Toggle/src/components/ToggleSkeleton/ToggleSkeleton.tsx#ToggleSkeleton"})}catch(__react_docgen_typescript_loader_error){}const Toggle=({className:_className,style:_style,label,id,name,active,...rest})=>(0,jsx_runtime.jsxs)("label",{htmlFor:id||name,className:toggle.classnames.container,children:[(0,jsx_runtime.jsx)("input",{...rest,id:id||name,name,type:"checkbox",className:toggle.classnames.container__input,defaultChecked:active}),(0,jsx_runtime.jsx)("span",{"data-testid":"slider",className:toggle.classnames.container__slider}),label&&(0,jsx_runtime.jsx)(Text.x,{"data-testid":"text",color:"neutral-textHigh",children:label})]});Toggle.displayName="Toggle",Toggle.displayName="Toggle",Toggle.Skeleton=ToggleSkeleton,Toggle.Skeleton.displayName="Toggle.Skeleton";try{Toggle.displayName="Toggle",Toggle.__docgenInfo={description:"",displayName:"Toggle",props:{name:{defaultValue:null,description:"The name of the input element.",name:"name",required:!1,type:{name:"string"}},active:{defaultValue:null,description:"Sets toggle state to activated or deactivated.",name:"active",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"Text to be rendered inside the component",name:"label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Toggle/src/Toggle.tsx#Toggle"]={docgenInfo:Toggle.__docgenInfo,name:"Toggle",path:"packages/react/src/atomic/Toggle/src/Toggle.tsx#Toggle"})}catch(__react_docgen_typescript_loader_error){}},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/toggle/nimbus-toggle.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA61Uy27bMBC8+yuInKoDDTtF24T+gRz7BwFFLqVtKFLgw44QpN9ekKYdyXFQxc6Rs5zh7s4ul4/3987c7VbkZUGIRN9rPjCiNDxvFoRwjY2hGKDzjAgwAVyCdyhDy4jCQIU1AUxIaMN7RrbcfaPUYFdHT33PBZqGrqsU763HgNYw4kDzgFtIqIjOW8dIb/EgX1snwVHHJUZ/KtnyHujkBlVR62qzeF0sD9UwZUX0dIehRZNLq+1z4kq7OxGMAbWn+f5EY51pbznz2lsdQ87ZbsEpnaRalBJMxlKtYWBklU4tYNOGcijtWo3lb7N8idw66MasdTnP9eNP9AHVcDBjHDrf9NI/HwYNjHirUV7R+COxlPMxL18o41AgYXWyf8LJmKcGYnBcUx+d4gIesGl1atCezsVT42w0co7E2+1MDo6bo7FaT6mdTQHqewBJFfehIsA9TNxjNSjrIJt47PrNzebDkTnMwPLu148Tt8eYBpWR1c/vBflcnXmHuEg+V5c42nKtvqhDbdqSsntznR6l/5Do1VRyH7lc87cD70FO/wqCpo+BiRbEE0jyl0xX9P8P9Q477ob3vZ/l3Hn2rPzGQ3jVOuynbn2cunc2Xv7SLEe/RP6T5l5bWPmUZj93baVnPsHXfyultrO+BwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'._99rn8w0 {\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  gap: var(--nimbus-spacing-1);\n  position: relative;\n  cursor: pointer;\n  border-radius: var(--nimbus-shape-border-radius-full);\n}\n._99rn8w0:focus-within {\n  box-shadow: var(--nimbus-utils-focus);\n}\n._99rn8w1 {\n  position: absolute;\n  overflow: hidden;\n  opacity: 0;\n  height: 0;\n  width: 0;\n}\n._99rn8w2 {\n  width: 2rem;\n  height: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  border-style: solid;\n  border-radius: var(--nimbus-shape-border-radius-full);\n  border-width: var(--nimbus-shape-border-width-1);\n  border-color: var(--nimbus-colors-neutral-surfaceHighlight);\n  background-color: var(--nimbus-colors-neutral-background);\n  transition: all var(--nimbus-motion-speed-fast) ease;\n}\n._99rn8w2:before {\n  content: "";\n  position: absolute;\n  width: 0.875rem;\n  height: 0.875rem;\n  left: 0.063rem;\n  background-color: var(--nimbus-colors-neutral-interactive);\n  border-radius: var(--nimbus-shape-border-radius-half);\n  transition: all var(--nimbus-motion-speed-fast) ease;\n}\n._99rn8w2:hover {\n  border-color: var(--nimbus-colors-neutral-interactiveHover);\n}\n._99rn8w2:active {\n  border-color: var(--nimbus-colors-neutral-interactivePressed);\n}\n._99rn8w0 input:checked ~ ._99rn8w2 {\n  border-color: var(--nimbus-colors-primary-interactive);\n  background-color: var(--nimbus-colors-primary-interactive);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:before {\n  background-color: var(--nimbus-colors-neutral-background);\n  left: 1.063rem;\n}\n._99rn8w2:hover:before {\n  background-color: var(--nimbus-colors-neutral-interactiveHover);\n}\n._99rn8w2:active:before {\n  background-color: var(--nimbus-colors-neutral-interactivePressed);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:hover:before {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:active:before {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}',"",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,4BAA4B;EAC5B,kBAAkB;EAClB,eAAe;EACf,qDAAqD;AACvD;AACA;EACE,qCAAqC;AACvC;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,UAAU;EACV,SAAS;EACT,QAAQ;AACV;AACA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,mBAAmB;EACnB,qDAAqD;EACrD,gDAAgD;EAChD,2DAA2D;EAC3D,yDAAyD;EACzD,oDAAoD;AACtD;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,gBAAgB;EAChB,cAAc;EACd,0DAA0D;EAC1D,qDAAqD;EACrD,oDAAoD;AACtD;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,6DAA6D;AAC/D;AACA;EACE,sDAAsD;EACtD,0DAA0D;AAC5D;AACA;EACE,yDAAyD;EACzD,cAAc;AAChB;AACA;EACE,+DAA+D;AACjE;AACA;EACE,iEAAiE;AACnE;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE",sourcesContent:['._99rn8w0 {\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  gap: var(--nimbus-spacing-1);\n  position: relative;\n  cursor: pointer;\n  border-radius: var(--nimbus-shape-border-radius-full);\n}\n._99rn8w0:focus-within {\n  box-shadow: var(--nimbus-utils-focus);\n}\n._99rn8w1 {\n  position: absolute;\n  overflow: hidden;\n  opacity: 0;\n  height: 0;\n  width: 0;\n}\n._99rn8w2 {\n  width: 2rem;\n  height: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  border-style: solid;\n  border-radius: var(--nimbus-shape-border-radius-full);\n  border-width: var(--nimbus-shape-border-width-1);\n  border-color: var(--nimbus-colors-neutral-surfaceHighlight);\n  background-color: var(--nimbus-colors-neutral-background);\n  transition: all var(--nimbus-motion-speed-fast) ease;\n}\n._99rn8w2:before {\n  content: "";\n  position: absolute;\n  width: 0.875rem;\n  height: 0.875rem;\n  left: 0.063rem;\n  background-color: var(--nimbus-colors-neutral-interactive);\n  border-radius: var(--nimbus-shape-border-radius-half);\n  transition: all var(--nimbus-motion-speed-fast) ease;\n}\n._99rn8w2:hover {\n  border-color: var(--nimbus-colors-neutral-interactiveHover);\n}\n._99rn8w2:active {\n  border-color: var(--nimbus-colors-neutral-interactivePressed);\n}\n._99rn8w0 input:checked ~ ._99rn8w2 {\n  border-color: var(--nimbus-colors-primary-interactive);\n  background-color: var(--nimbus-colors-primary-interactive);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:before {\n  background-color: var(--nimbus-colors-neutral-background);\n  left: 1.063rem;\n}\n._99rn8w2:hover:before {\n  background-color: var(--nimbus-colors-neutral-interactiveHover);\n}\n._99rn8w2:active:before {\n  background-color: var(--nimbus-colors-neutral-interactivePressed);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:hover:before {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n._99rn8w0 input:checked ~ ._99rn8w2:active:before {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}'],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);