"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[1224],{"./packages/react/src/composite/Card/src/components/CardBody/cardBody.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),_Card__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/composite/Card/src/Card.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Card/Card.Body",component:_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Body,render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Header,{title:"Title"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Body,{...args})]}),argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.a,{borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.E,{textAlign:"center",children:"Replace me with your content"})})}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: <Box borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive">\n        <Text textAlign="center">Replace me with your content</Text>\n      </Box>\n  }\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/composite/Card/src/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card});__webpack_require__("./node_modules/react/index.js"),__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js');var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/card/nimbus-card.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA52UTW6DMBCF95zCm0rtwhFJk/6QC/Qaxp4YJ8ZGNg6QqnevTNsUEiMZVoh58755Y35Wl7JouyZFnwlCTNhKki5DBwntPkH9FTNhgNZCqwxRLV2pvNIIVhcZWqfpg78thcIFCF7UGVqvdgZKXz06W4tDh6lWNag6QxRUDcZLnFQZOhPziLESZe4sthWhQnG8ffJ6rg0Dgw1hwtnbzoJUgEcdePPrar3KdHNvYbrBEs4gh73iIhTP/qblut0nX8nq50zW4TOZTu65V/emd+eEnrjRTjFMtdTmxtnXLK6MKInpsHXmQCgMMc/LMR+CF9I/kiFvO4NnHaVgbSjWbjkmGOtlBo8RxcGEUr0upgRDvc3ANcQo/w4EUr0vxwRjkRk8Ba42ROL/7iEpX0AKLEiXY4ILsp5XEcb6j3PyL3E1QIRh9HEexoZ0IPGo4ZP1NCJuERV3sj4xYrSgmF7weCNFBD5FWUYB5HSAMjLA3PpghIoMPLc+GKHvF/wGmX8Q/kwHAAA="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.A,options);webpack_plugin_extracted.A&&webpack_plugin_extracted.A.locals&&webpack_plugin_extracted.A.locals;var vanilla_extract_sprinkles_createRuntimeSprinkles_esm=__webpack_require__("./node_modules/@vanilla-extract/sprinkles/createRuntimeSprinkles/dist/vanilla-extract-sprinkles-createRuntimeSprinkles.esm.js"),cardBodySprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.U)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywj"},small:{defaultClass:"zmhxywk"},none:{defaultClass:"zmhxywl"}}}}}),properties:{padding:{base:"0 var(--nimbus-spacing-4)",small:"0 var(--nimbus-spacing-2)",none:"0"}}},cardFooterSprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.U)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywm"},small:{defaultClass:"zmhxywn"},none:{defaultClass:"zmhxywo"}}}}}),properties:{padding:{base:"0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4)",small:"0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2)",none:"0"}}},cardHeaderSprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.U)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywg"},small:{defaultClass:"zmhxywh"},none:{defaultClass:"zmhxywi"}}}}}),properties:{padding:{base:"var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2)",none:"0"}}};const card={...{sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.U)({conditions:void 0,styles:{backgroundColor:{values:{"primary-surface":{defaultClass:"zmhxyw2"},"primary-surfaceHighlight":{defaultClass:"zmhxyw3"},"success-surface":{defaultClass:"zmhxyw4"},"success-surfaceHighlight":{defaultClass:"zmhxyw5"},"danger-surface":{defaultClass:"zmhxyw6"},"danger-surfaceHighlight":{defaultClass:"zmhxyw7"},"warning-surface":{defaultClass:"zmhxyw8"},"warning-surfaceHighlight":{defaultClass:"zmhxyw9"},"neutral-background":{defaultClass:"zmhxywa"},"neutral-surface":{defaultClass:"zmhxywb"},"neutral-surfaceHighlight":{defaultClass:"zmhxywc"}}},padding:{values:{base:{defaultClass:"zmhxywd"},small:{defaultClass:"zmhxywe"},none:{defaultClass:"zmhxywf"}}}}}),properties:{backgroundColor:{"primary-surface":"var(--nimbus-colors-primary-surface)","primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)","success-surface":"var(--nimbus-colors-success-surface)","success-surfaceHighlight":"var(--nimbus-colors-success-surfaceHighlight)","danger-surface":"var(--nimbus-colors-danger-surface)","danger-surfaceHighlight":"var(--nimbus-colors-danger-surfaceHighlight)","warning-surface":"var(--nimbus-colors-warning-surface)","warning-surfaceHighlight":"var(--nimbus-colors-warning-surfaceHighlight)","neutral-background":"var(--nimbus-colors-neutral-background)","neutral-surface":"var(--nimbus-colors-neutral-surface)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)"},padding:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"}}},classnames:{container:"zmhxyw0",container__footer:"zmhxyw1"},subComponents:{header:cardHeaderSprinkle,body:cardBodySprinkle,footer:cardFooterSprinkle}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CardBody=({className:_className,style:_style,padding="none",children,...rest})=>(0,jsx_runtime.jsx)("div",{className:card.subComponents.body.sprinkle({padding}),...rest,children});CardBody.displayName="CardBody";try{CardBody.displayName="CardBody",CardBody.__docgenInfo={description:"",displayName:"CardBody",props:{children:{defaultValue:null,description:"The content of the card body.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's body content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardBody/CardBody.tsx#CardBody"]={docgenInfo:CardBody.__docgenInfo,name:"CardBody",path:"packages/react/src/composite/Card/src/components/CardBody/CardBody.tsx#CardBody"})}catch(__react_docgen_typescript_loader_error){}const CardFooter=({className:_className,style:_style,padding="none",children,...rest})=>(0,jsx_runtime.jsx)("div",{className:[card.classnames.container__footer,card.subComponents.footer.sprinkle({padding})].join(" "),...rest,children});CardFooter.displayName="CardFooter";try{CardFooter.displayName="CardFooter",CardFooter.__docgenInfo={description:"",displayName:"CardFooter",props:{children:{defaultValue:null,description:"The content of the card footer.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's footer content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardFooter/CardFooter.tsx#CardFooter"]={docgenInfo:CardFooter.__docgenInfo,name:"CardFooter",path:"packages/react/src/composite/Card/src/components/CardFooter/CardFooter.tsx#CardFooter"})}catch(__react_docgen_typescript_loader_error){}var Title=__webpack_require__("./packages/react/src/atomic/Title/src/Title.tsx");const CardHeader=({className:_className,style:_style,padding="none",title,children,...rest})=>(0,jsx_runtime.jsxs)("div",{className:card.subComponents.header.sprinkle({padding}),...rest,children:[title&&(0,jsx_runtime.jsx)(Title.h,{"data-testid":"header-title",as:"h4",children:title}),children]});CardHeader.displayName="CardHeader";try{CardHeader.displayName="CardHeader",CardHeader.__docgenInfo={description:"",displayName:"CardHeader",props:{children:{defaultValue:null,description:"The content of the card header.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},title:{defaultValue:null,description:"The title to display in the card header.",name:"title",required:!1,type:{name:"string"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's header content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardHeader/CardHeader.tsx#CardHeader"]={docgenInfo:CardHeader.__docgenInfo,name:"CardHeader",path:"packages/react/src/composite/Card/src/components/CardHeader/CardHeader.tsx#CardHeader"})}catch(__react_docgen_typescript_loader_error){}const Card=({className:_className,style:_style,children,padding="base",backgroundColor="neutral-background",...rest})=>(0,jsx_runtime.jsx)("div",{className:[card.classnames.container,card.sprinkle({padding,backgroundColor})].join(" "),...rest,children});Card.displayName="Card",Card.Body=CardBody,Card.Footer=CardFooter,Card.Header=CardHeader,Card.displayName="Card",Card.Body.displayName="Card.Body",Card.Footer.displayName="Card.Footer",Card.Header.displayName="Card.Header";try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{children:{defaultValue:null,description:"The content of the card.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"base"},description:"The padding properties are used to generate space around an card's content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}},backgroundColor:{defaultValue:{value:"neutral-background"},description:"The backgroundColor property sets the background color of the card.",name:"backgroundColor",required:!1,type:{name:"enum",value:[{value:'"primary-surface"'},{value:'"primary-surfaceHighlight"'},{value:'"success-surface"'},{value:'"success-surfaceHighlight"'},{value:'"danger-surface"'},{value:'"danger-surfaceHighlight"'},{value:'"warning-surface"'},{value:'"warning-surfaceHighlight"'},{value:'"neutral-background"'},{value:'"neutral-surface"'},{value:'"neutral-surfaceHighlight"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/Card.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"packages/react/src/composite/Card/src/Card.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/card/nimbus-card.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA52UTW6DMBCF95zCm0rtwhFJk/6QC/Qaxp4YJ8ZGNg6QqnevTNsUEiMZVoh58755Y35Wl7JouyZFnwlCTNhKki5DBwntPkH9FTNhgNZCqwxRLV2pvNIIVhcZWqfpg78thcIFCF7UGVqvdgZKXz06W4tDh6lWNag6QxRUDcZLnFQZOhPziLESZe4sthWhQnG8ffJ6rg0Dgw1hwtnbzoJUgEcdePPrar3KdHNvYbrBEs4gh73iIhTP/qblut0nX8nq50zW4TOZTu65V/emd+eEnrjRTjFMtdTmxtnXLK6MKInpsHXmQCgMMc/LMR+CF9I/kiFvO4NnHaVgbSjWbjkmGOtlBo8RxcGEUr0upgRDvc3ANcQo/w4EUr0vxwRjkRk8Ba42ROL/7iEpX0AKLEiXY4ILsp5XEcb6j3PyL3E1QIRh9HEexoZ0IPGo4ZP1NCJuERV3sj4xYrSgmF7weCNFBD5FWUYB5HSAMjLA3PpghIoMPLc+GKHvF/wGmX8Q/kwHAAA="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".zmhxyw0 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 1.5rem;\n  justify-content: center;\n  gap: var(--nimbus-spacing-4);\n  border-radius: var(--nimbus-shape-border-radius-2);\n  box-shadow: var(--nimbus-shadow-level-2);\n  box-sizing: border-box;\n}\n.zmhxyw1 {\n  display: flex;\n  gap: var(--nimbus-spacing-2);\n}\n.zmhxyw2 {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n.zmhxyw3 {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n.zmhxyw4 {\n  background-color: var(--nimbus-colors-success-surface);\n}\n.zmhxyw5 {\n  background-color: var(--nimbus-colors-success-surfaceHighlight);\n}\n.zmhxyw6 {\n  background-color: var(--nimbus-colors-danger-surface);\n}\n.zmhxyw7 {\n  background-color: var(--nimbus-colors-danger-surfaceHighlight);\n}\n.zmhxyw8 {\n  background-color: var(--nimbus-colors-warning-surface);\n}\n.zmhxyw9 {\n  background-color: var(--nimbus-colors-warning-surfaceHighlight);\n}\n.zmhxywa {\n  background-color: var(--nimbus-colors-neutral-background);\n}\n.zmhxywb {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n.zmhxywc {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}\n.zmhxywd {\n  padding: var(--nimbus-spacing-4);\n}\n.zmhxywe {\n  padding: var(--nimbus-spacing-2);\n}\n.zmhxywf {\n  padding: 0;\n}\n.zmhxywg {\n  padding: var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4);\n}\n.zmhxywh {\n  padding: var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2);\n}\n.zmhxywi {\n  padding: 0;\n}\n.zmhxywj {\n  padding: 0 var(--nimbus-spacing-4);\n}\n.zmhxywk {\n  padding: 0 var(--nimbus-spacing-2);\n}\n.zmhxywl {\n  padding: 0;\n}\n.zmhxywm {\n  padding: 0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4);\n}\n.zmhxywn {\n  padding: 0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2);\n}\n.zmhxywo {\n  padding: 0;\n}","",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,kBAAkB;EAClB,uBAAuB;EACvB,4BAA4B;EAC5B,kDAAkD;EAClD,wCAAwC;EACxC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,4BAA4B;AAC9B;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,qDAAqD;AACvD;AACA;EACE,8DAA8D;AAChE;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,gCAAgC;AAClC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,UAAU;AACZ;AACA;EACE,kFAAkF;AACpF;AACA;EACE,kFAAkF;AACpF;AACA;EACE,UAAU;AACZ;AACA;EACE,kCAAkC;AACpC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,UAAU;AACZ;AACA;EACE,kFAAkF;AACpF;AACA;EACE,kFAAkF;AACpF;AACA;EACE,UAAU;AACZ",sourcesContent:[".zmhxyw0 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 1.5rem;\n  justify-content: center;\n  gap: var(--nimbus-spacing-4);\n  border-radius: var(--nimbus-shape-border-radius-2);\n  box-shadow: var(--nimbus-shadow-level-2);\n  box-sizing: border-box;\n}\n.zmhxyw1 {\n  display: flex;\n  gap: var(--nimbus-spacing-2);\n}\n.zmhxyw2 {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n.zmhxyw3 {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n.zmhxyw4 {\n  background-color: var(--nimbus-colors-success-surface);\n}\n.zmhxyw5 {\n  background-color: var(--nimbus-colors-success-surfaceHighlight);\n}\n.zmhxyw6 {\n  background-color: var(--nimbus-colors-danger-surface);\n}\n.zmhxyw7 {\n  background-color: var(--nimbus-colors-danger-surfaceHighlight);\n}\n.zmhxyw8 {\n  background-color: var(--nimbus-colors-warning-surface);\n}\n.zmhxyw9 {\n  background-color: var(--nimbus-colors-warning-surfaceHighlight);\n}\n.zmhxywa {\n  background-color: var(--nimbus-colors-neutral-background);\n}\n.zmhxywb {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n.zmhxywc {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}\n.zmhxywd {\n  padding: var(--nimbus-spacing-4);\n}\n.zmhxywe {\n  padding: var(--nimbus-spacing-2);\n}\n.zmhxywf {\n  padding: 0;\n}\n.zmhxywg {\n  padding: var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4);\n}\n.zmhxywh {\n  padding: var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2);\n}\n.zmhxywi {\n  padding: 0;\n}\n.zmhxywj {\n  padding: 0 var(--nimbus-spacing-4);\n}\n.zmhxywk {\n  padding: 0 var(--nimbus-spacing-2);\n}\n.zmhxywl {\n  padding: 0;\n}\n.zmhxywm {\n  padding: 0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4);\n}\n.zmhxywn {\n  padding: 0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2);\n}\n.zmhxywo {\n  padding: 0;\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);