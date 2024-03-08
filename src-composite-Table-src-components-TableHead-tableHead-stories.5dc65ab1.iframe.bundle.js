"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[668],{"./packages/react/src/composite/Table/src/components/TableHead/tableHead.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Table__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/composite/Table/src/Table.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Table/Table.Head",component:_Table__WEBPACK_IMPORTED_MODULE_2__.X.Head,render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Table__WEBPACK_IMPORTED_MODULE_2__.X,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Head,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Row,{backgroundColor:"neutral-surface",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{as:"th",children:"Header 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{as:"th",children:"Header 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{as:"th",children:"Header 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{as:"th",children:"Header 4"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Body,{children:Array.from({length:10},((_,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Row,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{children:"Cell 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{children:"Cell 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{children:"Cell 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_2__.X.Cell,{children:"Cell 4"})]},i)))})]}),argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/composite/Table/src/Table.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>Table});__webpack_require__("./node_modules/react/index.js"),__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js');var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/table/nimbus-table.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA72VTXObMBCG7/kVunQmPigDxLETcump03sPPctoASVCIpKwsTv57x0EdiS+p4febO37LLvvruCBmV32lgTozx1CB5K8Z0pWguJEcqlidCTqHmPBikOl2zONBVRGEY6/1JvXBpaKgloD6kqlJAFLrZAbqM1PluXdU2qsc0LlqQe1h5jDETiOehVxUmqI0fWXE1SEskoPc5WAPYWfUpckYSKLUdAcplIYnJKC8XMvURP5YQNYE6FtCnkElfKm/pxRCqI5OzFq8hiFQfCt+WvIgQPm5CwrE6OU1UBf7z7vHtpZhXZW9qEnYFluRh762wZwAZRVxeZWpGYXGFH/YpemXXrGB6LbuXAmAOdj6ZtIl95FbuVF68tTkFWcqP9b32O76v+0rdfxmzOHGGnJGXWOuylOr5IV4HCDglUiuwqKCM0MkyIeXE8/SSEbFdYlAMUp0WaDgGjATGBZGceArTXgCMqwhHBMOMtEjIwsb/eLXexyJ1IYEI2NtYMHyOTDEVdCg7EFQ22uObvDG9pynk1t4MUdEItJYtgRpsTEFb/FeXOhprQHV/sepzKp9JQ2cbW1VRWkxiPK0lWe3XIngA8XuDglT+iVqw8Dp+4JQHsAbaVMjEnDJ08LXvkTyM5DUreBCWLvEZnbwQTx7BFm9oPUibiHVG4nC2ThkUenoQVQeODJ6WsBlN478sUiJaHU3jRXGYWekrhdjQORBxycZsb1j54+cXoY12+t/nvzMSFIJwpAICIoundGGZT1xqbo0rYrOHrPnuyr9PNLazrtxG7zvj58uQITqxQOiLIjFoaU98HoqQNHnQnrTr/kzm4f9fyBaX92/SKqeX+KQbdkwZ9oQHys84cN/NnN+nNe6U8YRNueQem0Qft+Fcd5g8Sg3cOCQY8DQq0z6G1g0H7WoMtag6Kgf8OyaYOe+1Wc5g2Sg3aTBYO2A0KvM+h9YNDznEFRcDXoL0nki0epDAAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.A,options);webpack_plugin_extracted.A&&webpack_plugin_extracted.A.locals&&webpack_plugin_extracted.A.locals;const table={classnames:{container:"it6gjc0",container__head:"it6gjc1",container__body:"it6gjc2",container__row:"it6gjc3",container__cell:"it6gjc4"},...{sprinkle:(0,__webpack_require__("./node_modules/rainbow-sprinkles/dist/createRuntimeFn-0cf1d875.esm.js").c)({config:{width:{dynamic:{default:"it6gjch",conditions:{xs:"it6gjcd",md:"it6gjce",lg:"it6gjcf",xl:"it6gjcg",rest:"it6gjch",active:"it6gjci",hover:"it6gjcj",focus:"it6gjck"}},name:"width",vars:{conditions:{xs:"var(--it6gjc5)",md:"var(--it6gjc6)",lg:"var(--it6gjc7)",xl:"var(--it6gjc8)",rest:"var(--it6gjc9)",active:"var(--it6gjca)",hover:"var(--it6gjcb)",focus:"var(--it6gjcc)"},default:"var(--it6gjc9)"},dynamicScale:!0},maxWidth:{dynamic:{default:"it6gjcx",conditions:{xs:"it6gjct",md:"it6gjcu",lg:"it6gjcv",xl:"it6gjcw",rest:"it6gjcx",active:"it6gjcy",hover:"it6gjcz",focus:"it6gjc10"}},name:"maxWidth",vars:{conditions:{xs:"var(--it6gjcl)",md:"var(--it6gjcm)",lg:"var(--it6gjcn)",xl:"var(--it6gjco)",rest:"var(--it6gjcp)",active:"var(--it6gjcq)",hover:"var(--it6gjcr)",focus:"var(--it6gjcs)"},default:"var(--it6gjcp)"},dynamicScale:!0},minWidth:{dynamic:{default:"it6gjc1d",conditions:{xs:"it6gjc19",md:"it6gjc1a",lg:"it6gjc1b",xl:"it6gjc1c",rest:"it6gjc1d",active:"it6gjc1e",hover:"it6gjc1f",focus:"it6gjc1g"}},name:"minWidth",vars:{conditions:{xs:"var(--it6gjc11)",md:"var(--it6gjc12)",lg:"var(--it6gjc13)",xl:"var(--it6gjc14)",rest:"var(--it6gjc15)",active:"var(--it6gjc16)",hover:"var(--it6gjc17)",focus:"var(--it6gjc18)"},default:"var(--it6gjc15)"},dynamicScale:!0},backgroundColor:{dynamic:{default:"it6gjc1t",conditions:{xs:"it6gjc1p",md:"it6gjc1q",lg:"it6gjc1r",xl:"it6gjc1s",rest:"it6gjc1t",active:"it6gjc1u",hover:"it6gjc1v",focus:"it6gjc1w"}},name:"backgroundColor",vars:{conditions:{xs:"var(--it6gjc1h)",md:"var(--it6gjc1i)",lg:"var(--it6gjc1j)",xl:"var(--it6gjc1k)",rest:"var(--it6gjc1l)",active:"var(--it6gjc1m)",hover:"var(--it6gjc1n)",focus:"var(--it6gjc1o)"},default:"var(--it6gjc1l)"},dynamicScale:{transparent:"transparent","neutral-background":"var(--nimbus-colors-neutral-background)","neutral-surface":"var(--nimbus-colors-neutral-surface)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)","primary-surface":"var(--nimbus-colors-primary-surface)","primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)"}},padding:{dynamic:{default:"it6gjc29",conditions:{xs:"it6gjc25",md:"it6gjc26",lg:"it6gjc27",xl:"it6gjc28",rest:"it6gjc29",active:"it6gjc2a",hover:"it6gjc2b",focus:"it6gjc2c"}},name:"padding",vars:{conditions:{xs:"var(--it6gjc1x)",md:"var(--it6gjc1y)",lg:"var(--it6gjc1z)",xl:"var(--it6gjc20)",rest:"var(--it6gjc21)",active:"var(--it6gjc22)",hover:"var(--it6gjc23)",focus:"var(--it6gjc24)"},default:"var(--it6gjc21)"},dynamicScale:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"}}}}),properties:{backgroundColor:{transparent:"transparent","neutral-background":"var(--nimbus-colors-neutral-background)","neutral-surface":"var(--nimbus-colors-neutral-surface)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)","primary-surface":"var(--nimbus-colors-primary-surface)","primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)"},padding:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"}}}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TableBody=({className:_className,style:_style,children,...rest})=>(0,jsx_runtime.jsx)("tbody",{...rest,className:table.classnames.container__body,children});TableBody.displayName="TableBody";try{TableBody.displayName="TableBody",TableBody.__docgenInfo={description:"",displayName:"TableBody",props:{children:{defaultValue:null,description:"The content of the table body.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Table/src/components/TableBody/TableBody.tsx#TableBody"]={docgenInfo:TableBody.__docgenInfo,name:"TableBody",path:"packages/react/src/composite/Table/src/components/TableBody/TableBody.tsx#TableBody"})}catch(__react_docgen_typescript_loader_error){}const TableCell=({className:_className,style:_style,children,padding="small",as:As="td",...rest})=>{const{className,style,otherProps}=table.sprinkle({...rest,padding});return(0,jsx_runtime.jsx)(As,{...otherProps,style,className:[table.classnames.container__cell,className].join(" "),children})};TableCell.displayName="TableCell";try{TableCell.displayName="TableCell",TableCell.__docgenInfo={description:"",displayName:"TableCell",props:{children:{defaultValue:null,description:"The content of the table cell.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},as:{defaultValue:{value:"td"},description:"Type of html tag to create for the table cell.",name:"as",required:!1,type:{name:"enum",value:[{value:'"td"'},{value:'"th"'}]}},width:{defaultValue:null,description:"The width property specifies the width of a table's content area.",name:"width",required:!1,type:{name:"string | TableConditions<string>"}},maxWidth:{defaultValue:null,description:"The maxWidth property specifies the maxWidth of a table's content area.",name:"maxWidth",required:!1,type:{name:"string | TableConditions<string>"}},minWidth:{defaultValue:null,description:"The minWidth property specifies the minWidth of a table's content area.",name:"minWidth",required:!1,type:{name:"string | TableConditions<string>"}},backgroundColor:{defaultValue:null,description:"The backgroundColor property sets the background color of the table.",name:"backgroundColor",required:!1,type:{name:'"transparent" | "primary-surface" | "primary-surfaceHighlight" | "neutral-background" | "neutral-surface" | "neutral-surfaceHighlight" | TableConditions<"transparent" | "primary-surface" | "primary-surfaceHighlight" | "neutral-background" | "neutral-surface" | "neutral-surfaceHighlight">'}},padding:{defaultValue:{value:"small"},description:"The padding properties are used to generate space around an table's content area.",name:"padding",required:!1,type:{name:'"none" | "small" | "base" | TableConditions<"none" | "small" | "base">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Table/src/components/TableCell/TableCell.tsx#TableCell"]={docgenInfo:TableCell.__docgenInfo,name:"TableCell",path:"packages/react/src/composite/Table/src/components/TableCell/TableCell.tsx#TableCell"})}catch(__react_docgen_typescript_loader_error){}const TableHead=({className:_className,style:_style,children,...rest})=>(0,jsx_runtime.jsx)("thead",{...rest,className:table.classnames.container__head,children});TableHead.displayName="TableHead";try{TableHead.displayName="TableHead",TableHead.__docgenInfo={description:"",displayName:"TableHead",props:{children:{defaultValue:null,description:"The content of the table head.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Table/src/components/TableHead/TableHead.tsx#TableHead"]={docgenInfo:TableHead.__docgenInfo,name:"TableHead",path:"packages/react/src/composite/Table/src/components/TableHead/TableHead.tsx#TableHead"})}catch(__react_docgen_typescript_loader_error){}const TableRow=({className:_className,style:_style,children,id,onClick,backgroundColor={rest:"neutral-background",active:"primary-surface",hover:"neutral-surface"},...rest})=>{const{className,style,otherProps}=table.sprinkle({...rest,backgroundColor});return(0,jsx_runtime.jsx)("tr",{className:[table.classnames.container__row,className].join(" "),style,...otherProps,id,onClick,children})};TableRow.displayName="TableRow";try{TableRow.displayName="TableRow",TableRow.__docgenInfo={description:"",displayName:"TableRow",props:{children:{defaultValue:null,description:"The content of the table row.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},id:{defaultValue:null,description:"The ID of the table row.",name:"id",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"Function to be passed when clicking on the table row.\n@TJS-type () => void;",name:"onClick",required:!1,type:{name:"((() => void) & MouseEventHandler<HTMLTableRowElement>)"}},width:{defaultValue:null,description:"The width property specifies the width of a table's content area.",name:"width",required:!1,type:{name:"string | TableConditions<string>"}},maxWidth:{defaultValue:null,description:"The maxWidth property specifies the maxWidth of a table's content area.",name:"maxWidth",required:!1,type:{name:"string | TableConditions<string>"}},minWidth:{defaultValue:null,description:"The minWidth property specifies the minWidth of a table's content area.",name:"minWidth",required:!1,type:{name:"string | TableConditions<string>"}},backgroundColor:{defaultValue:{value:'{\n    rest: "neutral-background",\n    active: "primary-surface",\n    hover: "neutral-surface",\n  }'},description:"The backgroundColor property sets the background color of the table.",name:"backgroundColor",required:!1,type:{name:'"transparent" | "primary-surface" | "primary-surfaceHighlight" | "neutral-background" | "neutral-surface" | "neutral-surfaceHighlight" | TableConditions<"transparent" | "primary-surface" | "primary-surfaceHighlight" | "neutral-background" | "neutral-surface" | "neutral-surfaceHighlight">'}},padding:{defaultValue:null,description:"The padding properties are used to generate space around an table's content area.",name:"padding",required:!1,type:{name:'"none" | "small" | "base" | TableConditions<"none" | "small" | "base">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Table/src/components/TableRow/TableRow.tsx#TableRow"]={docgenInfo:TableRow.__docgenInfo,name:"TableRow",path:"packages/react/src/composite/Table/src/components/TableRow/TableRow.tsx#TableRow"})}catch(__react_docgen_typescript_loader_error){}const Table=({className:_className,style:_style,children,...rest})=>(0,jsx_runtime.jsx)("table",{...rest,className:table.classnames.container,children});Table.displayName="Table",Table.Body=TableBody,Table.Cell=TableCell,Table.Head=TableHead,Table.Row=TableRow,Table.displayName="Table",Table.Body.displayName="Table.Body",Table.Cell.displayName="Table.Cell",Table.Head.displayName="Table.Head",Table.Row.displayName="Table.Row";try{Table.displayName="Table",Table.__docgenInfo={description:"",displayName:"Table",props:{children:{defaultValue:null,description:"The content of the table.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Table/src/Table.tsx#Table"]={docgenInfo:Table.__docgenInfo,name:"Table",path:"packages/react/src/composite/Table/src/Table.tsx#Table"})}catch(__react_docgen_typescript_loader_error){}}}]);