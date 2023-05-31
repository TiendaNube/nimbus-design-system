"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[6953],{"./packages/react/src/atomic/Title/src/Title.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>Title});__webpack_require__("./node_modules/react/index.js"),__webpack_require__('packages/core/styles/src/themes/globals.css.ts.vanilla.css!=!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/themes/globals.css.ts.vanilla.css","source":"#H4sIAAAAAAAAA52Xz27bMAzG73sKA8PQi1Poj23Z3W0Dhl3Ww/YAg2zLadrETmOnTTrs3UeqawdRFAosRhDkR5n6ROujkqvDNC3Zr3dZtlr9lNKsC1WIq+x979wwuI8Bl8CNbbvBhFwBF6Jquzrk2vPCNTrkhefamSLkpeeqK8n4ynPhZBNy43UOblAhr73OwXREZ+PzdLVpQ249b3RJeOu5KQqSp/O81Jro7D2XjRQhd8BRZU/qOSAHlcaGfA0cVQqS5wY4qqR8g+sFlZTfAkeVlN8BR5WUb73O3lGdO6/TWNOFfPQ6IQ2pw+R1AifPZe91xvze6wQuQ37wOkWkc0Y9/hXyBbnFK+RH4M642pH984D6h172RM8j8Na0sNNDfgJuhdW2CvkZeG3rviE6n3BdrpIVqY9Eg+lCl5psLIkOExYvEgCLfXbjcrDXx9bl2cru91u3ms/z4nZ59mm7Ge++2e6H//5lGpc8+z610zLl2cVXt31wy6az2bU7uos8s4eN3ebZbMd5NbvDhlRRgm3FpSkPbkcCBQZqLgLOlTEF36qYgmvlJZOjRq6YQIMByUUsO22blAnGLehmkuDaMoJg2chOckgmXicl3qRWBaZVbJVv2ardYR5u+DZRzl1q4jGpFXw7TiNt+uBasT/5t/z7ybpD3v8bqF4GPtsrf71bhgGS4XD1enfBZRBvZpifM0hMIav/y7H8VYESNLuSt3MccatwNX7AAMMfU6Y7sXv8nHq6T/x2UALzc09dQc9p4LU/Ea7wDs1IUhod84FA3xxExc1QJueufISzlDLculWqSagmUXBl+YKrNlFw1bET96mJXaLgQ8Kwas35W91gO+Dy+z7B8NtE/1DQKXRMoU1oLg20iSKm0CMKbjR0CIbuk8/3PrmH0OqX7G6ZU11WLanOpcBukrZrBVZTEQSfRb+H1Ik5F9SZORcU2KuiUAvmsNBgqzqC4KkmgtpL2s0Eg6FkGWMwU8HgyguLsPG9jEAwUWVUhPGcFdj1CMdTFgoZcXSQvzS2wZc/Br//AMHNpOFSDAAA"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js');var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),webpack_plugin_extracted=__webpack_require__('./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./node_modules/@vanilla-extract/webpack-plugin/virtualFileLoader/dist/vanilla-extract-webpack-plugin-virtualFileLoader.cjs.js?{"fileName":"packages/core/styles/src/packages/atomic/title/nimbus-title.css.ts.vanilla.css","source":"#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"}!./node_modules/@vanilla-extract/webpack-plugin/extracted.js'),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(webpack_plugin_extracted.Z,options);webpack_plugin_extracted.Z&&webpack_plugin_extracted.Z.locals&&webpack_plugin_extracted.Z.locals;const title={classnames:{...{base:"_170iuyo0",appearance:{h1:"_170iuyo1 _170iuyo0",h2:"_170iuyo2 _170iuyo0",h3:"_170iuyo3 _170iuyo0",h4:"_170iuyo4 _170iuyo0",h5:"_170iuyo5 _170iuyo0",h6:"_170iuyo6 _170iuyo0"}}},...{sprinkle:(0,__webpack_require__("./node_modules/@vanilla-extract/sprinkles/createRuntimeSprinkles/dist/vanilla-extract-sprinkles-createRuntimeSprinkles.esm.js").$)({conditions:{defaultCondition:"xs",conditionNames:["xs","md","lg","xl"],responsiveArray:void 0},styles:{color:{values:{"primary-textHigh":{conditions:{xs:"_170iuyo7",md:"_170iuyo8",lg:"_170iuyo9",xl:"_170iuyoa"},defaultClass:"_170iuyo7"},"primary-textLow":{conditions:{xs:"_170iuyob",md:"_170iuyoc",lg:"_170iuyod",xl:"_170iuyoe"},defaultClass:"_170iuyob"},"success-textHigh":{conditions:{xs:"_170iuyof",md:"_170iuyog",lg:"_170iuyoh",xl:"_170iuyoi"},defaultClass:"_170iuyof"},"success-textLow":{conditions:{xs:"_170iuyoj",md:"_170iuyok",lg:"_170iuyol",xl:"_170iuyom"},defaultClass:"_170iuyoj"},"warning-textHigh":{conditions:{xs:"_170iuyon",md:"_170iuyoo",lg:"_170iuyop",xl:"_170iuyoq"},defaultClass:"_170iuyon"},"warning-textLow":{conditions:{xs:"_170iuyor",md:"_170iuyos",lg:"_170iuyot",xl:"_170iuyou"},defaultClass:"_170iuyor"},"danger-textHigh":{conditions:{xs:"_170iuyov",md:"_170iuyow",lg:"_170iuyox",xl:"_170iuyoy"},defaultClass:"_170iuyov"},"danger-textLow":{conditions:{xs:"_170iuyoz",md:"_170iuyo10",lg:"_170iuyo11",xl:"_170iuyo12"},defaultClass:"_170iuyoz"},"neutral-textHigh":{conditions:{xs:"_170iuyo13",md:"_170iuyo14",lg:"_170iuyo15",xl:"_170iuyo16"},defaultClass:"_170iuyo13"},"neutral-textLow":{conditions:{xs:"_170iuyo17",md:"_170iuyo18",lg:"_170iuyo19",xl:"_170iuyo1a"},defaultClass:"_170iuyo17"}}},textAlign:{values:{left:{conditions:{xs:"_170iuyo1b",md:"_170iuyo1c",lg:"_170iuyo1d",xl:"_170iuyo1e"},defaultClass:"_170iuyo1b"},right:{conditions:{xs:"_170iuyo1f",md:"_170iuyo1g",lg:"_170iuyo1h",xl:"_170iuyo1i"},defaultClass:"_170iuyo1f"},center:{conditions:{xs:"_170iuyo1j",md:"_170iuyo1k",lg:"_170iuyo1l",xl:"_170iuyo1m"},defaultClass:"_170iuyo1j"},justify:{conditions:{xs:"_170iuyo1n",md:"_170iuyo1o",lg:"_170iuyo1p",xl:"_170iuyo1q"},defaultClass:"_170iuyo1n"}}},fontSize:{values:{1:{conditions:{xs:"_170iuyo1r",md:"_170iuyo1s",lg:"_170iuyo1t",xl:"_170iuyo1u"},defaultClass:"_170iuyo1r"},2:{conditions:{xs:"_170iuyo1v",md:"_170iuyo1w",lg:"_170iuyo1x",xl:"_170iuyo1y"},defaultClass:"_170iuyo1v"},3:{conditions:{xs:"_170iuyo1z",md:"_170iuyo20",lg:"_170iuyo21",xl:"_170iuyo22"},defaultClass:"_170iuyo1z"},4:{conditions:{xs:"_170iuyo23",md:"_170iuyo24",lg:"_170iuyo25",xl:"_170iuyo26"},defaultClass:"_170iuyo23"},5:{conditions:{xs:"_170iuyo27",md:"_170iuyo28",lg:"_170iuyo29",xl:"_170iuyo2a"},defaultClass:"_170iuyo27"},6:{conditions:{xs:"_170iuyo2b",md:"_170iuyo2c",lg:"_170iuyo2d",xl:"_170iuyo2e"},defaultClass:"_170iuyo2b"},7:{conditions:{xs:"_170iuyo2f",md:"_170iuyo2g",lg:"_170iuyo2h",xl:"_170iuyo2i"},defaultClass:"_170iuyo2f"},8:{conditions:{xs:"_170iuyo2j",md:"_170iuyo2k",lg:"_170iuyo2l",xl:"_170iuyo2m"},defaultClass:"_170iuyo2j"},9:{conditions:{xs:"_170iuyo2n",md:"_170iuyo2o",lg:"_170iuyo2p",xl:"_170iuyo2q"},defaultClass:"_170iuyo2n"},10:{conditions:{xs:"_170iuyo2r",md:"_170iuyo2s",lg:"_170iuyo2t",xl:"_170iuyo2u"},defaultClass:"_170iuyo2r"},11:{conditions:{xs:"_170iuyo2v",md:"_170iuyo2w",lg:"_170iuyo2x",xl:"_170iuyo2y"},defaultClass:"_170iuyo2v"},12:{conditions:{xs:"_170iuyo2z",md:"_170iuyo30",lg:"_170iuyo31",xl:"_170iuyo32"},defaultClass:"_170iuyo2z"},14:{conditions:{xs:"_170iuyo33",md:"_170iuyo34",lg:"_170iuyo35",xl:"_170iuyo36"},defaultClass:"_170iuyo33"},16:{conditions:{xs:"_170iuyo37",md:"_170iuyo38",lg:"_170iuyo39",xl:"_170iuyo3a"},defaultClass:"_170iuyo37"},18:{conditions:{xs:"_170iuyo3b",md:"_170iuyo3c",lg:"_170iuyo3d",xl:"_170iuyo3e"},defaultClass:"_170iuyo3b"},20:{conditions:{xs:"_170iuyo3f",md:"_170iuyo3g",lg:"_170iuyo3h",xl:"_170iuyo3i"},defaultClass:"_170iuyo3f"},h1:{conditions:{xs:"_170iuyo3j",md:"_170iuyo3k",lg:"_170iuyo3l",xl:"_170iuyo3m"},defaultClass:"_170iuyo3j"},h2:{conditions:{xs:"_170iuyo3n",md:"_170iuyo3o",lg:"_170iuyo3p",xl:"_170iuyo3q"},defaultClass:"_170iuyo3n"},h3:{conditions:{xs:"_170iuyo3r",md:"_170iuyo3s",lg:"_170iuyo3t",xl:"_170iuyo3u"},defaultClass:"_170iuyo3r"},h4:{conditions:{xs:"_170iuyo3v",md:"_170iuyo3w",lg:"_170iuyo3x",xl:"_170iuyo3y"},defaultClass:"_170iuyo3v"},h5:{conditions:{xs:"_170iuyo3z",md:"_170iuyo40",lg:"_170iuyo41",xl:"_170iuyo42"},defaultClass:"_170iuyo3z"},h6:{conditions:{xs:"_170iuyo43",md:"_170iuyo44",lg:"_170iuyo45",xl:"_170iuyo46"},defaultClass:"_170iuyo43"},"0-5":{conditions:{xs:"_170iuyo47",md:"_170iuyo48",lg:"_170iuyo49",xl:"_170iuyo4a"},defaultClass:"_170iuyo47"},"1-5":{conditions:{xs:"_170iuyo4b",md:"_170iuyo4c",lg:"_170iuyo4d",xl:"_170iuyo4e"},defaultClass:"_170iuyo4b"},"2-5":{conditions:{xs:"_170iuyo4f",md:"_170iuyo4g",lg:"_170iuyo4h",xl:"_170iuyo4i"},defaultClass:"_170iuyo4f"},"3-5":{conditions:{xs:"_170iuyo4j",md:"_170iuyo4k",lg:"_170iuyo4l",xl:"_170iuyo4m"},defaultClass:"_170iuyo4j"},"4-5":{conditions:{xs:"_170iuyo4n",md:"_170iuyo4o",lg:"_170iuyo4p",xl:"_170iuyo4q"},defaultClass:"_170iuyo4n"}}},fontWeight:{values:{regular:{conditions:{xs:"_170iuyo4r",md:"_170iuyo4s",lg:"_170iuyo4t",xl:"_170iuyo4u"},defaultClass:"_170iuyo4r"},medium:{conditions:{xs:"_170iuyo4v",md:"_170iuyo4w",lg:"_170iuyo4x",xl:"_170iuyo4y"},defaultClass:"_170iuyo4v"},bold:{conditions:{xs:"_170iuyo4z",md:"_170iuyo50",lg:"_170iuyo51",xl:"_170iuyo52"},defaultClass:"_170iuyo4z"}}},lineHeight:{values:{1:{conditions:{xs:"_170iuyo53",md:"_170iuyo54",lg:"_170iuyo55",xl:"_170iuyo56"},defaultClass:"_170iuyo53"},2:{conditions:{xs:"_170iuyo57",md:"_170iuyo58",lg:"_170iuyo59",xl:"_170iuyo5a"},defaultClass:"_170iuyo57"},3:{conditions:{xs:"_170iuyo5b",md:"_170iuyo5c",lg:"_170iuyo5d",xl:"_170iuyo5e"},defaultClass:"_170iuyo5b"},4:{conditions:{xs:"_170iuyo5f",md:"_170iuyo5g",lg:"_170iuyo5h",xl:"_170iuyo5i"},defaultClass:"_170iuyo5f"},5:{conditions:{xs:"_170iuyo5j",md:"_170iuyo5k",lg:"_170iuyo5l",xl:"_170iuyo5m"},defaultClass:"_170iuyo5j"},6:{conditions:{xs:"_170iuyo5n",md:"_170iuyo5o",lg:"_170iuyo5p",xl:"_170iuyo5q"},defaultClass:"_170iuyo5n"},7:{conditions:{xs:"_170iuyo5r",md:"_170iuyo5s",lg:"_170iuyo5t",xl:"_170iuyo5u"},defaultClass:"_170iuyo5r"},8:{conditions:{xs:"_170iuyo5v",md:"_170iuyo5w",lg:"_170iuyo5x",xl:"_170iuyo5y"},defaultClass:"_170iuyo5v"},9:{conditions:{xs:"_170iuyo5z",md:"_170iuyo60",lg:"_170iuyo61",xl:"_170iuyo62"},defaultClass:"_170iuyo5z"},10:{conditions:{xs:"_170iuyo63",md:"_170iuyo64",lg:"_170iuyo65",xl:"_170iuyo66"},defaultClass:"_170iuyo63"},11:{conditions:{xs:"_170iuyo67",md:"_170iuyo68",lg:"_170iuyo69",xl:"_170iuyo6a"},defaultClass:"_170iuyo67"},12:{conditions:{xs:"_170iuyo6b",md:"_170iuyo6c",lg:"_170iuyo6d",xl:"_170iuyo6e"},defaultClass:"_170iuyo6b"},14:{conditions:{xs:"_170iuyo6f",md:"_170iuyo6g",lg:"_170iuyo6h",xl:"_170iuyo6i"},defaultClass:"_170iuyo6f"},16:{conditions:{xs:"_170iuyo6j",md:"_170iuyo6k",lg:"_170iuyo6l",xl:"_170iuyo6m"},defaultClass:"_170iuyo6j"},18:{conditions:{xs:"_170iuyo6n",md:"_170iuyo6o",lg:"_170iuyo6p",xl:"_170iuyo6q"},defaultClass:"_170iuyo6n"},20:{conditions:{xs:"_170iuyo6r",md:"_170iuyo6s",lg:"_170iuyo6t",xl:"_170iuyo6u"},defaultClass:"_170iuyo6r"},h1:{conditions:{xs:"_170iuyo6v",md:"_170iuyo6w",lg:"_170iuyo6x",xl:"_170iuyo6y"},defaultClass:"_170iuyo6v"},h2:{conditions:{xs:"_170iuyo6z",md:"_170iuyo70",lg:"_170iuyo71",xl:"_170iuyo72"},defaultClass:"_170iuyo6z"},h3:{conditions:{xs:"_170iuyo73",md:"_170iuyo74",lg:"_170iuyo75",xl:"_170iuyo76"},defaultClass:"_170iuyo73"},h4:{conditions:{xs:"_170iuyo77",md:"_170iuyo78",lg:"_170iuyo79",xl:"_170iuyo7a"},defaultClass:"_170iuyo77"},h5:{conditions:{xs:"_170iuyo7b",md:"_170iuyo7c",lg:"_170iuyo7d",xl:"_170iuyo7e"},defaultClass:"_170iuyo7b"},h6:{conditions:{xs:"_170iuyo7f",md:"_170iuyo7g",lg:"_170iuyo7h",xl:"_170iuyo7i"},defaultClass:"_170iuyo7f"},"0-5":{conditions:{xs:"_170iuyo7j",md:"_170iuyo7k",lg:"_170iuyo7l",xl:"_170iuyo7m"},defaultClass:"_170iuyo7j"},"1-5":{conditions:{xs:"_170iuyo7n",md:"_170iuyo7o",lg:"_170iuyo7p",xl:"_170iuyo7q"},defaultClass:"_170iuyo7n"},"2-5":{conditions:{xs:"_170iuyo7r",md:"_170iuyo7s",lg:"_170iuyo7t",xl:"_170iuyo7u"},defaultClass:"_170iuyo7r"},"3-5":{conditions:{xs:"_170iuyo7v",md:"_170iuyo7w",lg:"_170iuyo7x",xl:"_170iuyo7y"},defaultClass:"_170iuyo7v"},"4-5":{conditions:{xs:"_170iuyo7z",md:"_170iuyo80",lg:"_170iuyo81",xl:"_170iuyo82"},defaultClass:"_170iuyo7z"}}}}}),properties:{color:{"primary-textHigh":"var(--_117g4246)","primary-textLow":"var(--_117g4245)","success-textHigh":"var(--_117g424d)","success-textLow":"var(--_117g424c)","warning-textHigh":"var(--_117g424k)","warning-textLow":"var(--_117g424j)","danger-textHigh":"var(--_117g424r)","danger-textLow":"var(--_117g424q)","neutral-textHigh":"var(--_117g42411)","neutral-textLow":"var(--_117g42410)"},textAlign:["left","right","center","justify"],fontSize:{1:"var(--_117g42429)",2:"var(--_117g4242a)",3:"var(--_117g4242b)",4:"var(--_117g4242c)",5:"var(--_117g4242d)",6:"var(--_117g4242e)",7:"var(--_117g4242f)",8:"var(--_117g4242g)",9:"var(--_117g4242h)",10:"var(--_117g4242i)",11:"var(--_117g4242j)",12:"var(--_117g4242k)",14:"var(--_117g4242l)",16:"var(--_117g4242m)",18:"var(--_117g4242n)",20:"var(--_117g4242o)",h1:"var(--_117g42416)",h2:"var(--_117g42417)",h3:"var(--_117g42418)",h4:"var(--_117g42419)",h5:"var(--_117g4241a)",h6:"var(--_117g4241b)","0-5":"var(--_117g4242p)","1-5":"var(--_117g4242q)","2-5":"var(--_117g4242r)","3-5":"var(--_117g4242s)","4-5":"var(--_117g4242t)"},fontWeight:{regular:"var(--_117g4241c)",medium:"var(--_117g4241d)",bold:"var(--_117g4241e)"},lineHeight:{1:"var(--_117g42429)",2:"var(--_117g4242a)",3:"var(--_117g4242b)",4:"var(--_117g4242c)",5:"var(--_117g4242d)",6:"var(--_117g4242e)",7:"var(--_117g4242f)",8:"var(--_117g4242g)",9:"var(--_117g4242h)",10:"var(--_117g4242i)",11:"var(--_117g4242j)",12:"var(--_117g4242k)",14:"var(--_117g4242l)",16:"var(--_117g4242m)",18:"var(--_117g4242n)",20:"var(--_117g4242o)",h1:"var(--_117g4241i)",h2:"var(--_117g4241j)",h3:"var(--_117g4241k)",h4:"var(--_117g4241l)",h5:"var(--_117g4241m)",h6:"var(--_117g4241n)","0-5":"var(--_117g4242p)","1-5":"var(--_117g4242q)","2-5":"var(--_117g4242r)","3-5":"var(--_117g4242s)","4-5":"var(--_117g4242t)"}}}};var Skeleton=__webpack_require__("./packages/react/src/atomic/Skeleton/src/Skeleton.tsx");const sizes={h1:{width:"8.25rem",height:"2.75rem"},h2:{width:"6.188rem",height:"1.75rem"},h3:{width:"5.188rem",height:"1.75rem"},h4:{width:"4.625rem",height:"1.5rem"},h5:{width:"4.125rem",height:"1.25rem"},h6:{width:"3.625rem",height:"1.125rem"}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TitleSkeleton=({as="h1",width,height,"data-testid":dataTestId})=>(0,jsx_runtime.jsx)(Skeleton.O,{width:width??sizes[as].width,height:height??sizes[as].height,"data-testid":dataTestId,borderRadius:"0.25rem"});TitleSkeleton.displayName="TitleSkeleton";try{TitleSkeleton.displayName="TitleSkeleton",TitleSkeleton.__docgenInfo={description:"",displayName:"TitleSkeleton",props:{as:{defaultValue:{value:"h1"},description:"Type of html tag to create for the title.",name:"as",required:!1,type:{name:"enum",value:[{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'}]}},height:{defaultValue:null,description:"Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card.",name:"height",required:!1,type:{name:"string"}},width:{defaultValue:null,description:"Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.",name:"width",required:!1,type:{name:"string"}},"data-testid":{defaultValue:null,description:"This is an attribute used to identify a DOM node for testing purposes.",name:"data-testid",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Title/src/components/TitleSkeleton/TitleSkeleton.tsx#TitleSkeleton"]={docgenInfo:TitleSkeleton.__docgenInfo,name:"TitleSkeleton",path:"packages/react/src/atomic/Title/src/components/TitleSkeleton/TitleSkeleton.tsx#TitleSkeleton"})}catch(__react_docgen_typescript_loader_error){}const Title=({className:_className,style:_style,as:As="h1",color="primary-textHigh",textAlign="left",lineHeight,fontWeight="medium",fontSize,children,...rest})=>(0,jsx_runtime.jsx)(As,{...rest,className:[title.sprinkle({color,textAlign,lineHeight,fontWeight,fontSize}),title.classnames.appearance[As]].join(" "),children});Title.displayName="Title",Title.displayName="Title",Title.Skeleton=TitleSkeleton,Title.Skeleton.displayName="Title.Skeleton";try{Title.displayName="Title",Title.__docgenInfo={description:"",displayName:"Title",props:{children:{defaultValue:null,description:"The content of the title.\n@TJS-type React.ReactNode",name:"children",required:!1,type:{name:"ReactNode"}},as:{defaultValue:{value:"h1"},description:"Type of html tag to create for the title.",name:"as",required:!1,type:{name:"enum",value:[{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'}]}},fontSize:{defaultValue:{value:"base"},description:"The fontSize property sets the size of the title.",name:"fontSize",required:!1,type:{name:'"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "1" | "2" | "3" | "4" | "5" | "0-5" | "6" | "1-5" | "2-5" | "3-5" | "4-5" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | TitleConditions<"h1" | ... 25 more ... | "20">'}},fontWeight:{defaultValue:{value:"medium"},description:"The fontWeight property sets how thick or thin characters in title should be displayed.",name:"fontWeight",required:!1,type:{name:'"medium" | "bold" | "regular" | TitleConditions<"medium" | "bold" | "regular">'}},lineHeight:{defaultValue:{value:"base"},description:"The lineHeight property specifies the line height of the title.",name:"lineHeight",required:!1,type:{name:'"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "1" | "2" | "3" | "4" | "5" | "0-5" | "6" | "1-5" | "2-5" | "3-5" | "4-5" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | TitleConditions<"h1" | ... 25 more ... | "20">'}},textAlign:{defaultValue:{value:"left"},description:"The textAlign property specifies the horizontal alignment of title.",name:"textAlign",required:!1,type:{name:"TextAlign | TitleConditions<TextAlign>"}},color:{defaultValue:{value:"primary-textHigh"},description:"The color property is used to set the color of the title.",name:"color",required:!1,type:{name:'"primary-textHigh" | "primary-textLow" | "success-textHigh" | "success-textLow" | "warning-textHigh" | "warning-textLow" | "danger-textHigh" | "danger-textLow" | "neutral-textHigh" | "neutral-textLow" | (TitleConditions<...> & string)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/react/src/atomic/Title/src/Title.tsx#Title"]={docgenInfo:Title.__docgenInfo,name:"Title",path:"packages/react/src/atomic/Title/src/Title.tsx#Title"})}catch(__react_docgen_typescript_loader_error){}}}]);