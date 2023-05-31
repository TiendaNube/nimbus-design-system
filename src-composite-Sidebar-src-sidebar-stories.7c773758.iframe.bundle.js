"use strict";(self.webpackChunknimbus_design_system=self.webpackChunknimbus_design_system||[]).push([[6979],{"./packages/react/src/composite/Sidebar/src/sidebar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,basic:()=>basic,default:()=>__WEBPACK_DEFAULT_EXPORT__,withFooter:()=>withFooter,withHeader:()=>withHeader,withHeaderAndTitle:()=>withHeaderAndTitle,withPadding:()=>withPadding});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_client_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/client-api"),_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/react/src/atomic/Box/src/Box.tsx"),_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/react/src/atomic/Button/src/Button.tsx"),_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/react/src/atomic/Text/src/Text.tsx"),_Sidebar__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/react/src/composite/Sidebar/src/Sidebar.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Composite/Sidebar/Sidebar",component:_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y,argTypes:{children:{control:{disable:!0}}},tags:["autodocs"]},basic={render:args=>{const[{open},updateArgs]=(0,_storybook_client_api__WEBPACK_IMPORTED_MODULE_1__.useArgs)(),handleClose=()=>updateArgs({open:!open});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__.z,{onClick:handleClose,children:"Open"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y,{...args,onRemove:handleClose,open})]})},args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Replace me with your content"})})}},render=args=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),handleClose=()=>setOpen((prevState=>!prevState));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_button__WEBPACK_IMPORTED_MODULE_4__.z,{onClick:handleClose,children:"Open"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y,{...args,onRemove:handleClose,open})]})},withPadding={render,args:{padding:"base",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Replace me with your content"})})}},withHeader={render,args:{padding:"base",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Header,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Header"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Body,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Body"})})})]})}},withHeaderAndTitle={render,args:{padding:"base",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Header,{title:"Title"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Replace me with your content"})})]})}},withFooter={render,args:{padding:"base",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Header,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Header"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Body,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Body"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Sidebar__WEBPACK_IMPORTED_MODULE_3__.Y.Footer,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_box__WEBPACK_IMPORTED_MODULE_5__.x,{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",borderStyle:"dashed",padding:"2",borderWidth:"1",borderColor:"neutral-interactive",width:"100%",boxSizing:"border-box",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_nimbus_ds_text__WEBPACK_IMPORTED_MODULE_6__.x,{textAlign:"center",children:"Footer"})})})]})}};basic.parameters={...basic.parameters,docs:{...basic.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const [{\n      open\n    }, updateArgs] = useArgs();\n    const handleClose = () => updateArgs({\n      open: !open\n    });\n    return <>\n        <Button onClick={handleClose}>Open</Button>\n        <Sidebar {...args} onRemove={handleClose} open={open} />\n      </>;\n  },\n  args: {\n    children: <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n        <Text textAlign="center">Replace me with your content</Text>\n      </Box>\n  }\n}',...basic.parameters?.docs?.source}}},withPadding.parameters={...withPadding.parameters,docs:{...withPadding.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    padding: "base",\n    children: <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n        <Text textAlign="center">Replace me with your content</Text>\n      </Box>\n  }\n}',...withPadding.parameters?.docs?.source}}},withHeader.parameters={...withHeader.parameters,docs:{...withHeader.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    padding: "base",\n    children: <>\n        <Sidebar.Header>\n          <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n            <Text textAlign="center">Header</Text>\n          </Box>\n        </Sidebar.Header>\n        <Sidebar.Body>\n          <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n            <Text textAlign="center">Body</Text>\n          </Box>\n        </Sidebar.Body>\n      </>\n  }\n}',...withHeader.parameters?.docs?.source}}},withHeaderAndTitle.parameters={...withHeaderAndTitle.parameters,docs:{...withHeaderAndTitle.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    padding: "base",\n    children: <>\n        <Sidebar.Header title="Title" />\n        <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n          <Text textAlign="center">Replace me with your content</Text>\n        </Box>\n      </>\n  }\n}',...withHeaderAndTitle.parameters?.docs?.source}}},withFooter.parameters={...withFooter.parameters,docs:{...withFooter.parameters?.docs,source:{originalSource:'{\n  render,\n  args: {\n    padding: "base",\n    children: <>\n        <Sidebar.Header>\n          <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n            <Text textAlign="center">Header</Text>\n          </Box>\n        </Sidebar.Header>\n        <Sidebar.Body>\n          <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" boxSizing="border-box">\n            <Text textAlign="center">Body</Text>\n          </Box>\n        </Sidebar.Body>\n        <Sidebar.Footer>\n          <Box display="flex" justifyContent="center" alignItems="center" height="100%" borderStyle="dashed" padding="2" borderWidth="1" borderColor="neutral-interactive" width="100%" boxSizing="border-box">\n            <Text textAlign="center">Footer</Text>\n          </Box>\n        </Sidebar.Footer>\n      </>\n  }\n}',...withFooter.parameters?.docs?.source}}};const __namedExportsOrder=["basic","withPadding","withHeader","withHeaderAndTitle","withFooter"]}}]);