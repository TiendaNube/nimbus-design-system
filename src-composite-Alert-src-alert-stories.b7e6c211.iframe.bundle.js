"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[246],{"./packages/react/src/composite/Alert/src/alert.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,danger:()=>danger,default:()=>__WEBPACK_DEFAULT_EXPORT__,neutral:()=>neutral,primary:()=>primary,stressed:()=>stressed,success:()=>success,variableContent:()=>variableContent,warning:()=>warning});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Button/src/Button.tsx"),_Alert__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/composite/Alert/src/Alert.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Alert",component:_Alert__WEBPACK_IMPORTED_MODULE_2__.b,argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{appearance:"neutral",title:"Alert title",children:"Alert content"}},neutral={args:{appearance:"neutral",title:"Alert title",children:"Alert content"}},primary={args:{appearance:"primary",title:"Alert title",children:"Alert content"}},success={args:{appearance:"success",title:"Alert title",children:"Alert content"}},warning={args:{appearance:"warning",title:"Alert title",children:"Alert content"}},danger={args:{appearance:"danger",title:"Alert title",children:"Alert content"}},stressed={args:{title:"Very long title with a lot of characters",children:"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse convallis, urna eu blandit iaculis, lacus ante faucibus dui, ut tempus velit lectus non nunc. Aenean."}},variableContent={args:{title:"Alert with components as children",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget.",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.x,{display:"flex",gap:"2",flexWrap:"wrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__.z,{children:"Primary action"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__.z,{children:"Secondary action"})]})]})}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "neutral",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...basic.parameters?.docs?.source}}},neutral.parameters={...neutral.parameters,docs:{...neutral.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "neutral",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...neutral.parameters?.docs?.source}}},primary.parameters={...primary.parameters,docs:{...primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "primary",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...primary.parameters?.docs?.source}}},success.parameters={...success.parameters,docs:{...success.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "success",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...success.parameters?.docs?.source}}},warning.parameters={...warning.parameters,docs:{...warning.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "warning",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...warning.parameters?.docs?.source}}},danger.parameters={...danger.parameters,docs:{...danger.parameters?.docs,source:{originalSource:'{\n  args: {\n    appearance: "danger",\n    title: "Alert title",\n    children: "Alert content"\n  }\n}',...danger.parameters?.docs?.source}}},stressed.parameters={...stressed.parameters,docs:{...stressed.parameters?.docs,source:{originalSource:'{\n  args: {\n    title: "Very long title with a lot of characters",\n    children: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse convallis, urna eu blandit iaculis, lacus ante faucibus dui, ut tempus velit lectus non nunc. Aenean."\n  }\n}',...stressed.parameters?.docs?.source}}},variableContent.parameters={...variableContent.parameters,docs:{...variableContent.parameters?.docs,source:{originalSource:'{\n  args: {\n    title: "Alert with components as children",\n    children: <>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget.\n        <Box display="flex" gap="2" flexWrap="wrap">\n          <Button>Primary action</Button>\n          <Button>Secondary action</Button>\n        </Box>\n      </>\n  }\n}',...variableContent.parameters?.docs?.source}}};const __namedExportsOrder=["basic","neutral","primary","success","warning","danger","stressed","variableContent"]},"./packages/core/typings/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>useRefObjectAsForwardedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useRefObjectAsForwardedRef(forwardedRef,refObject){(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(forwardedRef,(()=>refObject.current))}},"./packages/react/src/atomic/Button/src/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>Button});var nimbus_button_css_namespaceObject={};__webpack_require__.r(nimbus_button_css_namespaceObject),__webpack_require__.d(nimbus_button_css_namespaceObject,{appearance:()=>appearance});var react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./packages/core/typings/src/index.ts"),injectStylesIntoStyleTag=(__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WY246jRhCG7/MUSNFqb8wKaA7GucuuVhMpu4qyF7luoLDRNGA1MOPZVd49XRxsDtVAtEaWPfq/6sNfRdGekyzL2vjxi2GYZpHlUVOZcSlKWZlXmeVcvplVI1Mew8n4NQFIU/htm33Kzheh3rUKCngUp8FaUFbUIHlcZy84iWX5UXzcyT+VLyDbIBdCtjPoLwlVBUkbxiBw18JquNV/lq8t68Te6hTI4s5b2AI7pOCqiWM1/cTVFFJnBzt1NQ1i0tUhaO5qfAyinfzD1ZB5e4PGrgauu7q2saseY6SrY/buqh3aFgW/cllkxXnkKnqakLU6Y8euoqcBXwuauoqeWqsLIlxFT3cHPVxFT9fDHq6ip9ts7yp6SsMJL84gJ6YmQJs6RaeeBjyIV2LmlqrFkAWxxB+OqhjyDlrGjA3diBr7qVB7A73baWnsLKCpJRdmxOPnsyybAleRtq81fGQ/x2sH+ymreCTaXaYeXjtixjmL08ROSGuGoGnSoiBSXX4nP2SNW5xxf2fQI21HfkzCVX8xGSMHPPBtn6yocUCXaOYyj5Gta8wO7YjjNYHTsqg/8zwTb2YMhQoomkgZ9LH9/lV9Pxgmv14FmNVbVUN+MH4XWfH8hcff2r8/q/iD8XcZlXV5MN4/gXiBOou58RUaeH8wuMy4OBgVL1SDBJmli9m/Zd/BjMpELYBf66wsTob1IfAk5CtoxCtA7rgFXh5FYmvJOqvVBi/2yXC2GEeN80E/Z08xpJxNzEXM3ua8HYv3V+z4B9ABU8K5EVxVsju73UdMDknW5CfD0yNRKVSVzlu7qgq4A9NkEqua010+STPm6DijhMcjfJRWoqCWoEPkf0m1ud0znEuWypLz9m7E1zhUXXhSvpoCXkCY1skoygL0gLLDut7at91/Uu1wEuM8Ypwhpmu5h/tA9lTQD8ZO94FcajDr/wzmdoPZOJrt//RwXr82XBgjt7pjuCv2Hpmop6zk6m6qWsuJDFMoOr0sGopkdJ+kUJfoHxSnqUQK9cnipkirNVVTtws6bYQ4GaF6XW+b8PAUYPtsuHCRYmd7pydfs6S+dPmy/I0Vd6yzZ3Md2mbMJrohwW6mrMN0GbvyGA/NusLrZU2x9aquwHqZXGGvbSxLUzy9GtANdpCPRJcetBBb/YodFup6WfOkuOvKL6YVlR9sZWy1Z1crqj25+lhHLVsrrtxew+gdQd0kwwQdQRX8UAsdQdXuUA5d0ol1fP+jSOCmzFfbsGenhl5zUHNojaE2/3HYay5q89NMr3mozY8xveaj5tNagNr8dNNrR9SOtBaiFs60vMRDkDIJIOnbldpKXumhlFd4svFWoUrg4d/dhvB3i7+YMJLAn6+l+rVi3qr2iaeTc3XS8wNHD4gzJhWfl9oZVD+3VW5nRFNnAo+VcYMraC+Gj9Thv2///gclmjwq6BMAAA=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/button/nimbus-button.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA71WPZPbIBTs71eojAo88UcaXZvJXJEiMylSI/EkkSDQALKtZO6/B5AcIxvlZOy5zrPvLexbVpgVtFAW6mPy5ylJCFUtw32WlAyOzwbAjFYcUQ2NypICuAZp4Z+d0rTsUSEMwrVfqoFWtUE2q/Xmk4TGYgdKdG0WpfrEsKiGo0YECiGxpoJnCRccbKHopBIyS1pBT6vm4ogU/U15lZnfkoBEBrKVFhPi4D2WHxDitMk7hVSLC4OiTRrGd6nlVrid4a1dvTRi0WEcaNJnKz9cATVAaNe4fkY5oDrUbytjfy5Ij3Ks4LyFmQwCG3w3cKi9xA1lfYDwxRWQPQyJeZcPnEIw6+ak22EKcehMJ0P2KL6KQzpY7eyV2IylLu2pcWsleR3GYo81nvQ8yTWM9o6Q0j0z4yvBKPHgBbJdPHCh6X6Y1E6t6BAmzNiU2whbMCcMQIyFSqcJGFufn16fVuM3kJn845wBcR/DQt8+j5zUjy4XGhkF4gBkskEpik651V2ia0zE4WKLTlNmj9M0ph53PbBw8auSouMkLKyVtMGyv3LmbU/nmAtcOIuaCM5qsQcZK/vFkuO1n+ienKEQq+ebBKXGU45SdF7A0zQJ3FuqTn6rTpa4gEnwlksa2S/mMmL2QpoK8gP6CNs3iyYjmFf2JhikLRxoJEUE9nzdnXXekNapWt/IONnXpt2S1RkbYoQEIrp5z4jOG+vpuSWhQW/+rbWNGWnhKHN/UXHp3AbTuWT/yJAG5F+ldBtOaYwrUYICad2+Z1r/Y7En6M4L1V9sdzWUe/C0WI4v6ukOF8W45O3uTd4DA7eLD9zjPoNA6nb3vxvjDvX1L04rCGu9DQAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var appearance={primary:"epefcs1 epefcs0",danger:"epefcs2 epefcs0",neutral:"epefcs3 epefcs0",transparent:"epefcs4 epefcs0"};const button_button={classnames:{...nimbus_button_css_namespaceObject}};var Skeleton=__webpack_require__("./packages/react/src/atomic/Skeleton/src/Skeleton.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ButtonSkeleton=({width,"data-testid":dataTestId})=>(0,jsx_runtime.jsx)(Skeleton.O,{width:width??"4.75rem",height:"2.125rem",borderRadius:"0.5rem","data-testid":dataTestId});ButtonSkeleton.displayName="ButtonSkeleton";try{ButtonSkeleton.displayName="ButtonSkeleton",ButtonSkeleton.__docgenInfo={description:"",displayName:"ButtonSkeleton",props:{width:{defaultValue:null,description:"Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.",name:"width",required:!1,type:{name:"string"}},"data-testid":{defaultValue:null,description:"This is an attribute used to identify a DOM node for testing purposes.",name:"data-testid",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Button/src/components/ButtonSkeleton/ButtonSkeleton.tsx#ButtonSkeleton"]={docgenInfo:ButtonSkeleton.__docgenInfo,name:"ButtonSkeleton",path:"packages/react/src/atomic/Button/src/components/ButtonSkeleton/ButtonSkeleton.tsx#ButtonSkeleton"})}catch(__react_docgen_typescript_loader_error){}const Button=(0,react.forwardRef)((({className:_className,style:_style,as:As="button",children,...props},ref)=>{const{appearance="neutral",...rest}=props,innerRef=(0,react.useRef)(null);return(0,src.z)(ref,innerRef),(0,react.useImperativeHandle)(ref,(()=>innerRef?.current)),(0,react.useEffect)((()=>{!innerRef.current||innerRef.current instanceof HTMLAnchorElement||innerRef.current instanceof HTMLButtonElement||console.error("Error: Found `Button` component that renders an inaccessible element",innerRef.current,"Please ensure `Button` always renders as <a> or <button>")}),[innerRef]),(0,jsx_runtime.jsx)(As,{...rest,className:button_button.classnames.appearance[appearance],ref:innerRef,children})}));Button.Skeleton=ButtonSkeleton,Button.displayName="Button",Button.Skeleton.displayName="Button.Skeleton";try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{as:{defaultValue:null,description:"",name:"as",required:!0,type:{name:'"symbol" | "object" | "slot" | "style" | "title" | ComponentClass<unknown, any> | FunctionComponent<unknown> | "article" | "button" | "dialog" | "figure" | ... 166 more ... | "view"'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Button/src/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"packages/react/src/atomic/Button/src/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}}}]);