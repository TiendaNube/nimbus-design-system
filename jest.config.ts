import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "@nimbus-ds/styles": "<rootDir>/packages/core/styles/src",
    "@nimbus-ds/badge": "<rootDir>/packages/react/atomic/Badge/src",
    "@nimbus-ds/box": "<rootDir>/packages/react/atomic/Box/src",
    "@nimbus-ds/button": "<rootDir>/packages/react/atomic/Button/src",
    "@nimbus-ds/checkbox": "<rootDir>/packages/react/atomic/Checkbox/src",
    "@nimbus-ds/chip": "<rootDir>/packages/react/atomic/Chip/src",
    "@nimbus-ds/icon": "<rootDir>/packages/react/atomic/Icon/src",
    "@nimbus-ds/icon-button": "<rootDir>/packages/react/atomic/IconButton/src",
    "@nimbus-ds/input": "<rootDir>/packages/react/atomic/Input/src",
    "@nimbus-ds/label": "<rootDir>/packages/react/atomic/Label/src",
    "@nimbus-ds/Link": "<rootDir>/packages/react/atomic/Link/src",
    "@nimbus-ds/list": "<rootDir>/packages/react/atomic/List/src",
    "@nimbus-ds/popover": "<rootDir>/packages/react/atomic/Popover/src",
    "@nimbus-ds/radio": "<rootDir>/packages/react/atomic/Radio/src",
    "@nimbus-ds/select": "<rootDir>/packages/react/atomic/Select/src",
    "@nimbus-ds/skeleton": "<rootDir>/packages/react/atomic/Skeleton/src",
    "@nimbus-ds/spinner": "<rootDir>/packages/react/atomic/Spinner/src",
    "@nimbus-ds/stack": "<rootDir>/packages/react/atomic/Stack/src",
    "@nimbus-ds/tag": "<rootDir>/packages/react/atomic/Tag/src",
    "@nimbus-ds/text": "<rootDir>/packages/react/atomic/Text/src",
    "@nimbus-ds/textarea": "<rootDir>/packages/react/atomic/TextArea/src",
    "@nimbus-ds/thumbnail": "<rootDir>/packages/react/atomic/Thumbnail/src",
    "@nimbus-ds/title": "<rootDir>/packages/react/atomic/Title/src",
    "@nimbus-ds/toast": "<rootDir>/packages/react/atomic/Toast/src",
    "@nimbus-ds/toggle": "<rootDir>/packages/react/atomic/Toggle/src",
    "@nimbus-ds/tooltip": "<rootDir>/packages/react/atomic/Tooltip/src",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transform: {
    "^.+\\.css\\.ts$": "babel-jest",
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["dist"],
};

export default config;
