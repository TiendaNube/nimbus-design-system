"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[3245],{"./packages/react/src/atomic/Badge/src/badge.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,danger:()=>danger,default:()=>__WEBPACK_DEFAULT_EXPORT__,neutral:()=>neutral,primary:()=>primary,success:()=>success,warning:()=>warning});const __WEBPACK_DEFAULT_EXPORT__={title:"Atomic/Badge",component:__webpack_require__("./packages/react/src/atomic/Badge/src/Badge.tsx").C,tags:["autodocs"]},basic={args:{count:"+99"}},neutral={args:{appearance:"neutral",count:"+99"}},primary={args:{appearance:"primary",count:"+99"}},success={args:{appearance:"success",count:"+99"}},warning={args:{appearance:"warning",count:"+99"}},danger={args:{appearance:"danger",count:"+99"}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    count: "+99"\n  }\n}',...basic.parameters?.docs?.source}}},neutral.parameters={...neutral.parameters,docs:{...neutral.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "neutral",\n    count: "+99"\n  }\n}',...neutral.parameters?.docs?.source}}},primary.parameters={...primary.parameters,docs:{...primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "primary",\n    count: "+99"\n  }\n}',...primary.parameters?.docs?.source}}},success.parameters={...success.parameters,docs:{...success.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "success",\n    count: "+99"\n  }\n}',...success.parameters?.docs?.source}}},warning.parameters={...warning.parameters,docs:{...warning.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "warning",\n    count: "+99"\n  }\n}',...warning.parameters?.docs?.source}}},danger.parameters={...danger.parameters,docs:{...danger.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "danger",\n    count: "+99"\n  }\n}',...danger.parameters?.docs?.source}}};const __namedExportsOrder=["basic","neutral","primary","success","warning","danger"]},"./packages/react/src/atomic/Badge/src/Badge.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>Badge});var nimbus_badge_css_namespaceObject={};__webpack_require__.r(nimbus_badge_css_namespaceObject),__webpack_require__.d(nimbus_badge_css_namespaceObject,{light:()=>light,surface:()=>surface});__webpack_require__("./node_modules/react/index.js"),__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY+kNhCG7/kVllbRXJqV+W7ILYo2GykbRdlDzgaKbmsMRjbM9GyU/x4VH9M02ECStkat1vuUXbxlCjOpkrIlf31HiOPUvMo67eRSSKWdRvGKqTdHd6pkOaTkA0AZluUP++xnfrkKfrm2KfmQRLlb5ltBvG5BsbzlL7gIpWFShAf5z/IFVB8UeMlmZrOg3xVoDUUf5gdxsRXWwq39Vb72rBeGbI/FK+9hmrmJCdZdnoPWM1cLKKH0DrBzV2NWxnm8FbR0NT/H2UH+7mrih0eD5q7GQbCZ29zV0Pf9PfbdVTdxqQl+Zarm9WXmKnpawAF27ip6GhtrPAU9uoqe0s2EDK6ip4eD7q6ip9thd1fR0312dBU9NcMFqy+gHkwtwGzqI/roacxi4/0/xiwtpZQaN8QavztKKTXeQeuYuaE7UXM/KaXuDvpuJ7XYWUPXKiacjOXPFyW7GrMo+88WPrM/wnGA/Ylrlon+KiHGcSBmXrPCxbEV9Fi0jOI4yE9VO/efg0GzsvWfrTAsxsyBqMCxFzAWusCxx07tiOF4gEtZt59YxcWbo1mtU/IzcN2eiMOaRoCj33QL1Yn8KHj9/IXlX/vfn2TdnsgfMpOtPJGnzyBeoOU5I79BB08nwhRn4kRwQkeD4qVtyUrWclySfJE1TjbM2v96OhEEdMNyWM3wlX8DJ5PFm5OzpuWyTgn9GIcKqg00YxqQO++B1/vecq1ky1sBztVNibfHeClxt7IbMR+xXSpAytvFwgO5Rxtu/AlogKPg0gmmUhIsmsSMqaDgXZWS0I5kUhQpiRaA4DW8A/NarjJfkkMpTT4syXkt1+bO6Fk9j3Ceoe5ryjdXfg0GB9MLD3KR2R19ZYV8dQS8gHBoSmpZgx1wU0KbW//njt+mNvgQ491jvKMx/hDjNzcSTTFDTz/9+wSCYTIXV3f//3ThMJ0XYILef5yuwcaiClCOYgXvdO+suTwrFA1dV9xE+uYmaEIDwz1m4kLrNlqhkXFnmkjam/rRPTZv2QmRkiRJkua2C08t3j9mw5WJEvvW93bylRftdagXjXYyHljvyMUNaF8x19CBDexuyQbMVrGG5XiQtm28UbZstlG1bbBRNmY4ajtpWTbPqMbmLjrJZ0MrnrQE2/mGHdTY7t/l/mlgX9n1UuJbxSAl/sbcUUoCq3hOSWCP9WhKrOLG7TXNPhCmm2RaYCBMG37aCwNh2rvTdhiKbsjj2y91ATfHpTQl7uJMMGoeap5Z81FbvjCOWoDa8qwyaiFqy0PKqEWoLc8noxajtnyZHbUzamezlqCWLLRK4hHH0Q1AMbYrn9JK26GSaTy8hJuQFvhCEOxD+C4TrRbMFLDnRvK6dW66f+LZ5ArPcbFnB8QFi4rPS+sKIiWuR5eLdC0XeGjMO8ygH3gieP+P3N//AE4/qyr8EwAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js');var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/badge/nimbus-badge.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA7WSMU/DMBCF9/wKj3S4qqWUQrozsTEwIsd2kgPHjmyHJEX978iGiLSBSkHJ6Pfu3neS3/Jlzeu02OgV+YgI4WhLSduYpFI0+4gQKjFTgE4UNiZMKCeMl18r6zBtgWnlhHJ9q0bu8pik6DrXq7nALHcxWS3vdlsjCq8VqOB7ui+XlHNUWUxW5J2aKwCFRVJZsCVlqDJYL/xUohuweAiDiTZcGEh08+WEl6EcKxufZeS0FHAyAWklZYiUqAR0h56seec5GJBo3gKjpUOtwlaqlfOXiLMdrz/hQfyxkdICZfvLzkMwwFJlF/voGC27H1qHH0ooe8uMrhQHpqU2ZwlBs1AaLKhpwYnGPeo6YC+MK1E5QyX8hJ+ir0egbcWYsHYq9GYEuqZG+YZMhL4ZgeZUZcJMRd6OIHdZE6Fv/4E+ybpIH/ayh97Nih72soe+mxU97GUPfT8retDLHpnOSh728vgJSolyem0GAAA="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var light={primary:"_1dwfm3o6 _1dwfm3o0",success:"_1dwfm3o7 _1dwfm3o0",warning:"_1dwfm3o8 _1dwfm3o0",danger:"_1dwfm3o9 _1dwfm3o0",neutral:"_1dwfm3oa _1dwfm3o0"},surface={primary:"_1dwfm3o1 _1dwfm3o0",success:"_1dwfm3o2 _1dwfm3o0",warning:"_1dwfm3o3 _1dwfm3o0",danger:"_1dwfm3o4 _1dwfm3o0",neutral:"_1dwfm3o5 _1dwfm3o0"};const badge={classnames:{...nimbus_badge_css_namespaceObject}};var Text=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),Skeleton=__webpack_require__("./packages/react/src/atomic/Skeleton/src/Skeleton.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const BadgeSkeleton=({width,height,"data-testid":dataTestId})=>(0,jsx_runtime.jsx)(Skeleton.O,{width:width??"1.5rem",height:height??"1.25rem",borderRadius:"0.813rem","data-testid":dataTestId});BadgeSkeleton.displayName="BadgeSkeleton";try{BadgeSkeleton.displayName="BadgeSkeleton",BadgeSkeleton.__docgenInfo={description:"",displayName:"BadgeSkeleton",props:{width:{defaultValue:null,description:"Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.",name:"width",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card.",name:"height",required:!1,type:{name:"string"}},"data-testid":{defaultValue:null,description:"This is an attribute used to identify a DOM node for testing purposes.",name:"data-testid",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Badge/src/components/BadgeSkeleton/BadgeSkeleton.tsx#BadgeSkeleton"]={docgenInfo:BadgeSkeleton.__docgenInfo,name:"BadgeSkeleton",path:"packages/react/src/atomic/Badge/src/components/BadgeSkeleton/BadgeSkeleton.tsx#BadgeSkeleton"})}catch(__react_docgen_typescript_loader_error){}const Badge=({className:_className,style:_style,appearance="neutral",theme="surface",count,...rest})=>(0,jsx_runtime.jsx)("div",{...rest,className:badge.classnames[theme][appearance],children:(0,jsx_runtime.jsx)(Text.x,{fontSize:"caption",lineHeight:"caption",color:"currentColor",children:count})});Badge.displayName="Badge",Badge.Skeleton=BadgeSkeleton,Badge.displayName="Badge",Badge.Skeleton.displayName="Badge.Skeleton";try{Badge.displayName="Badge",Badge.__docgenInfo={description:"",displayName:"Badge",props:{appearance:{defaultValue:{value:"neutral"},description:"Change the visual style of the badge.",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"success"'},{value:'"warning"'},{value:'"danger"'},{value:'"neutral"'}]}},count:{defaultValue:null,description:"Total items to be displayed without badge",name:"count",required:!0,type:{name:"string | number"}},theme:{defaultValue:{value:"surface"},description:"Change the color scheme of the badge.",name:"theme",required:!1,type:{name:"enum",value:[{value:'"light"'},{value:'"surface"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Badge/src/Badge.tsx#Badge"]={docgenInfo:Badge.__docgenInfo,name:"Badge",path:"packages/react/src/atomic/Badge/src/Badge.tsx#Badge"})}catch(__react_docgen_typescript_loader_error){}},'./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/badge/nimbus-badge.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA7WSMU/DMBCF9/wKj3S4qqWUQrozsTEwIsd2kgPHjmyHJEX978iGiLSBSkHJ6Pfu3neS3/Jlzeu02OgV+YgI4WhLSduYpFI0+4gQKjFTgE4UNiZMKCeMl18r6zBtgWnlhHJ9q0bu8pik6DrXq7nALHcxWS3vdlsjCq8VqOB7ui+XlHNUWUxW5J2aKwCFRVJZsCVlqDJYL/xUohuweAiDiTZcGEh08+WEl6EcKxufZeS0FHAyAWklZYiUqAR0h56seec5GJBo3gKjpUOtwlaqlfOXiLMdrz/hQfyxkdICZfvLzkMwwFJlF/voGC27H1qHH0ooe8uMrhQHpqU2ZwlBs1AaLKhpwYnGPeo6YC+MK1E5QyX8hJ+ir0egbcWYsHYq9GYEuqZG+YZMhL4ZgeZUZcJMRd6OIHdZE6Fv/4E+ybpIH/ayh97Nih72soe+mxU97GUPfT8retDLHpnOSh728vgJSolyem0GAAA="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js':(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._1dwfm3o0 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: 0.875rem;\n  min-width: 0.875rem;\n  padding: 0 var(--nimbus-spacing-1);\n  box-sizing: border-box;\n  border-radius: var(--nimbus-shape-border-radius-full);\n  line-height: var(--nimbus-lineWeight-body-caption);\n  font-size: var(--nimbus-fontSize-body-caption);\n  font-family: var(--nimbus-fontFamily-sans);\n}\n._1dwfm3o1 {\n  background-color: var(--nimbus-colors-primary-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o2 {\n  background-color: var(--nimbus-colors-success-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o3 {\n  background-color: var(--nimbus-colors-warning-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o4 {\n  background-color: var(--nimbus-colors-danger-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o5 {\n  background-color: var(--nimbus-colors-neutral-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o6 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-primary-textLow);\n}\n._1dwfm3o7 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-success-textLow);\n}\n._1dwfm3o8 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-warning-textLow);\n}\n._1dwfm3o9 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-danger-textLow);\n}\n._1dwfm3oa {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-neutral-textLow);\n}","",{version:3,sources:["webpack://./node_modules/@vanilla-extract/webpack-plugin/extracted.js"],names:[],mappings:"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,kCAAkC;EAClC,sBAAsB;EACtB,qDAAqD;EACrD,kDAAkD;EAClD,8CAA8C;EAC9C,0CAA0C;AAC5C;AACA;EACE,sDAAsD;EACtD,8CAA8C;AAChD;AACA;EACE,sDAAsD;EACtD,8CAA8C;AAChD;AACA;EACE,sDAAsD;EACtD,8CAA8C;AAChD;AACA;EACE,qDAAqD;EACrD,8CAA8C;AAChD;AACA;EACE,sDAAsD;EACtD,8CAA8C;AAChD;AACA;EACE,yDAAyD;EACzD,2CAA2C;AAC7C;AACA;EACE,yDAAyD;EACzD,2CAA2C;AAC7C;AACA;EACE,yDAAyD;EACzD,2CAA2C;AAC7C;AACA;EACE,yDAAyD;EACzD,0CAA0C;AAC5C;AACA;EACE,yDAAyD;EACzD,2CAA2C;AAC7C",sourcesContent:["._1dwfm3o0 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: 0.875rem;\n  min-width: 0.875rem;\n  padding: 0 var(--nimbus-spacing-1);\n  box-sizing: border-box;\n  border-radius: var(--nimbus-shape-border-radius-full);\n  line-height: var(--nimbus-lineWeight-body-caption);\n  font-size: var(--nimbus-fontSize-body-caption);\n  font-family: var(--nimbus-fontFamily-sans);\n}\n._1dwfm3o1 {\n  background-color: var(--nimbus-colors-primary-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o2 {\n  background-color: var(--nimbus-colors-success-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o3 {\n  background-color: var(--nimbus-colors-warning-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o4 {\n  background-color: var(--nimbus-colors-danger-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o5 {\n  background-color: var(--nimbus-colors-neutral-textLow);\n  color: var(--nimbus-colors-neutral-background);\n}\n._1dwfm3o6 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-primary-textLow);\n}\n._1dwfm3o7 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-success-textLow);\n}\n._1dwfm3o8 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-warning-textLow);\n}\n._1dwfm3o9 {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-danger-textLow);\n}\n._1dwfm3oa {\n  background-color: var(--nimbus-colors-neutral-background);\n  color: var(--nimbus-colors-neutral-textLow);\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);