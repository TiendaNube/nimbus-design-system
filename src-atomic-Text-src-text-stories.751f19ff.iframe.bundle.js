"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[884],{"./packages/react/src/atomic/Text/src/text.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,danger:()=>danger,default:()=>__WEBPACK_DEFAULT_EXPORT__,lineClamp:()=>lineClamp,neutral:()=>neutral,p:()=>p,primary:()=>primary,responsive:()=>responsive,span:()=>span,success:()=>success,warning:()=>warning});var _nimbus_ds_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/core/styles/src/packages/atomic/text/index.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Atomic/Text",component:__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx").E,argTypes:{children:{control:{type:"text"}},...(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.L)(_nimbus_ds_styles__WEBPACK_IMPORTED_MODULE_2__.Q.properties)},tags:["autodocs"]},basic={args:{children:"Lorem ipsum dolor sit amet"}},p={args:{as:"p",children:"Lorem ipsum dolor sit amet"}},span={args:{as:"span",children:"Lorem ipsum dolor sit amet"}},primary={args:{color:"primary-textLow",children:"Lorem ipsum dolor sit amet"}},success={args:{color:"success-textLow",children:"Lorem ipsum dolor sit amet"}},warning={args:{color:"warning-textLow",children:"Lorem ipsum dolor sit amet"}},danger={args:{color:"danger-textLow",children:"Lorem ipsum dolor sit amet"}},neutral={args:{color:"neutral-textLow",children:"Lorem ipsum dolor sit amet"}},responsive={args:{children:"Lorem ipsum dolor sit amet",textAlign:{xs:"center",md:"center",lg:"right",xl:"center"}}},lineClamp={args:{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et nisi sit amet quam convallis consectetur. Vestibulum hendrerit ac urna eget rhoncus. Aliquam non velit finibus sem gravida pretium. In neque metus, interdum a quam id, pulvinar consequat leo. Proin sapien mauris, efficitur ut mi at, finibus commodo metus. Pellentesque ac pellentesque risus. Nulla facilisi.",textAlign:"left",lineClamp:1}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...basic.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:'{\n  args: {\n    as: "p",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...p.parameters?.docs?.source}}},span.parameters={...span.parameters,docs:{...span.parameters?.docs,source:{originalSource:'{\n  args: {\n    as: "span",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...span.parameters?.docs?.source}}},primary.parameters={...primary.parameters,docs:{...primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    color: "primary-textLow",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...primary.parameters?.docs?.source}}},success.parameters={...success.parameters,docs:{...success.parameters?.docs,source:{originalSource:'{\n  args: {\n    color: "success-textLow",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...success.parameters?.docs?.source}}},warning.parameters={...warning.parameters,docs:{...warning.parameters?.docs,source:{originalSource:'{\n  args: {\n    color: "warning-textLow",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...warning.parameters?.docs?.source}}},danger.parameters={...danger.parameters,docs:{...danger.parameters?.docs,source:{originalSource:'{\n  args: {\n    color: "danger-textLow",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...danger.parameters?.docs?.source}}},neutral.parameters={...neutral.parameters,docs:{...neutral.parameters?.docs,source:{originalSource:'{\n  args: {\n    color: "neutral-textLow",\n    children: "Lorem ipsum dolor sit amet"\n  }\n}',...neutral.parameters?.docs?.source}}},responsive.parameters={...responsive.parameters,docs:{...responsive.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: "Lorem ipsum dolor sit amet",\n    textAlign: {\n      xs: "center",\n      md: "center",\n      lg: "right",\n      xl: "center"\n    }\n  }\n}',...responsive.parameters?.docs?.source}}},lineClamp.parameters={...lineClamp.parameters,docs:{...lineClamp.parameters?.docs,source:{originalSource:'{\n  args: {\n    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et nisi sit amet quam convallis consectetur. Vestibulum hendrerit ac urna eget rhoncus. Aliquam non velit finibus sem gravida pretium. In neque metus, interdum a quam id, pulvinar consequat leo. Proin sapien mauris, efficitur ut mi at, finibus commodo metus. Pellentesque ac pellentesque risus. Nulla facilisi.",\n    textAlign: "left",\n    lineClamp: 1\n  }\n}',...lineClamp.parameters?.docs?.source}}};const __namedExportsOrder=["basic","p","span","primary","success","warning","danger","neutral","responsive","lineClamp"]},"./.storybook/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>argTypesConvert});__webpack_require__("./node_modules/path-browserify/index.js");const argTypesConvert=properties=>Object.keys(properties).reduce(((prev,curr)=>{let options=[];return Array.isArray(properties[curr])?options=properties[curr]:"object"==typeof properties[curr]&&(options=Object.keys(properties[curr])),prev[curr]={control:options?.length>6?"select":"radio",options},prev}),{})},"./node_modules/path-browserify/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js");function assertPath(path){if("string"!=typeof path)throw new TypeError("Path must be a string. Received "+JSON.stringify(path))}function normalizeStringPosix(path,allowAboveRoot){for(var code,res="",lastSegmentLength=0,lastSlash=-1,dots=0,i=0;i<=path.length;++i){if(i<path.length)code=path.charCodeAt(i);else{if(47===code)break;code=47}if(47===code){if(lastSlash===i-1||1===dots);else if(lastSlash!==i-1&&2===dots){if(res.length<2||2!==lastSegmentLength||46!==res.charCodeAt(res.length-1)||46!==res.charCodeAt(res.length-2))if(res.length>2){var lastSlashIndex=res.lastIndexOf("/");if(lastSlashIndex!==res.length-1){-1===lastSlashIndex?(res="",lastSegmentLength=0):lastSegmentLength=(res=res.slice(0,lastSlashIndex)).length-1-res.lastIndexOf("/"),lastSlash=i,dots=0;continue}}else if(2===res.length||1===res.length){res="",lastSegmentLength=0,lastSlash=i,dots=0;continue}allowAboveRoot&&(res.length>0?res+="/..":res="..",lastSegmentLength=2)}else res.length>0?res+="/"+path.slice(lastSlash+1,i):res=path.slice(lastSlash+1,i),lastSegmentLength=i-lastSlash-1;lastSlash=i,dots=0}else 46===code&&-1!==dots?++dots:dots=-1}return res}var posix={resolve:function resolve(){for(var cwd,resolvedPath="",resolvedAbsolute=!1,i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path;i>=0?path=arguments[i]:(void 0===cwd&&(cwd=process.cwd()),path=cwd),assertPath(path),0!==path.length&&(resolvedPath=path+"/"+resolvedPath,resolvedAbsolute=47===path.charCodeAt(0))}return resolvedPath=normalizeStringPosix(resolvedPath,!resolvedAbsolute),resolvedAbsolute?resolvedPath.length>0?"/"+resolvedPath:"/":resolvedPath.length>0?resolvedPath:"."},normalize:function normalize(path){if(assertPath(path),0===path.length)return".";var isAbsolute=47===path.charCodeAt(0),trailingSeparator=47===path.charCodeAt(path.length-1);return 0!==(path=normalizeStringPosix(path,!isAbsolute)).length||isAbsolute||(path="."),path.length>0&&trailingSeparator&&(path+="/"),isAbsolute?"/"+path:path},isAbsolute:function isAbsolute(path){return assertPath(path),path.length>0&&47===path.charCodeAt(0)},join:function join(){if(0===arguments.length)return".";for(var joined,i=0;i<arguments.length;++i){var arg=arguments[i];assertPath(arg),arg.length>0&&(void 0===joined?joined=arg:joined+="/"+arg)}return void 0===joined?".":posix.normalize(joined)},relative:function relative(from,to){if(assertPath(from),assertPath(to),from===to)return"";if((from=posix.resolve(from))===(to=posix.resolve(to)))return"";for(var fromStart=1;fromStart<from.length&&47===from.charCodeAt(fromStart);++fromStart);for(var fromEnd=from.length,fromLen=fromEnd-fromStart,toStart=1;toStart<to.length&&47===to.charCodeAt(toStart);++toStart);for(var toLen=to.length-toStart,length=fromLen<toLen?fromLen:toLen,lastCommonSep=-1,i=0;i<=length;++i){if(i===length){if(toLen>length){if(47===to.charCodeAt(toStart+i))return to.slice(toStart+i+1);if(0===i)return to.slice(toStart+i)}else fromLen>length&&(47===from.charCodeAt(fromStart+i)?lastCommonSep=i:0===i&&(lastCommonSep=0));break}var fromCode=from.charCodeAt(fromStart+i);if(fromCode!==to.charCodeAt(toStart+i))break;47===fromCode&&(lastCommonSep=i)}var out="";for(i=fromStart+lastCommonSep+1;i<=fromEnd;++i)i!==fromEnd&&47!==from.charCodeAt(i)||(0===out.length?out+="..":out+="/..");return out.length>0?out+to.slice(toStart+lastCommonSep):(toStart+=lastCommonSep,47===to.charCodeAt(toStart)&&++toStart,to.slice(toStart))},_makeLong:function _makeLong(path){return path},dirname:function dirname(path){if(assertPath(path),0===path.length)return".";for(var code=path.charCodeAt(0),hasRoot=47===code,end=-1,matchedSlash=!0,i=path.length-1;i>=1;--i)if(47===(code=path.charCodeAt(i))){if(!matchedSlash){end=i;break}}else matchedSlash=!1;return-1===end?hasRoot?"/":".":hasRoot&&1===end?"//":path.slice(0,end)},basename:function basename(path,ext){if(void 0!==ext&&"string"!=typeof ext)throw new TypeError('"ext" argument must be a string');assertPath(path);var i,start=0,end=-1,matchedSlash=!0;if(void 0!==ext&&ext.length>0&&ext.length<=path.length){if(ext.length===path.length&&ext===path)return"";var extIdx=ext.length-1,firstNonSlashEnd=-1;for(i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(47===code){if(!matchedSlash){start=i+1;break}}else-1===firstNonSlashEnd&&(matchedSlash=!1,firstNonSlashEnd=i+1),extIdx>=0&&(code===ext.charCodeAt(extIdx)?-1==--extIdx&&(end=i):(extIdx=-1,end=firstNonSlashEnd))}return start===end?end=firstNonSlashEnd:-1===end&&(end=path.length),path.slice(start,end)}for(i=path.length-1;i>=0;--i)if(47===path.charCodeAt(i)){if(!matchedSlash){start=i+1;break}}else-1===end&&(matchedSlash=!1,end=i+1);return-1===end?"":path.slice(start,end)},extname:function extname(path){assertPath(path);for(var startDot=-1,startPart=0,end=-1,matchedSlash=!0,preDotState=0,i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(47!==code)-1===end&&(matchedSlash=!1,end=i+1),46===code?-1===startDot?startDot=i:1!==preDotState&&(preDotState=1):-1!==startDot&&(preDotState=-1);else if(!matchedSlash){startPart=i+1;break}}return-1===startDot||-1===end||0===preDotState||1===preDotState&&startDot===end-1&&startDot===startPart+1?"":path.slice(startDot,end)},format:function format(pathObject){if(null===pathObject||"object"!=typeof pathObject)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof pathObject);return function _format(sep,pathObject){var dir=pathObject.dir||pathObject.root,base=pathObject.base||(pathObject.name||"")+(pathObject.ext||"");return dir?dir===pathObject.root?dir+base:dir+sep+base:base}("/",pathObject)},parse:function parse(path){assertPath(path);var ret={root:"",dir:"",base:"",ext:"",name:""};if(0===path.length)return ret;var start,code=path.charCodeAt(0),isAbsolute=47===code;isAbsolute?(ret.root="/",start=1):start=0;for(var startDot=-1,startPart=0,end=-1,matchedSlash=!0,i=path.length-1,preDotState=0;i>=start;--i)if(47!==(code=path.charCodeAt(i)))-1===end&&(matchedSlash=!1,end=i+1),46===code?-1===startDot?startDot=i:1!==preDotState&&(preDotState=1):-1!==startDot&&(preDotState=-1);else if(!matchedSlash){startPart=i+1;break}return-1===startDot||-1===end||0===preDotState||1===preDotState&&startDot===end-1&&startDot===startPart+1?-1!==end&&(ret.base=ret.name=0===startPart&&isAbsolute?path.slice(1,end):path.slice(startPart,end)):(0===startPart&&isAbsolute?(ret.name=path.slice(1,startDot),ret.base=path.slice(1,end)):(ret.name=path.slice(startPart,startDot),ret.base=path.slice(startPart,end)),ret.ext=path.slice(startDot,end)),startPart>0?ret.dir=path.slice(0,startPart-1):isAbsolute&&(ret.dir="/"),ret},sep:"/",delimiter:":",win32:null,posix:null};posix.posix=posix,module.exports=posix},"./tsconfig.json":module=>{module.exports=JSON.parse('{"include":["packages",".scripts","index.d.ts"],"compilerOptions":{"target":"esnext","module":"commonjs","allowJs":false,"allowSyntheticDefaultImports":true,"alwaysStrict":true,"baseUrl":".","emitDecoratorMetadata":false,"esModuleInterop":true,"experimentalDecorators":false,"importHelpers":true,"jsx":"react","lib":["dom","esnext"],"moduleResolution":"node","skipLibCheck":true,"forceConsistentCasingInFileNames":true,"noEmit":false,"outDir":"./dist","noFallthroughCasesInSwitch":false,"noImplicitAny":true,"noImplicitReturns":false,"noImplicitThis":true,"noUnusedLocals":true,"noUnusedParameters":false,"pretty":true,"resolveJsonModule":true,"sourceMap":true,"isolatedModules":true,"strict":true,"strictFunctionTypes":true,"strictNullChecks":true,"strictPropertyInitialization":true,"stripInternal":true,"types":["node","jest"],"typeRoots":["./node_modules/@types","./types"],"paths":{"@nimbus-ds/storybook":["./storybook"],"@nimbus-ds/icons":["./packages/icons/tmp"],"@nimbus-ds/tokens":["./packages/core/tokens/dist"],"@nimbus-ds/typings":["./packages/core/typings/src"],"@nimbus-ds/styles":["./packages/core/styles/src"],"@nimbus-ds/scripts":["./packages/core/scripts/src"],"@nimbus-ds/webpack":["./packages/core/webpack/src"],"@nimbus-ds/components":["./packages/react/src"],"@nimbus-ds/badge":["./packages/react/src/atomic/Badge/src"],"@nimbus-ds/box":["./packages/react/src/atomic/Box/src"],"@nimbus-ds/button":["./packages/react/src/atomic/Button/src"],"@nimbus-ds/checkbox":["./packages/react/src/atomic/Checkbox/src"],"@nimbus-ds/chip":["./packages/react/src/atomic/Chip/src"],"@nimbus-ds/icon":["./packages/react/src/atomic/Icon/src"],"@nimbus-ds/file-uploader":["./packages/react/src/atomic/FileUploader/src"],"@nimbus-ds/icon-button":["./packages/react/src/atomic/IconButton/src"],"@nimbus-ds/input":["./packages/react/src/atomic/Input/src"],"@nimbus-ds/label":["./packages/react/src/atomic/Label/src"],"@nimbus-ds/link":["./packages/react/src/atomic/Link/src"],"@nimbus-ds/list":["./packages/react/src/atomic/List/src"],"@nimbus-ds/multi-select":["./packages/react/src/atomic/MultiSelect/src"],"@nimbus-ds/popover":["./packages/react/src/atomic/Popover/src"],"@nimbus-ds/radio":["./packages/react/src/atomic/Radio/src"],"@nimbus-ds/select":["./packages/react/src/atomic/Select/src"],"@nimbus-ds/skeleton":["./packages/react/src/atomic/Skeleton/src"],"@nimbus-ds/spinner":["./packages/react/src/atomic/Spinner/src"],"@nimbus-ds/tag":["./packages/react/src/atomic/Tag/src"],"@nimbus-ds/text":["./packages/react/src/atomic/Text/src"],"@nimbus-ds/textarea":["./packages/react/src/atomic/Textarea/src"],"@nimbus-ds/thumbnail":["./packages/react/src/atomic/Thumbnail/src"],"@nimbus-ds/title":["./packages/react/src/atomic/Title/src"],"@nimbus-ds/toast":["./packages/react/src/atomic/Toast/src"],"@nimbus-ds/toggle":["./packages/react/src/atomic/Toggle/src"],"@nimbus-ds/tooltip":["./packages/react/src/atomic/Tooltip/src"],"@nimbus-ds/accordion":["./packages/react/src/composite/Accordion/src"],"@nimbus-ds/alert":["./packages/react/src/composite/Alert/src"],"@nimbus-ds/card":["./packages/react/src/composite/Card/src"],"@nimbus-ds/modal":["./packages/react/src/composite/Modal/src"],"@nimbus-ds/pagination":["./packages/react/src/composite/Pagination/src"],"@nimbus-ds/sidebar":["./packages/react/src/composite/Sidebar/src"],"@nimbus-ds/tabs":["./packages/react/src/composite/Tabs/src"],"@nimbus-ds/table":["./packages/react/src/composite/Table/src"]}}}')}}]);