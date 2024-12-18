"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[6448],{"./packages/react/src/composite/Tabs/src/components/TabsItem/tabsItem.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),_Tabs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/composite/Tabs/src/Tabs.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Tabs/Tabs.Item",component:_Tabs__WEBPACK_IMPORTED_MODULE_2__.t.Item,render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_Tabs__WEBPACK_IMPORTED_MODULE_2__.t,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Tabs__WEBPACK_IMPORTED_MODULE_2__.t.Item,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.a,{borderColor:"neutral-interactive",borderStyle:"dashed",borderWidth:"1",padding:"2",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.E,{fontSize:"base",textAlign:"center",children:"Replace me with your tab 1 content"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Tabs__WEBPACK_IMPORTED_MODULE_2__.t.Item,{label:"Tab 2",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.a,{borderColor:"neutral-interactive",borderStyle:"dashed",borderWidth:"1",padding:"2",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.E,{fontSize:"base",textAlign:"center",children:"Replace me with your tab 2 content"})})})]}),argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{label:"Tab 1"}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "Tab 1"\n  }\n}',...basic.parameters?.docs?.source}}};const __namedExportsOrder=["basic"]},"./packages/react/src/composite/Tabs/src/Tabs.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>Tabs});var nimbus_tabs_css_namespaceObject={};__webpack_require__.r(nimbus_tabs_css_namespaceObject),__webpack_require__.d(nimbus_tabs_css_namespaceObject,{container:()=>container,container__button:()=>container__button,container__item:()=>container__item,container__panel:()=>container__panel});var react=__webpack_require__("./node_modules/react/index.js"),injectStylesIntoStyleTag=(__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/tabs/nimbus-tabs.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6VUTY/TMBC991dYKyHRg1f9WBaRvSPuHDiiSTJJhnVsY4/bZhH/HTlx2qS0S4FLpMy8eZ55nuf7r5vu+wf1sBI/FkLkxpXoZGGUcZnYgXsrpaY2D36IeakxsAMlfXAVFPiJ6kZR3fDy6VTuuVOYCW00Dh9vFJUTwJ5Kbs74fQMW5RQgNz1pC64mnYlV/LFQlqTr9KfI8/S0GCvJWwVdJiqFhxhgB9oTk9FnJ7YmBqW3iKXMwePyafFzcZ8E2fSCRJJMrMVaQGAzzW/7PCiqtSTG1meiQM3o4plgLYIDXUway6F4rp0JusyGniw41BxTRXA+Cm4NjQzWjD07VMC0w5N+afrfJq3BnotqoSBdy/VcyTRMjBxkg/H+MrHd2MPkjhyUFPxrlzQgEne6GJkbZtNeaWMzgyqs+ArwcQZ0Q4M3INlcU2A4Oi3eerV6E38ro1lW0JLqzspi5mOfkB60Xx7Rnl7wAvYzvURdym5cpATf44XeY+ZLn5AO66DA9QWMB5b9Qk1X6QYvxsJoxOV/rPs2a8wO3fAKHDf1tZfAOmrBdeNLcMYGRdzZf6ebPixT3soUwae36hD3sTT7M8LApKLIRfCz4nd92Q0t9CYcBpgTZDlWxmHi0YyaM3F3NzNjrkzxPHcw5N6owMnBgz9kcttggtWF5Rx9Odryr1S8NsJj3/u34JmqTh5nGNftBHzfA//sq4dI/wsd9ZHIRQYAAA=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.A,options);webpack_plugin_extracted.A&&webpack_plugin_extracted.A.locals&&webpack_plugin_extracted.A.locals;var container="_2yq9l40",container__button={default:"_2yq9l43",active:"_2yq9l45 _2yq9l43",fullWidth:"_2yq9l46"},container__item={default:"_2yq9l41",fullWidth:"_2yq9l42"},container__panel="_2yq9l47";const tabs={classnames:{...nimbus_tabs_css_namespaceObject}},generateID=name=>name.toLowerCase().replace(" ","-");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TabsButton=({className:_className,style:_style,label,labelContent,active=!1,index,setActiveTab,fullWidth=!1,...rest})=>{const handleOnClick=(0,react.useCallback)((()=>{setActiveTab(index)}),[setActiveTab,index]),ariaID=generateID(label);return(0,jsx_runtime.jsx)("li",{className:tabs.classnames.container__item[fullWidth?"fullWidth":"default"],role:"presentation",...rest,children:(0,jsx_runtime.jsxs)("button",{className:[tabs.classnames.container__button[active?"active":"default"],fullWidth?tabs.classnames.container__button.fullWidth:""].join(" "),onClick:handleOnClick,type:"button",id:`tab-${ariaID}`,role:"tab","aria-selected":active,"aria-controls":`panel-${ariaID}`,tabIndex:0,children:[label,labelContent]})})};TabsButton.displayName="TabsButton";try{TabsButton.displayName="TabsButton",TabsButton.__docgenInfo={description:"",displayName:"TabsButton",props:{label:{defaultValue:null,description:"Label of the tab button.",name:"label",required:!0,type:{name:"string"}},labelContent:{defaultValue:null,description:"Content of the tab button.",name:"labelContent",required:!1,type:{name:"ReactNode"}},active:{defaultValue:{value:"false"},description:"Determines if tab is active.",name:"active",required:!1,type:{name:"boolean"}},index:{defaultValue:null,description:"Position of the tab inside the tab list.",name:"index",required:!0,type:{name:"number"}},setActiveTab:{defaultValue:null,description:"Function executed when clicking the tab.\n@TJS-type (index: number) => void;",name:"setActiveTab",required:!0,type:{name:"(index: number) => void"}},fullWidth:{defaultValue:{value:"false"},description:"Determines if tab spans all available width.",name:"fullWidth",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Tabs/src/components/TabsButton/TabsButton.tsx#TabsButton"]={docgenInfo:TabsButton.__docgenInfo,name:"TabsButton",path:"packages/react/src/composite/Tabs/src/components/TabsButton/TabsButton.tsx#TabsButton"})}catch(__react_docgen_typescript_loader_error){}const TabsItem=({className:_className,style:_style,label,children,...rest})=>{const ariaID=generateID(label);return(0,jsx_runtime.jsx)("div",{...rest,id:`panel-${ariaID}`,role:"tabpanel","aria-labelledby":`tab-${ariaID}`,className:tabs.classnames.container__panel,tabIndex:-1,children})};TabsItem.displayName="TabsItem";try{TabsItem.displayName="TabsItem",TabsItem.__docgenInfo={description:"",displayName:"TabsItem",props:{label:{defaultValue:null,description:"Label of the tabpanel. Used to pair with it's corresponding tab control.",name:"label",required:!0,type:{name:"string"}},labelContent:{defaultValue:null,description:"Optional content of the tabpanel.\n@TJS-type ReactNode;",name:"labelContent",required:!1,type:{name:"ReactNode"}},children:{defaultValue:null,description:"The content of the tabs item.\n@TJS-type ReactNode | ReactNode[];",name:"children",required:!1,type:{name:"((string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ReactNode[]) & (string | ... 4 more ... | ReactPortal)) | null"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Tabs/src/components/TabsItem/TabsItem.tsx#TabsItem"]={docgenInfo:TabsItem.__docgenInfo,name:"TabsItem",path:"packages/react/src/composite/Tabs/src/components/TabsItem/TabsItem.tsx#TabsItem"})}catch(__react_docgen_typescript_loader_error){}const Tabs=({className:_className,style:_style,children,preSelectedTab,fullWidth=!1,...rest})=>{const[selectedTab,setSelectedTab]=(0,react.useState)(preSelectedTab||0);return(0,jsx_runtime.jsxs)("div",{...rest,children:[(0,jsx_runtime.jsx)("ul",{role:"tablist",className:tabs.classnames.container,children:react.Children.map(children,((item,index)=>{const{props:{label,labelContent}}=item;return(0,jsx_runtime.jsx)(Tabs.Button,{label,index,active:index===selectedTab,setActiveTab:setSelectedTab,fullWidth,labelContent},label)}))}),children[selectedTab]]})};Tabs.displayName="Tabs",Tabs.Button=TabsButton,Tabs.Item=TabsItem,Tabs.displayName="Tabs",Tabs.Item.displayName="Tabs.Item",Tabs.Button.displayName="Tabs.Button";try{Tabs.displayName="Tabs",Tabs.__docgenInfo={description:"",displayName:"Tabs",props:{children:{defaultValue:null,description:"The content of the tabs.\n@TJS-type ReactElement<TabsButtonProps>[];",name:"children",required:!0,type:{name:"ReactElement<TabsButtonProps, string | JSXElementConstructor<any>>[]"}},preSelectedTab:{defaultValue:null,description:"Sets the indicated tab as active by default. If unset, defaults to first tab.",name:"preSelectedTab",required:!1,type:{name:"number"}},fullWidth:{defaultValue:{value:"false"},description:"Determines if tabs should span available width.",name:"fullWidth",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/composite/Tabs/src/Tabs.tsx#Tabs"]={docgenInfo:Tabs.__docgenInfo,name:"Tabs",path:"packages/react/src/composite/Tabs/src/Tabs.tsx#Tabs"})}catch(__react_docgen_typescript_loader_error){}},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/composite/tabs/nimbus-tabs.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6VUTY/TMBC991dYKyHRg1f9WBaRvSPuHDiiSTJJhnVsY4/bZhH/HTlx2qS0S4FLpMy8eZ55nuf7r5vu+wf1sBI/FkLkxpXoZGGUcZnYgXsrpaY2D36IeakxsAMlfXAVFPiJ6kZR3fDy6VTuuVOYCW00Dh9vFJUTwJ5Kbs74fQMW5RQgNz1pC64mnYlV/LFQlqTr9KfI8/S0GCvJWwVdJiqFhxhgB9oTk9FnJ7YmBqW3iKXMwePyafFzcZ8E2fSCRJJMrMVaQGAzzW/7PCiqtSTG1meiQM3o4plgLYIDXUway6F4rp0JusyGniw41BxTRXA+Cm4NjQzWjD07VMC0w5N+afrfJq3BnotqoSBdy/VcyTRMjBxkg/H+MrHd2MPkjhyUFPxrlzQgEne6GJkbZtNeaWMzgyqs+ArwcQZ0Q4M3INlcU2A4Oi3eerV6E38ro1lW0JLqzspi5mOfkB60Xx7Rnl7wAvYzvURdym5cpATf44XeY+ZLn5AO66DA9QWMB5b9Qk1X6QYvxsJoxOV/rPs2a8wO3fAKHDf1tZfAOmrBdeNLcMYGRdzZf6ebPixT3soUwae36hD3sTT7M8LApKLIRfCz4nd92Q0t9CYcBpgTZDlWxmHi0YyaM3F3NzNjrkzxPHcw5N6owMnBgz9kcttggtWF5Rx9Odryr1S8NsJj3/u34JmqTh5nGNftBHzfA//sq4dI/wsd9ZHIRQYAAA=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'._2yq9l40 {\n  border-color: var(--nimbus-colors-neutral-surfaceHighlight);\n  border-style: none none solid;\n  border-width: var(--nimbus-shape-border-width-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  transition: var(--nimbus-motion-speed-base);\n}\n._2yq9l42 {\n  flex: 1 1 auto;\n}\n._2yq9l43 {\n  align-items: center;\n  appearance: none;\n  background: transparent;\n  cursor: pointer;\n  position: relative;\n  border: 0;\n  display: flex;\n  gap: var(--nimbus-spacing-1);\n  margin: 0 auto;\n  max-height: 32px;\n  border-radius: var(--nimbus-shape-border-radius-1);\n  padding-bottom: var(--nimbus-spacing-2);\n  padding-left: var(--nimbus-spacing-6);\n  padding-right: var(--nimbus-spacing-6);\n  padding-top: var(--nimbus-spacing-2);\n  width: 100%;\n  font-family: var(--nimbus-fontFamily-sans);\n  font-size: var(--nimbus-fontSize-body-base);\n  font-weight: var(--nimbus-fontWeight-regular);\n  text-align: center;\n  color: var(--nimbus-colors-neutral-textHigh);\n  transition: var(--nimbus-motion-speed-base);\n}\n._2yq9l43:hover {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n._2yq9l43:active {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n._2yq9l43:focus {\n  box-shadow: var(--nimbus-utils-focus);\n}\n._2yq9l45 {\n  color: var(--nimbus-colors-primary-interactive);\n}\n._2yq9l45:before {\n  content: "";\n  display: block;\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background-color: var(--nimbus-colors-primary-interactive);\n}\n._2yq9l46 {\n  justify-content: center;\n}\n._2yq9l47 {\n  padding-top: var(--nimbus-spacing-4);\n}',"",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,2DAA2D;EAC3D,6BAA6B;EAC7B,gDAAgD;EAChD,SAAS;EACT,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,2CAA2C;AAC7C;AACA;EACE,cAAc;AAChB;AACA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;EACvB,eAAe;EACf,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,4BAA4B;EAC5B,cAAc;EACd,gBAAgB;EAChB,kDAAkD;EAClD,uCAAuC;EACvC,qCAAqC;EACrC,sCAAsC;EACtC,oCAAoC;EACpC,WAAW;EACX,0CAA0C;EAC1C,2CAA2C;EAC3C,6CAA6C;EAC7C,kBAAkB;EAClB,4CAA4C;EAC5C,2CAA2C;AAC7C;AACA;EACE,sDAAsD;AACxD;AACA;EACE,+DAA+D;AACjE;AACA;EACE,qCAAqC;AACvC;AACA;EACE,+CAA+C;AACjD;AACA;EACE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,YAAY;EACZ,OAAO;EACP,WAAW;EACX,WAAW;EACX,0DAA0D;AAC5D;AACA;EACE,uBAAuB;AACzB;AACA;EACE,oCAAoC;AACtC",sourcesContent:['._2yq9l40 {\n  border-color: var(--nimbus-colors-neutral-surfaceHighlight);\n  border-style: none none solid;\n  border-width: var(--nimbus-shape-border-width-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  transition: var(--nimbus-motion-speed-base);\n}\n._2yq9l42 {\n  flex: 1 1 auto;\n}\n._2yq9l43 {\n  align-items: center;\n  appearance: none;\n  background: transparent;\n  cursor: pointer;\n  position: relative;\n  border: 0;\n  display: flex;\n  gap: var(--nimbus-spacing-1);\n  margin: 0 auto;\n  max-height: 32px;\n  border-radius: var(--nimbus-shape-border-radius-1);\n  padding-bottom: var(--nimbus-spacing-2);\n  padding-left: var(--nimbus-spacing-6);\n  padding-right: var(--nimbus-spacing-6);\n  padding-top: var(--nimbus-spacing-2);\n  width: 100%;\n  font-family: var(--nimbus-fontFamily-sans);\n  font-size: var(--nimbus-fontSize-body-base);\n  font-weight: var(--nimbus-fontWeight-regular);\n  text-align: center;\n  color: var(--nimbus-colors-neutral-textHigh);\n  transition: var(--nimbus-motion-speed-base);\n}\n._2yq9l43:hover {\n  background-color: var(--nimbus-colors-primary-surface);\n}\n._2yq9l43:active {\n  background-color: var(--nimbus-colors-primary-surfaceHighlight);\n}\n._2yq9l43:focus {\n  box-shadow: var(--nimbus-utils-focus);\n}\n._2yq9l45 {\n  color: var(--nimbus-colors-primary-interactive);\n}\n._2yq9l45:before {\n  content: "";\n  display: block;\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background-color: var(--nimbus-colors-primary-interactive);\n}\n._2yq9l46 {\n  justify-content: center;\n}\n._2yq9l47 {\n  padding-top: var(--nimbus-spacing-4);\n}'],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);