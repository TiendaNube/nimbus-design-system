"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[9134],{"./packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,bottom:()=>bottom,default:()=>tooltip_stories,left:()=>left,right:()=>right,top:()=>tooltip_stories_top});var nimbus_tooltip_css_namespaceObject={};__webpack_require__.r(nimbus_tooltip_css_namespaceObject),__webpack_require__.d(nimbus_tooltip_css_namespaceObject,{container:()=>container,content:()=>content});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),Box=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),floating_ui_react=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs"),floating_ui_core=__webpack_require__("./node_modules/@floating-ui/core/dist/floating-ui.core.mjs"),floating_ui_react_dom=__webpack_require__("./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs"),useTheme=__webpack_require__("./packages/core/styles/src/components/ThemeProvider/hooks/useTheme/useTheme.ts"),injectStylesIntoStyleTag=(__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/tooltip/nimbus-tooltip.css.ts.vanilla.css","source":"Ll8xMm9nMjFoMCB7CiAgd2lkdGg6IGZpdC1jb250ZW50Owp9Ci5fMTJvZzIxaDEgewogIHdpZHRoOiBmaXQtY29udGVudDsKICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uaW1idXMtY29sb3JzLW5ldXRyYWwtdGV4dEhpZ2gpOwogIHBhZGRpbmc6IHZhcigtLW5pbWJ1cy1zcGFjaW5nLTEpOwogIGJvcmRlci1yYWRpdXM6IHZhcigtLW5pbWJ1cy1zaGFwZS1ib3JkZXItcmFkaXVzLTEpOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmltYnVzLW1vdGlvbi1zcGVlZC1mYXN0KSBlYXNlOwogIHotaW5kZXg6IHZhcigtLW5pbWJ1cy16SW5kZXgtODAwKTsKfQ=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var container="_12og21h0",content="_12og21h1";const tooltip={classnames:{...nimbus_tooltip_css_namespaceObject}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Tooltip=({className:_className,style:_style,children,content,arrow=!1,position="bottom",...rest})=>{const arrowRef=(0,react.useRef)(null),[isVisible,setVisibility]=(0,react.useState)(!1),{refThemeProvider}=(0,useTheme.F)(),{context,strategy,floatingStyles}=(0,floating_ui_react.YF)({open:isVisible,placement:position,strategy:"fixed",middleware:[(0,floating_ui_core.cv)(6),(0,floating_ui_core.Qo)(),(0,floating_ui_react_dom.x7)({element:arrowRef})],onOpenChange:setVisibility}),{getReferenceProps,getFloatingProps}=(0,floating_ui_react.NI)([(0,floating_ui_react.XI)(context,{restMs:50,delay:{close:100},handleClose:(0,floating_ui_react.xp)({buffer:1})})]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{"data-testid":"tooltip-container",ref:context.refs.setReference,className:tooltip.classnames.container,...getReferenceProps(),children}),(0,jsx_runtime.jsx)(floating_ui_react.ll,{id:"nimbus-tooltip-floating",root:refThemeProvider?.current,children:isVisible&&(0,jsx_runtime.jsxs)("div",{...rest,ref:context.refs.setFloating,className:tooltip.classnames.content,style:{...floatingStyles,position:strategy},...getFloatingProps(),children:[(0,jsx_runtime.jsx)(Text.x,{color:"neutral-background",fontSize:"caption",lineHeight:"caption",children:content}),arrow&&(0,jsx_runtime.jsx)(Box.x,{as:floating_ui_react.Y$,"data-testid":"arrow-element",ref:arrowRef,context,color:"neutral-textLow",fill:"currentColor"})]})})]})};Tooltip.displayName="Tooltip";try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"",displayName:"Tooltip",props:{children:{defaultValue:null,description:"An HTML element, or a function that returns one. It's used to set the position of the tooltip.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},content:{defaultValue:null,description:"The text that should appear in the tooltip message.",name:"content",required:!1,type:{name:"string"}},arrow:{defaultValue:{value:"false"},description:"Conditional for displaying the popover arrow.",name:"arrow",required:!1,type:{name:"boolean"}},position:{defaultValue:{value:"bottom"},description:"Position of the popover.",name:"position",required:!1,type:{name:"enum",value:[{value:'"right"'},{value:'"left"'},{value:'"bottom"'},{value:'"top"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Tooltip/src/Tooltip.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"packages/react/src/atomic/Tooltip/src/Tooltip.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}const tooltip_stories={title:"Atomic/Tooltip",component:Tooltip,render:args=>(0,jsx_runtime.jsx)(Box.x,{display:"flex",justifyContent:"center",children:(0,jsx_runtime.jsx)(Tooltip,{...args,children:(0,jsx_runtime.jsx)(Text.x,{children:"Hover"})})}),argTypes:{children:{control:{type:"text"}}},tags:["autodocs"]},basic={args:{content:"Lorem ipsum dolor site amet"}},tooltip_stories_top={args:{content:"Lorem ipsum dolor site amet",position:"top"}},bottom={args:{content:"Lorem ipsum dolor site amet",position:"bottom"}},right={args:{content:"Lorem ipsum dolor site amet",position:"right"}},left={args:{content:"Lorem ipsum dolor site amet",position:"left"}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: "Lorem ipsum dolor site amet"\n  }\n}',...basic.parameters?.docs?.source}}},tooltip_stories_top.parameters={...tooltip_stories_top.parameters,docs:{...tooltip_stories_top.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: "Lorem ipsum dolor site amet",\n    position: "top"\n  }\n}',...tooltip_stories_top.parameters?.docs?.source}}},bottom.parameters={...bottom.parameters,docs:{...bottom.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: "Lorem ipsum dolor site amet",\n    position: "bottom"\n  }\n}',...bottom.parameters?.docs?.source}}},right.parameters={...right.parameters,docs:{...right.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: "Lorem ipsum dolor site amet",\n    position: "right"\n  }\n}',...right.parameters?.docs?.source}}},left.parameters={...left.parameters,docs:{...left.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: "Lorem ipsum dolor site amet",\n    position: "left"\n  }\n}',...left.parameters?.docs?.source}}};const __namedExportsOrder=["basic","top","bottom","right","left"]},"./packages/core/styles/src/components/ThemeProvider/hooks/useTheme/useTheme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>useTheme});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/ThemeProviderContext.tsx");const useTheme=()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts__WEBPACK_IMPORTED_MODULE_1__.G)},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/tooltip/nimbus-tooltip.css.ts.vanilla.css","source":"Ll8xMm9nMjFoMCB7CiAgd2lkdGg6IGZpdC1jb250ZW50Owp9Ci5fMTJvZzIxaDEgewogIHdpZHRoOiBmaXQtY29udGVudDsKICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uaW1idXMtY29sb3JzLW5ldXRyYWwtdGV4dEhpZ2gpOwogIHBhZGRpbmc6IHZhcigtLW5pbWJ1cy1zcGFjaW5nLTEpOwogIGJvcmRlci1yYWRpdXM6IHZhcigtLW5pbWJ1cy1zaGFwZS1ib3JkZXItcmFkaXVzLTEpOwogIHRyYW5zaXRpb246IG9wYWNpdHkgdmFyKC0tbmltYnVzLW1vdGlvbi1zcGVlZC1mYXN0KSBlYXNlOwogIHotaW5kZXg6IHZhcigtLW5pbWJ1cy16SW5kZXgtODAwKTsKfQ=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._12og21h0 {\n  width: fit-content;\n}\n._12og21h1 {\n  width: fit-content;\n  background-color: var(--nimbus-colors-neutral-textHigh);\n  padding: var(--nimbus-spacing-1);\n  border-radius: var(--nimbus-shape-border-radius-1);\n  transition: opacity var(--nimbus-motion-speed-fast) ease;\n  z-index: var(--nimbus-zIndex-800);\n}","",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,uDAAuD;EACvD,gCAAgC;EAChC,kDAAkD;EAClD,wDAAwD;EACxD,iCAAiC;AACnC",sourcesContent:["._12og21h0 {\n  width: fit-content;\n}\n._12og21h1 {\n  width: fit-content;\n  background-color: var(--nimbus-colors-neutral-textHigh);\n  padding: var(--nimbus-spacing-1);\n  border-radius: var(--nimbus-shape-border-radius-1);\n  transition: opacity var(--nimbus-motion-speed-fast) ease;\n  z-index: var(--nimbus-zIndex-800);\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);