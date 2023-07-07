import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["./jest.setup.tsx"],
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    // core
    "@nimbus-ds/styles": "<rootDir>/packages/core/styles/src",
    "@nimbus-ds/typings": "<rootDir>/packages/core/typings/src",
    // atomics
    "@nimbus-ds/badge": "<rootDir>/packages/react/src/atomic/Badge/src",
    "@nimbus-ds/box": "<rootDir>/packages/react/src/atomic/Box/src",
    "@nimbus-ds/button": "<rootDir>/packages/react/src/atomic/Button/src",
    "@nimbus-ds/checkbox": "<rootDir>/packages/react/src/atomic/Checkbox/src",
    "@nimbus-ds/chip": "<rootDir>/packages/react/src/atomic/Chip/src",
    "@nimbus-ds/file-uploader":
      "<rootDir>/packages/react/src/atomic/FileUploader/src",
    "@nimbus-ds/icon": "<rootDir>/packages/react/src/atomic/Icon/src",
    "@nimbus-ds/icon-button":
      "<rootDir>/packages/react/src/atomic/IconButton/src",
    "@nimbus-ds/input": "<rootDir>/packages/react/src/atomic/Input/src",
    "@nimbus-ds/label": "<rootDir>/packages/react/src/atomic/Label/src",
    "@nimbus-ds/link": "<rootDir>/packages/react/src/atomic/Link/src",
    "@nimbus-ds/list": "<rootDir>/packages/react/src/atomic/List/src",
    "@nimbus-ds/popover": "<rootDir>/packages/react/src/atomic/Popover/src",
    "@nimbus-ds/radio": "<rootDir>/packages/react/src/atomic/Radio/src",
    "@nimbus-ds/select": "<rootDir>/packages/react/src/atomic/Select/src",
    "@nimbus-ds/skeleton": "<rootDir>/packages/react/src/atomic/Skeleton/src",
    "@nimbus-ds/spinner": "<rootDir>/packages/react/src/atomic/Spinner/src",
    "@nimbus-ds/tag": "<rootDir>/packages/react/src/atomic/Tag/src",
    "@nimbus-ds/text": "<rootDir>/packages/react/src/atomic/Text/src",
    "@nimbus-ds/textarea": "<rootDir>/packages/react/src/atomic/Textarea/src",
    "@nimbus-ds/thumbnail": "<rootDir>/packages/react/src/atomic/Thumbnail/src",
    "@nimbus-ds/title": "<rootDir>/packages/react/src/atomic/Title/src",
    "@nimbus-ds/toast": "<rootDir>/packages/react/src/atomic/Toast/src",
    "@nimbus-ds/toggle": "<rootDir>/packages/react/src/atomic/Toggle/src",
    "@nimbus-ds/tooltip": "<rootDir>/packages/react/src/atomic/Tooltip/src",
    // composites
    "@nimbus-ds/accordion":
      "<rootDir>/packages/react/src/composite/Accordion/src",
    "@nimbus-ds/alert": "<rootDir>/packages/react/src/composite/Alert/src",
    "@nimbus-ds/card": "<rootDir>/packages/react/src/composite/Card/src",
    "@nimbus-ds/modal": "<rootDir>/packages/react/src/composite/Modal/src",
    "@nimbus-ds/pagination":
      "<rootDir>/packages/react/src/composite/Pagination/src",
    "@nimbus-ds/sidebar": "<rootDir>/packages/react/src/composite/Sidebar/src",
    "@nimbus-ds/tabs": "<rootDir>/packages/react/src/composite/Tabs/src",
    "@nimbus-ds/table": "<rootDir>/packages/react/src/composite/Table/src",
    // commons
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transform: {
    "^.+\\.css\\.ts$": "babel-jest",
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "dist",
    ".scripts",
    "packages/helper",
    "packages/core/typings",
  ],
};
export default config;
