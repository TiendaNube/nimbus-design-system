"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[3109],{"./packages/react/src/atomic/Popover/src/popover.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,bottom:()=>bottom,default:()=>__WEBPACK_DEFAULT_EXPORT__,left:()=>left,right:()=>right,top:()=>top});__webpack_require__("./node_modules/react/index.js");var _nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_Popover__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/src/atomic/Popover/src/Popover.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Atomic/Popover",component:_Popover__WEBPACK_IMPORTED_MODULE_2__.J,render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_3__.x,{display:"flex",justifyContent:"center",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Popover__WEBPACK_IMPORTED_MODULE_2__.J,{...args,onVisibility:void 0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{children:"Click-Hover"})})}),argTypes:{children:{control:{disable:!0}},content:{control:{disable:!0}}},tags:["autodocs"]},basic={args:{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{color:"primary-textLow",children:"Replace me with your content"})}},top={args:{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{color:"primary-textLow",children:"Replace me with your content"}),position:"top",enabledHover:!0,enabledDismiss:!1}},bottom={args:{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{color:"primary-textLow",children:"Replace me with your content"}),position:"bottom",enabledHover:!0,enabledDismiss:!1}},right={args:{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{color:"primary-textLow",children:"Replace me with your content"}),position:"right",enabledHover:!0,enabledDismiss:!1}},left={args:{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_4__.x,{color:"primary-textLow",children:"Replace me with your content"}),position:"left",enabledHover:!0,enabledDismiss:!1}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: <Text color="primary-textLow">Replace me with your content</Text>\n  }\n}',...basic.parameters?.docs?.source}}},top.parameters={...top.parameters,docs:{...top.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: <Text color="primary-textLow">Replace me with your content</Text>,\n    position: "top",\n    enabledHover: true,\n    enabledDismiss: false\n  }\n}',...top.parameters?.docs?.source}}},bottom.parameters={...bottom.parameters,docs:{...bottom.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: <Text color="primary-textLow">Replace me with your content</Text>,\n    position: "bottom",\n    enabledHover: true,\n    enabledDismiss: false\n  }\n}',...bottom.parameters?.docs?.source}}},right.parameters={...right.parameters,docs:{...right.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: <Text color="primary-textLow">Replace me with your content</Text>,\n    position: "right",\n    enabledHover: true,\n    enabledDismiss: false\n  }\n}',...right.parameters?.docs?.source}}},left.parameters={...left.parameters,docs:{...left.parameters?.docs,source:{originalSource:'{\n  args: {\n    content: <Text color="primary-textLow">Replace me with your content</Text>,\n    position: "left",\n    enabledHover: true,\n    enabledDismiss: false\n  }\n}',...left.parameters?.docs?.source}}};const __namedExportsOrder=["basic","top","bottom","right","left"]},"./packages/core/styles/src/components/ThemeProvider/hooks/useTheme/useTheme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>useTheme});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/ThemeProviderContext.tsx");const useTheme=()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts__WEBPACK_IMPORTED_MODULE_1__.G)},"./packages/react/src/atomic/Popover/src/Popover.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>Popover});var react=__webpack_require__("./node_modules/react/index.js"),floating_ui_core=__webpack_require__("./node_modules/@floating-ui/core/dist/floating-ui.core.mjs"),floating_ui_react_dom=__webpack_require__("./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs"),floating_ui_react=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs"),floating_ui_dom=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),injectStylesIntoStyleTag=(__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA6WYTY/bNhCG7/0VAoogFyvQt2z3VhTpFmiCojn0TEkjW1hKNEhp15sg/z0cfdiSPJRUxMJi13ifGZLvjChqj1KI2vr2i2XZdlWUSaPsVHAhlX2RRcnkm60ambMUjtavGUCew2/r7FNxOnP9U+ugmCVpHi8FFVUNkqV18YKDOE6UpPuN/JN4AdkGBXDwNwb9I0EpyNowH+JgKayGa/23eG1ZLw0Xh0AWV97CDrgHClZNmurhJ67mkHsb2KmreZySrg5Bc1fTfZxs5O+uHvxwa9DY1TgIFuc2djX0fdLVMXtz1T24DgW/MlkV1WnkKnqakb06Y8euoqcxWwqauoqeOosTIlxFTzcH3V1FT5fD7q6ip+ts7yp6SsMZq04gJ6ZmQJs6RaeexixOF2LmlurJkA3xiN8d1THkHfQYMzZ0JWrsp0bdFfRmp2Ows4KmlozbCUufT1I0Fc4ibz9L+Mh+htcG9o9CsYS3q8xDvDbEjGuW5pmbkdYMQdOiJXGid/mN/FA15jCfRRuD7mXbs312WPQXizFyIITIjciOGgd0hfYDP/TJrWvMDtsRw2sC56KqP7Ky4PpRyCp1tP6EQtU7y2aXCwdbvakayp31Oy+q508s/dJ+/6iDdta/IhG12Fnvn4C/QF2kzPoMDbzfWUwWjO8sTGgrkEVuGrIUleiHtD7pv3WyLmv7TWdCQF10sR8yfCm+gp2I7M1O2aUuRHW0nA9xKKFcQBOmALn9Gni+95ZrJOui1had3aPlrTGezvPBPGZP+Uh5q1iAmLvOhRsmHy3Y8R+gA7aEU8OZvgGC2S4xYkrIiqY8WqEZSQTXzR3NAN1XcAOmxSRmNae7epJmzNFxRQmPR/iorERDPYIeUf9Hqq3tlnQB2SqPXLh1IZHBIXVmmXi1ObwAt52jVYkKzIC2w7lc2x+3/03topMY7x7jDTHdTr27JXKngjmZf7wlCqhkzv9JFnTJXMzmRj+dLuznhhPzyaVuSHfBvUdm+uEsmb6bVGs5UWEKRacfm4YifXqfpNCA2D8oztCJFBqRzU2RTmuqoW8f6Lzh/Ggd9OdyXYWHp4C/zYYz4znubO/M5GuR1eeuXk60MuOO9bYsrkPbirnEbkiwqyXrMFPF9JMWz9qmxutlQ7P1qqnBepmcYa+tTMvQPL0a0xvsIO+JXXrQDrjVL9jhoG6WDU+Km6798o2i9sNfyK3XHBhFvabAHOvpaRvFhdtryN4R1E0yDNARVMMPvdARVO8O7dAVnZjH17+qDK7afL0Md3Zq6DUPNY/WfNTm75S9FqA2P830Woja/BjTaxFq8xNMr8Wozd93e22P2p7WDqgdZlop8BCkTQLI+u1KL6VUZihnCk824SKkOL4zBOsQvu5EDwMmEtjzReiXHPuq2ieeSS7xpBd7ZoCfsKj4vDSOoPdzV9d2RjR1wfFYmTY4g/by8ZE6/NPu+w//0V65HxQAAA=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/popover/nimbus-popover.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA7WW35KiOhCH7/cpuJypOkwB/ndv9nLPU5wKJEAUEiYBRU/tu29wtHbGNKShliq1NPT3I2Jjf2//hUzq1aoJvP+/eR7luirIZe+lBWu/m4VDo2ueXvxEipqJeu8l5pWp7hApeCZ8XrNSf14uufBzxrPcFEeKld1aygtzdO9RJStf54TK80tQtV73jMxTZTF5Cf7x7o+36PW1w2LZ+ppfucj25r2iTPlm6ePI7ZMilDfm7CeiXnxf8DJudJdfMf9LhR/d8mpFhOY1l2LvyYokvL58RUvZHfR1xRj1U6LrV48RzTr26nNBWft0ruu/3aK/DQJzgl/ffpSMcuLpRDEmPCKo99JdjjOndb7vvu3r7Sq/PS766vbR8+4FH9GPg+Ftz78+19N7fUlaH2R2NlPcmcdv8hXIbaC6AzFJjpmSjaDm1y+kevrqtzXtV4qXRF183aiUJOynOUnRncjOrSfl8q6vSFLzE/spT0zZue2oXN0kCdMasd8wHBVMichMwyFyV6NyBWtM3xaY4N2o4DNRwtxamGA6acd/qoHI/B5ZEUpvN/jXe7i7O83elgBZoMgIIKtnMrBrHl36V1o+bPFp7kaPQncavr2jlTsN3dPRzh2Gb+SIutPw3Rvl+L0NtWz0aLzBURDeRsEzWmHQCERrDLoA0RaDLiF0EWLQFYiuMOgaRHcYdAOiFINuQTTHoDsQfbREd8OmhTwblmseF8wurazSnFPKhF1ZW5VGKGRR2JWtVUmaWn7UuWxkvYksH1kP+Qjwj8pcPkJsphz0EW4D7zP5SDOTj1zm8pFoJh9ZT5ruiGAyl4+wSTse9BE+2UdKFAn5yPszCfhI4x5eI3zkgk9D+EjkThvhI2t3Gt5HCH7mI9KYO22Ej3D83gZ9pMTMLdhH3jEo7CMNBoV95IJBYR+JMCjsI2sMCvsIwaCwjzAMCvsIx6Cwj5SWEPT6yLtV2ucjjVXZ5yMXqxLvI2EQLS0h2QwJycK+AKlLSGKbEYNCcrABNZOQnGYSkutcQrKYSUg2k8Y7IjieS0jSSTseFJLDZCERKBISEvVMAkJyck+vEUJyxachhGThThshJBt3Gl5IYvzQR6Sl7rQRQnLA721QSARmcMFCojAoLCQnDAoLyRWDwkKywKCwkGwwKCwkMQaFhSTFoLCQHDAoLCTCMoJeIVFWaZ+QnKzKPiG5WpUjhMS0myUk2yEhAf6MM5eQJDYjB4XkaAN6JiE5zyQkYTCXkSxnMpLtpPmOCE7mMpJs0o4HjeQ42UgkioSMRD+TgJGc3eML3/NRgE9DGMnSnTbCSLbuNLyRJPipj0jL3GkjjOSI39ugkUjM5IKNRGNQ2EjOGBQ0kkWAQWEjWWJQ2Ei2GBQ2kgSDwkaSYVDYSI4YFDYSaSlBr5Foq7TPSM5WZY+RLAOr8pOR/AZs7ICqjiMAAA=="}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;var x,createRuntimeFn_0cf1d875_esm=__webpack_require__("./node_modules/rainbow-sprinkles/dist/createRuntimeFn-0cf1d875.esm.js");const popover={classnames:{content:"_1eos55u0"},...((x={sprinkle:(0,createRuntimeFn_0cf1d875_esm.c)(function(){var x={config:{width:{dynamic:{default:"_1eos55u5",conditions:{xs:"_1eos55u5",md:"_1eos55u6",lg:"_1eos55u7",xl:"_1eos55u8"}},name:"width",vars:{conditions:{xs:"var(--_1eos55u1)",md:"var(--_1eos55u2)",lg:"var(--_1eos55u3)",xl:"var(--_1eos55u4)"},default:"var(--_1eos55u1)"},dynamicScale:!0},maxWidth:{dynamic:{default:"_1eos55ud",conditions:{xs:"_1eos55ud",md:"_1eos55ue",lg:"_1eos55uf",xl:"_1eos55ug"}},name:"maxWidth",vars:{conditions:{xs:"var(--_1eos55u9)",md:"var(--_1eos55ua)",lg:"var(--_1eos55ub)",xl:"var(--_1eos55uc)"},default:"var(--_1eos55u9)"},dynamicScale:!0},height:{dynamic:{default:"_1eos55ul",conditions:{xs:"_1eos55ul",md:"_1eos55um",lg:"_1eos55un",xl:"_1eos55uo"}},name:"height",vars:{conditions:{xs:"var(--_1eos55uh)",md:"var(--_1eos55ui)",lg:"var(--_1eos55uj)",xl:"var(--_1eos55uk)"},default:"var(--_1eos55uh)"},dynamicScale:!0},backgroundColor:{values:{"primary-surfaceHighlight":{conditions:{xs:"_1eos55up",md:"_1eos55uq",lg:"_1eos55ur",xl:"_1eos55us"},default:"_1eos55up"},"primary-interactiveHover":{conditions:{xs:"_1eos55ut",md:"_1eos55uu",lg:"_1eos55uv",xl:"_1eos55uw"},default:"_1eos55ut"},"success-surfaceHighlight":{conditions:{xs:"_1eos55ux",md:"_1eos55uy",lg:"_1eos55uz",xl:"_1eos55u10"},default:"_1eos55ux"},"danger-surfaceHighlight":{conditions:{xs:"_1eos55u11",md:"_1eos55u12",lg:"_1eos55u13",xl:"_1eos55u14"},default:"_1eos55u11"},"neutral-surfaceHighlight":{conditions:{xs:"_1eos55u15",md:"_1eos55u16",lg:"_1eos55u17",xl:"_1eos55u18"},default:"_1eos55u15"},"warning-surfaceHighlight":{conditions:{xs:"_1eos55u19",md:"_1eos55u1a",lg:"_1eos55u1b",xl:"_1eos55u1c"},default:"_1eos55u19"},"neutral-background":{conditions:{xs:"_1eos55u1d",md:"_1eos55u1e",lg:"_1eos55u1f",xl:"_1eos55u1g"},default:"_1eos55u1d"}},name:"backgroundColor",staticScale:{"primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)","primary-interactiveHover":"var(--nimbus-colors-primary-interactiveHover)","success-surfaceHighlight":"var(--nimbus-colors-success-surfaceHighlight)","danger-surfaceHighlight":"var(--nimbus-colors-danger-surfaceHighlight)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)","warning-surfaceHighlight":"var(--nimbus-colors-warning-surfaceHighlight)","neutral-background":"var(--nimbus-colors-neutral-background)"}},padding:{values:{base:{conditions:{xs:"_1eos55u1h",md:"_1eos55u1i",lg:"_1eos55u1j",xl:"_1eos55u1k"},default:"_1eos55u1h"},small:{conditions:{xs:"_1eos55u1l",md:"_1eos55u1m",lg:"_1eos55u1n",xl:"_1eos55u1o"},default:"_1eos55u1l"},none:{conditions:{xs:"_1eos55u1p",md:"_1eos55u1q",lg:"_1eos55u1r",xl:"_1eos55u1s"},default:"_1eos55u1p"}},name:"padding",staticScale:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"}},color:{values:{"primary-surfaceHighlight":{conditions:{xs:"_1eos55u1t",md:"_1eos55u1u",lg:"_1eos55u1v",xl:"_1eos55u1w"},default:"_1eos55u1t"},"primary-interactiveHover":{conditions:{xs:"_1eos55u1x",md:"_1eos55u1y",lg:"_1eos55u1z",xl:"_1eos55u20"},default:"_1eos55u1x"},"success-surfaceHighlight":{conditions:{xs:"_1eos55u21",md:"_1eos55u22",lg:"_1eos55u23",xl:"_1eos55u24"},default:"_1eos55u21"},"danger-surfaceHighlight":{conditions:{xs:"_1eos55u25",md:"_1eos55u26",lg:"_1eos55u27",xl:"_1eos55u28"},default:"_1eos55u25"},"neutral-surfaceHighlight":{conditions:{xs:"_1eos55u29",md:"_1eos55u2a",lg:"_1eos55u2b",xl:"_1eos55u2c"},default:"_1eos55u29"},"warning-surfaceHighlight":{conditions:{xs:"_1eos55u2d",md:"_1eos55u2e",lg:"_1eos55u2f",xl:"_1eos55u2g"},default:"_1eos55u2d"},"neutral-background":{conditions:{xs:"_1eos55u2h",md:"_1eos55u2i",lg:"_1eos55u2j",xl:"_1eos55u2k"},default:"_1eos55u2h"}},name:"color",staticScale:void 0},zIndex:{values:{100:{conditions:{xs:"_1eos55u2l",md:"_1eos55u2m",lg:"_1eos55u2n",xl:"_1eos55u2o"},default:"_1eos55u2l"},200:{conditions:{xs:"_1eos55u2p",md:"_1eos55u2q",lg:"_1eos55u2r",xl:"_1eos55u2s"},default:"_1eos55u2p"},300:{conditions:{xs:"_1eos55u2t",md:"_1eos55u2u",lg:"_1eos55u2v",xl:"_1eos55u2w"},default:"_1eos55u2t"},400:{conditions:{xs:"_1eos55u2x",md:"_1eos55u2y",lg:"_1eos55u2z",xl:"_1eos55u30"},default:"_1eos55u2x"},500:{conditions:{xs:"_1eos55u31",md:"_1eos55u32",lg:"_1eos55u33",xl:"_1eos55u34"},default:"_1eos55u31"},600:{conditions:{xs:"_1eos55u35",md:"_1eos55u36",lg:"_1eos55u37",xl:"_1eos55u38"},default:"_1eos55u35"},700:{conditions:{xs:"_1eos55u39",md:"_1eos55u3a",lg:"_1eos55u3b",xl:"_1eos55u3c"},default:"_1eos55u39"},800:{conditions:{xs:"_1eos55u3d",md:"_1eos55u3e",lg:"_1eos55u3f",xl:"_1eos55u3g"},default:"_1eos55u3d"},900:{conditions:{xs:"_1eos55u3h",md:"_1eos55u3i",lg:"_1eos55u3j",xl:"_1eos55u3k"},default:"_1eos55u3h"}},name:"zIndex",staticScale:{100:"var(--nimbus-zIndex-100)",200:"var(--nimbus-zIndex-200)",300:"var(--nimbus-zIndex-300)",400:"var(--nimbus-zIndex-400)",500:"var(--nimbus-zIndex-500)",600:"var(--nimbus-zIndex-600)",700:"var(--nimbus-zIndex-700)",800:"var(--nimbus-zIndex-800)",900:"var(--nimbus-zIndex-900)"}},overflow:{values:{visible:{conditions:{xs:"_1eos55u3l",md:"_1eos55u3m",lg:"_1eos55u3n",xl:"_1eos55u3o"},default:"_1eos55u3l"},hidden:{conditions:{xs:"_1eos55u3p",md:"_1eos55u3q",lg:"_1eos55u3r",xl:"_1eos55u3s"},default:"_1eos55u3p"},scroll:{conditions:{xs:"_1eos55u3t",md:"_1eos55u3u",lg:"_1eos55u3v",xl:"_1eos55u3w"},default:"_1eos55u3t"},auto:{conditions:{xs:"_1eos55u3x",md:"_1eos55u3y",lg:"_1eos55u3z",xl:"_1eos55u40"},default:"_1eos55u3x"}},name:"overflow",staticScale:{visible:"visible",hidden:"hidden",scroll:"scroll",auto:"auto"}}}};return x.config.color.staticScale=x.config.backgroundColor.staticScale,x}()),properties:{backgroundColor:{"primary-surfaceHighlight":"var(--nimbus-colors-primary-surfaceHighlight)","primary-interactiveHover":"var(--nimbus-colors-primary-interactiveHover)","success-surfaceHighlight":"var(--nimbus-colors-success-surfaceHighlight)","danger-surfaceHighlight":"var(--nimbus-colors-danger-surfaceHighlight)","neutral-surfaceHighlight":"var(--nimbus-colors-neutral-surfaceHighlight)","warning-surfaceHighlight":"var(--nimbus-colors-warning-surfaceHighlight)","neutral-background":"var(--nimbus-colors-neutral-background)"},color:void 0,padding:{base:"var(--nimbus-spacing-4)",small:"var(--nimbus-spacing-2)",none:"0"},zIndex:{100:"var(--nimbus-zIndex-100)",200:"var(--nimbus-zIndex-200)",300:"var(--nimbus-zIndex-300)",400:"var(--nimbus-zIndex-400)",500:"var(--nimbus-zIndex-500)",600:"var(--nimbus-zIndex-600)",700:"var(--nimbus-zIndex-700)",800:"var(--nimbus-zIndex-800)",900:"var(--nimbus-zIndex-900)"},overflow:["visible","hidden","scroll","auto"]}}).properties.color=x.properties.backgroundColor,x)};var useTheme=__webpack_require__("./packages/core/styles/src/components/ThemeProvider/hooks/useTheme/useTheme.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Popover=({className:_className,style:_style,visible,onVisibility,backgroundColor="neutral-background",position="bottom",padding="base",width="fit-content",arrow=!0,offset=10,enabledHover=!1,enabledDismiss=!0,enabledClick=!0,matchReferenceWidth=!1,children,content,...rest})=>{const{className,style,otherProps}=popover.sprinkle({...rest,width,padding,backgroundColor,color:backgroundColor}),arrowRef=(0,react.useRef)(null),[isVisible,setVisibility]=(0,react.useState)(!1),open=(0,react.useMemo)((()=>void 0===visible?isVisible:visible),[visible,isVisible]),middlewares=[(0,floating_ui_core.cv)(offset),(0,floating_ui_react_dom.x7)({element:arrowRef}),(0,floating_ui_core.uY)(),(0,floating_ui_core.RR)({crossAxis:position.includes("-"),fallbackAxisSideDirection:"end",padding:5}),matchReferenceWidth&&(0,floating_ui_core.dp)({apply({rects,elements}){Object.assign(elements.floating.style,{width:`${rects.reference.width}px`})}})].filter((middleware=>!1!==middleware)),{refThemeProvider}=(0,useTheme.F)(),{context,floatingStyles}=(0,floating_ui_react.YF)({open,placement:position,strategy:"fixed",middleware:middlewares,whileElementsMounted:floating_ui_dom.Me,onOpenChange:void 0!==onVisibility?onVisibility:setVisibility}),{getReferenceProps,getFloatingProps}=(0,floating_ui_react.NI)([(0,floating_ui_react.XI)(context,{enabled:enabledHover,restMs:50,delay:{close:100},handleClose:(0,floating_ui_react.xp)({buffer:1})}),(0,floating_ui_react.eS)(context,{enabled:enabledClick}),(0,floating_ui_react.bQ)(context,{enabled:enabledDismiss})]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{"data-testid":"popover-container",ref:context.refs.setReference,...getReferenceProps(),children:"function"==typeof children?children({open,setVisibility}):children}),(0,jsx_runtime.jsx)(floating_ui_react.ll,{id:"nimbus-popover-floating",root:refThemeProvider?.current,children:open&&(0,jsx_runtime.jsxs)("div",{...otherProps,ref:context.refs.setFloating,className:[popover.classnames.content,className].join(" "),style:{...style,...floatingStyles},...getFloatingProps(),children:[content,arrow&&(0,jsx_runtime.jsx)(floating_ui_react.Y$,{"data-testid":"arrow-element",ref:arrowRef,context,fill:"currentColor"})]})})]})};Popover.displayName="Popover";try{Popover.displayName="Popover",Popover.__docgenInfo={description:"",displayName:"Popover",props:{children:{defaultValue:null,description:"An HTML element, or a function that returns one. It's used to set the position of the popover.\n@TJS-type React.ReactNode | ((data: { open: boolean, setVisibility: (visibility: boolean) => void }) => React.ReactNode);",name:"children",required:!0,type:{name:"ReactNode | ((data: { open: boolean; setVisibility: (visibility: boolean) => void; }) => ReactNode)"}},content:{defaultValue:null,description:"The content of the popover.\n@TJS-type React.ReactNode",name:"content",required:!0,type:{name:"ReactNode"}},visible:{defaultValue:null,description:"If true, the component is shown.",name:"visible",required:!1,type:{name:"boolean"}},onVisibility:{defaultValue:null,description:"Function to control popover opening and closing.\n@TJS-type (visible: boolean) => void;",name:"onVisibility",required:!1,type:{name:"((visible: boolean) => void)"}},arrow:{defaultValue:{value:"true"},description:"Conditional for displaying the popover arrow.",name:"arrow",required:!1,type:{name:"boolean"}},matchReferenceWidth:{defaultValue:{value:"false"},description:"A common feature of select dropdowns is that the dropdown matches the width of the reference regardless of its contents.",name:"matchReferenceWidth",required:!1,type:{name:"boolean"}},position:{defaultValue:{value:"bottom"},description:"Position of the popover.",name:"position",required:!1,type:{name:"enum",value:[{value:'"right"'},{value:'"left"'},{value:'"bottom"'},{value:'"top"'},{value:'"bottom-start"'},{value:'"bottom-end"'},{value:'"left-start"'},{value:'"left-end"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"top-start"'},{value:'"top-end"'}]}},enabledHover:{defaultValue:{value:"false"},description:"Adds hover event listeners that change the open state, like CSS :hover.",name:"enabledHover",required:!1,type:{name:"boolean"}},enabledClick:{defaultValue:{value:"true"},description:"Adds click event listeners that change the open state.",name:"enabledClick",required:!1,type:{name:"boolean"}},enabledDismiss:{defaultValue:{value:"true"},description:"Adds listeners that dismiss (close) the floating element.",name:"enabledDismiss",required:!1,type:{name:"boolean"}},offset:{defaultValue:{value:"10"},description:"Offest displaces the floating element from its core placement along the specified axes.",name:"offset",required:!1,type:{name:"number"}},width:{defaultValue:{value:"fit-content"},description:"The width property specifies the width of a popover's content area.",name:"width",required:!1,type:{name:"string | Conditions<string>"}},maxWidth:{defaultValue:null,description:"The maxWidth property specifies the maximum width of a popover's content area.",name:"maxWidth",required:!1,type:{name:"string | Conditions<string>"}},height:{defaultValue:null,description:"The height property specifies the height of a popover's content area.",name:"height",required:!1,type:{name:"string | Conditions<string>"}},zIndex:{defaultValue:null,description:"The zIndex property specifies the stack order of the popover.",name:"zIndex",required:!1,type:{name:'"100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | Conditions<"100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">'}},backgroundColor:{defaultValue:{value:"neutral-background"},description:'The backgroundColor property sets the background color of the popover.\n@examples ["neutral-interactive", { xs: "neutral-surface", md: "neutral-interactive" }]',name:"backgroundColor",required:!1,type:{name:'"primary-surfaceHighlight" | "success-surfaceHighlight" | "danger-surfaceHighlight" | "warning-surfaceHighlight" | "neutral-background" | "neutral-surfaceHighlight" | "primary-interactiveHover" | Conditions<...>'}},color:{defaultValue:{value:"neutral-background"},description:"The color property is used to set the color of the popover.",name:"color",required:!1,type:{name:'"primary-surfaceHighlight" | "success-surfaceHighlight" | "danger-surfaceHighlight" | "warning-surfaceHighlight" | "neutral-background" | "neutral-surfaceHighlight" | "primary-interactiveHover" | (Conditions<...> & string)'}},padding:{defaultValue:{value:"base"},description:"The padding properties are used to generate space around an popover's content area.",name:"padding",required:!1,type:{name:'"none" | "small" | "base" | Conditions<"none" | "small" | "base">'}},overflow:{defaultValue:null,description:"The overflow shorthand property sets the desired behavior for an popover's content overflow.",name:"overflow",required:!1,type:{name:"Overflow | Conditions<Overflow>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Popover/src/Popover.tsx#Popover"]={docgenInfo:Popover.__docgenInfo,name:"Popover",path:"packages/react/src/atomic/Popover/src/Popover.tsx#Popover"})}catch(__react_docgen_typescript_loader_error){}}}]);