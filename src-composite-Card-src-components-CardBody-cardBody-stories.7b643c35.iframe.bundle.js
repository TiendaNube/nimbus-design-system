"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[445],{"./packages/react/src/composite/Card/src/components/CardBody/cardBody.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),_Card__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/composite/Card/src/Card.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Card/Card.Body",component:_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Body,render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Header,{title:"Title"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Card__WEBPACK_IMPORTED_MODULE_2__.Z.Body,{...args})]}),argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.x,{borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{textAlign:"center",children:"Replace me with your content"})})}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: <Box borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive">\n        <Text textAlign="center">Replace me with your content</Text>\n      </Box>\n  }\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/composite/Card/src/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Card});__webpack_require__("./node_modules/react/index.js"),__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WY246kNhCG7/MUllbR3DQrc26cuyjabKRsFGUv9tqA6bbGYIRhDhvl3aPi0A10GYgyaDRq/V+VzV/VhRnWaN2Sv38gxHEqWaadcTKtdGOcupElb94d0zUFzwQjH3IhikL8tM9+lperkpdry8iHmKdZEW8FyaoVDc9a+QKLUBql2fkg/1m/iKYPCkTiHwz6sxHGiLwP80UcbIW14q39Xb/2rJeFm0sAC3few1S4CQabLsuEMQtXC1F4B9ilq0Wcoa5OQWtXs3OcHuTvriZ+eDRo7mocBJt7m7sa+j7q6py9ueomLsXgV95UsrrMXAVPc7RXV+zcVfA05ltBS1fBU7q5IcRV8PRw0N1V8HQ77O4qeLrPjq6Cpzic8+oimoWpucBNXaJLT2MeZxsxa0sppWhDPOJ3Ryml6DfoMWZu6E7U3E9KqbuD3uykFjsr0bUNV07Ks+dLo7sKdlH0P1v4zH4O1wH2F2l4qvq7LEK4DsTMa5YVuZuj1kxBy6KlccpTtMYIP1WNU+7z6GDQvWxnfs6TTX+hGDMHQhG5EdpR84Ch0H7ghz46uubsNI44XAu40FX7iZdSvTuGV4aRX4U07Yk4vK6VcMy7aUV5Ij8rWT1/4dnX/vMnXbUn8pdOdatP5OmzUC+ilRknf4hOPJ0IbyRXJwIJHSMaWdiWLHWlxyXJF11BsiFr/+npRAAwNc/EQ4av8rtwUp2/OxmvW6krRujHOGxEuYGm3Ajgznvg9d5brpVsZauEc3UZ8fYYjxH3o33NkfKB8naxADB3nwsPbD7asOObAAecRlw6xRtGgtWUmDGlyGVXMhLakVSrnJFoBShZiRuwLCayqzU91BM1Y43OK4p4PMNnZUUa6hH0kPo/Un1tj6QL0FZ55MKjNxJZHDJXnutXR4kXoRzKSKUrYQdcRmj91v+6419sii5ivHuMN8UMk/p0S+QuBXsyn90SBVgy+l+SBUMyF7K50f9OF457g4356K0eSFfD7Gly0TgNz2VnesuRCmMoOP3YNBjp43MSQwNkfmCcpRMxNEKbGyNpb6qlbx/oolOKkSRJkvptF56eAv4xG65cFTDZfrSTrzJvr0O9aLSz44H1jtzcgPYVc5FpiLC7JRswW8VqnsFZ29Z4o2xptlG1NdgoozsctZ1tWZpnVGN8wE7yGZnSk5bAqN+wg4July1PipvuMeJbxYARfyN3xEhgFc+MBPZYjzJiFTe+XlP2gcC+JNMCA4E1/NQLA4H17tQOQ9GRfXz/rcrFm+NSyoi7OjWMmgeah2s+aOt3ylELQFufZkYtBG19jBm1CLT1CWbUYtDW77ujdgbtjGsJaMlKKzUcghxTC5GP48qntDR2qOAGTjbhJmQUvDME+xC87kQPC6aN4M+1llXrvJn+iWeTSzjpxZ4dUBcoKjwvrSsoRlyPrhfpWqngWJl1sIP+8uGROv3T7p9/Af/RXrkfFAAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js');var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/card/nimbus-card.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA52UTW6DMBCF95zCm0rtwhFJk/6QC/Qaxh6wE2Mj24SQqnevTNsUEiMZVoiZed+8Z35Wl4qfuzZFnwlCTNhaki5DhYTzPkH9FTNhgDqhVYaolk2lfKcVzPEMrdP0wd9WQmEOouQuQ+vVzkDlq4fGOlF0mGrlQLkMUVAOjG+VpM7QiZhHjJWo8sZiWxMqVIm3T76fa8PAYEOYaOztJCc14NEE3vyqzr7LdHsvYbrFEk4gh7PiIlSZ/W3LdZ9an8AU0jO4YAzUPvlKVj/ntA6f03Qav+uq3vTqnNBjaXSjGKZaanOj7GsW10ZUxHTYNqYgFIaY5+WYD1Fy6R/TkLedwbMNpWBtyNZuOSZo62UGjxFVggm5el1MCZp6m4FriVH+HQi4el+OCdoiM3gKGmeIxP/TQ1K+gBQISJdjggFZz6sJY/0HO/nnuAogQjD6OIuxIB20yqjlk/U0wi6PsjtZn1gxCiimAx5uWhGGj1GSkQE5baCKNDC3PlihIg3PrQ9W6PuA37glWphgBwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var vanilla_extract_sprinkles_createRuntimeSprinkles_esm=__webpack_require__("./node_modules/@vanilla-extract/sprinkles/createRuntimeSprinkles/dist/vanilla-extract-sprinkles-createRuntimeSprinkles.esm.js"),cardBodySprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.$)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywj"},small:{defaultClass:"zmhxywk"},none:{defaultClass:"zmhxywl"}}}}}),properties:{padding:{base:"0 var(--nimbus-spacing-4)",small:"0 var(--nimbus-spacing-2)",none:"0"}}},cardFooterSprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.$)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywm"},small:{defaultClass:"zmhxywn"},none:{defaultClass:"zmhxywo"}}}}}),properties:{padding:{base:"0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4)",small:"0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2)",none:"0"}}},cardHeaderSprinkle={sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.$)({conditions:void 0,styles:{padding:{values:{base:{defaultClass:"zmhxywg"},small:{defaultClass:"zmhxywh"},none:{defaultClass:"zmhxywi"}}}}}),properties:{padding:{base:"var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2)",none:"0"}}};const card={...{sprinkle:(0,vanilla_extract_sprinkles_createRuntimeSprinkles_esm.$)({conditions:void 0,styles:{backgroundColor:{values:{"primary-surface":{defaultClass:"zmhxyw2"},"primary-surfaceHighlight":{defaultClass:"zmhxyw3"},"success-surface":{defaultClass:"zmhxyw4"},"success-surfaceHighlight":{defaultClass:"zmhxyw5"},"danger-surface":{defaultClass:"zmhxyw6"},"danger-surfaceHighlight":{defaultClass:"zmhxyw7"},"warning-surface":{defaultClass:"zmhxyw8"},"warning-surfaceHighlight":{defaultClass:"zmhxyw9"},"neutral-background":{defaultClass:"zmhxywa"},"neutral-surface":{defaultClass:"zmhxywb"},"neutral-surfaceHighlight":{defaultClass:"zmhxywc"}}},padding:{values:{base:{defaultClass:"zmhxywd"},small:{defaultClass:"zmhxywe"},none:{defaultClass:"zmhxywf"}}}}}),properties:{backgroundColor:{"primary-surface":"var(--nimbus-colors-primary-surface)","primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)","success-surface":"var(--nimbus-colors-success-surface)","success-surfaceHighlight":"var(--nimbus-colors-success-surfaceHighlight)","danger-surface":"var(--nimbus-colors-danger-surface)","danger-surfaceHighlight":"var(--nimbus-colors-danger-surfaceHighlight)","warning-surface":"var(--nimbus-colors-warning-surface)","warning-surfaceHighlight":"var(--nimbus-colors-warning-surfaceHighlight)","neutral-background":"var(--nimbus-colors-neutral-background)","neutral-surface":"var(--nimbus-colors-neutral-surface)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)"},padding:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"}}},classnames:{container:"zmhxyw0",container__footer:"zmhxyw1"},subComponents:{header:cardHeaderSprinkle,body:cardBodySprinkle,footer:cardFooterSprinkle}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CardBody=({className:_className,style:_style,padding="none",children,...rest})=>(0,jsx_runtime.jsx)("div",{className:card.subComponents.body.sprinkle({padding}),...rest,children});CardBody.displayName="CardBody";try{CardBody.displayName="CardBody",CardBody.__docgenInfo={description:"",displayName:"CardBody",props:{children:{defaultValue:null,description:"The content of the card body.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's body content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardBody/CardBody.tsx#CardBody"]={docgenInfo:CardBody.__docgenInfo,name:"CardBody",path:"packages/react/src/composite/Card/src/components/CardBody/CardBody.tsx#CardBody"})}catch(__react_docgen_typescript_loader_error){}const CardFooter=({className:_className,style:_style,padding="none",children,...rest})=>(0,jsx_runtime.jsx)("div",{className:[card.classnames.container__footer,card.subComponents.footer.sprinkle({padding})].join(" "),...rest,children});CardFooter.displayName="CardFooter";try{CardFooter.displayName="CardFooter",CardFooter.__docgenInfo={description:"",displayName:"CardFooter",props:{children:{defaultValue:null,description:"The content of the card footer.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's footer content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardFooter/CardFooter.tsx#CardFooter"]={docgenInfo:CardFooter.__docgenInfo,name:"CardFooter",path:"packages/react/src/composite/Card/src/components/CardFooter/CardFooter.tsx#CardFooter"})}catch(__react_docgen_typescript_loader_error){}var Title=__webpack_require__("./packages/react/src/atomic/Title/src/Title.tsx");const CardHeader=({className:_className,style:_style,padding="none",title,children,...rest})=>(0,jsx_runtime.jsxs)("div",{className:card.subComponents.header.sprinkle({padding}),...rest,children:[title&&(0,jsx_runtime.jsx)(Title.D,{"data-testid":"header-title",as:"h3",children:title}),children]});CardHeader.displayName="CardHeader";try{CardHeader.displayName="CardHeader",CardHeader.__docgenInfo={description:"",displayName:"CardHeader",props:{children:{defaultValue:null,description:"The content of the card header.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},title:{defaultValue:null,description:"The title to display in the card header.",name:"title",required:!1,type:{name:"string"}},padding:{defaultValue:{value:"none"},description:"The padding properties are used to generate space around an card's header content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/components/CardHeader/CardHeader.tsx#CardHeader"]={docgenInfo:CardHeader.__docgenInfo,name:"CardHeader",path:"packages/react/src/composite/Card/src/components/CardHeader/CardHeader.tsx#CardHeader"})}catch(__react_docgen_typescript_loader_error){}const Card=({className:_className,style:_style,children,padding="base",backgroundColor="neutral-background",...rest})=>(0,jsx_runtime.jsx)("div",{className:[card.classnames.container,card.sprinkle({padding,backgroundColor})].join(" "),...rest,children});Card.displayName="Card",Card.Body=CardBody,Card.Footer=CardFooter,Card.Header=CardHeader,Card.displayName="Card",Card.Body.displayName="Card.Body",Card.Footer.displayName="Card.Footer",Card.Header.displayName="Card.Header";try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{children:{defaultValue:null,description:"The content of the card.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},padding:{defaultValue:{value:"base"},description:"The padding properties are used to generate space around an card's content area.",name:"padding",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"small"'},{value:'"base"'}]}},backgroundColor:{defaultValue:{value:"neutral-background"},description:"The backgroundColor property sets the background color of the card.",name:"backgroundColor",required:!1,type:{name:"enum",value:[{value:'"primary-surface"'},{value:'"primary-surfaceHighlight"'},{value:'"success-surface"'},{value:'"success-surfaceHighlight"'},{value:'"danger-surface"'},{value:'"danger-surfaceHighlight"'},{value:'"warning-surface"'},{value:'"warning-surfaceHighlight"'},{value:'"neutral-background"'},{value:'"neutral-surface"'},{value:'"neutral-surfaceHighlight"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Card/src/Card.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"packages/react/src/composite/Card/src/Card.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/card/nimbus-card.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA52UTW6DMBCF95zCm0rtwhFJk/6QC/Qaxh6wE2Mj24SQqnevTNsUEiMZVoiZed+8Z35Wl4qfuzZFnwlCTNhaki5DhYTzPkH9FTNhgDqhVYaolk2lfKcVzPEMrdP0wd9WQmEOouQuQ+vVzkDlq4fGOlF0mGrlQLkMUVAOjG+VpM7QiZhHjJWo8sZiWxMqVIm3T76fa8PAYEOYaOztJCc14NEE3vyqzr7LdHsvYbrFEk4gh7PiIlSZ/W3LdZ9an8AU0jO4YAzUPvlKVj/ntA6f03Qav+uq3vTqnNBjaXSjGKZaanOj7GsW10ZUxHTYNqYgFIaY5+WYD1Fy6R/TkLedwbMNpWBtyNZuOSZo62UGjxFVggm5el1MCZp6m4FriVH+HQi4el+OCdoiM3gKGmeIxP/TQ1K+gBQISJdjggFZz6sJY/0HO/nnuAogQjD6OIuxIB20yqjlk/U0wi6PsjtZn1gxCiimAx5uWhGGj1GSkQE5baCKNDC3PlihIg3PrQ9W6PuA37glWphgBwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".zmhxyw0 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 1.5rem;\n  justify-content: center;\n  gap: var(--nimbus-spacing-4);\n  border-radius: var(--nimbus-shape-border-radius-2);\n  box-shadow: var(--nimbus-shadow-level-2);\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.zmhxyw1 {\n  display: flex;\n  gap: var(--nimbus-spacing-2);\n}\n.zmhxyw2 {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n.zmhxyw3 {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n.zmhxyw4 {\n  background-color: var(--nimbus-colors-success-surface);\n}\n.zmhxyw5 {\n  background-color: var(--nimbus-colors-success-surfaceHighlight);\n}\n.zmhxyw6 {\n  background-color: var(--nimbus-colors-danger-surface);\n}\n.zmhxyw7 {\n  background-color: var(--nimbus-colors-danger-surfaceHighlight);\n}\n.zmhxyw8 {\n  background-color: var(--nimbus-colors-warning-surface);\n}\n.zmhxyw9 {\n  background-color: var(--nimbus-colors-warning-surfaceHighlight);\n}\n.zmhxywa {\n  background-color: var(--nimbus-colors-neutral-background);\n}\n.zmhxywb {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n.zmhxywc {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}\n.zmhxywd {\n  padding: var(--nimbus-spacing-4);\n}\n.zmhxywe {\n  padding: var(--nimbus-spacing-2);\n}\n.zmhxywf {\n  padding: 0;\n}\n.zmhxywg {\n  padding: var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4);\n}\n.zmhxywh {\n  padding: var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2);\n}\n.zmhxywi {\n  padding: 0;\n}\n.zmhxywj {\n  padding: 0 var(--nimbus-spacing-4);\n}\n.zmhxywk {\n  padding: 0 var(--nimbus-spacing-2);\n}\n.zmhxywl {\n  padding: 0;\n}\n.zmhxywm {\n  padding: 0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4);\n}\n.zmhxywn {\n  padding: 0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2);\n}\n.zmhxywo {\n  padding: 0;\n}","",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,kBAAkB;EAClB,uBAAuB;EACvB,4BAA4B;EAC5B,kDAAkD;EAClD,wCAAwC;EACxC,sBAAsB;EACtB,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,4BAA4B;AAC9B;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,qDAAqD;AACvD;AACA;EACE,8DAA8D;AAChE;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,gCAAgC;AAClC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,UAAU;AACZ;AACA;EACE,kFAAkF;AACpF;AACA;EACE,kFAAkF;AACpF;AACA;EACE,UAAU;AACZ;AACA;EACE,kCAAkC;AACpC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,UAAU;AACZ;AACA;EACE,kFAAkF;AACpF;AACA;EACE,kFAAkF;AACpF;AACA;EACE,UAAU;AACZ",sourcesContent:[".zmhxyw0 {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 1.5rem;\n  justify-content: center;\n  gap: var(--nimbus-spacing-4);\n  border-radius: var(--nimbus-shape-border-radius-2);\n  box-shadow: var(--nimbus-shadow-level-2);\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.zmhxyw1 {\n  display: flex;\n  gap: var(--nimbus-spacing-2);\n}\n.zmhxyw2 {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n.zmhxyw3 {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n.zmhxyw4 {\n  background-color: var(--nimbus-colors-success-surface);\n}\n.zmhxyw5 {\n  background-color: var(--nimbus-colors-success-surfaceHighlight);\n}\n.zmhxyw6 {\n  background-color: var(--nimbus-colors-danger-surface);\n}\n.zmhxyw7 {\n  background-color: var(--nimbus-colors-danger-surfaceHighlight);\n}\n.zmhxyw8 {\n  background-color: var(--nimbus-colors-warning-surface);\n}\n.zmhxyw9 {\n  background-color: var(--nimbus-colors-warning-surfaceHighlight);\n}\n.zmhxywa {\n  background-color: var(--nimbus-colors-neutral-background);\n}\n.zmhxywb {\n  background-color: var(--nimbus-colors-neutral-surface);\n}\n.zmhxywc {\n  background-color: var(--nimbus-colors-neutral-surfaceHighlight);\n}\n.zmhxywd {\n  padding: var(--nimbus-spacing-4);\n}\n.zmhxywe {\n  padding: var(--nimbus-spacing-2);\n}\n.zmhxywf {\n  padding: 0;\n}\n.zmhxywg {\n  padding: var(--nimbus-spacing-4) var(--nimbus-spacing-4) 0 var(--nimbus-spacing-4);\n}\n.zmhxywh {\n  padding: var(--nimbus-spacing-2) var(--nimbus-spacing-2) 0 var(--nimbus-spacing-2);\n}\n.zmhxywi {\n  padding: 0;\n}\n.zmhxywj {\n  padding: 0 var(--nimbus-spacing-4);\n}\n.zmhxywk {\n  padding: 0 var(--nimbus-spacing-2);\n}\n.zmhxywl {\n  padding: 0;\n}\n.zmhxywm {\n  padding: 0 var(--nimbus-spacing-4) var(--nimbus-spacing-4) var(--nimbus-spacing-4);\n}\n.zmhxywn {\n  padding: 0 var(--nimbus-spacing-2) var(--nimbus-spacing-2) var(--nimbus-spacing-2);\n}\n.zmhxywo {\n  padding: 0;\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);