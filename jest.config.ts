import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "@nimbus-ds/styles": "<rootDir>/packages/styles/src",
    "@nimbus-ds/badge": "<rootDir>/packages/react/Badge/src",
    "@nimbus-ds/box": "<rootDir>/packages/react/Box/src",
    "@nimbus-ds/button": "<rootDir>/packages/react/Button/src",
    "@nimbus-ds/checkbox": "<rootDir>/packages/react/Checkbox/src",
    "@nimbus-ds/chip": "<rootDir>/packages/react/Chip/src",
    "@nimbus-ds/icon": "<rootDir>/packages/react/Icon/src",
    "@nimbus-ds/icon-button": "<rootDir>/packages/react/IconButton/src",
    "@nimbus-ds/input": "<rootDir>/packages/react/Input/src",
    "@nimbus-ds/label": "<rootDir>/packages/react/Label/src",
    "@nimbus-ds/Link": "<rootDir>/packages/react/Link/src",
    "@nimbus-ds/list": "<rootDir>/packages/react/List/src",
    "@nimbus-ds/popover": "<rootDir>/packages/react/Popover/src",
    "@nimbus-ds/radio": "<rootDir>/packages/react/Radio/src",
    "@nimbus-ds/select": "<rootDir>/packages/react/Select/src",
    "@nimbus-ds/skeleton": "<rootDir>/packages/react/Skeleton/src",
    "@nimbus-ds/spinner": "<rootDir>/packages/react/Spinner/src",
    "@nimbus-ds/stack": "<rootDir>/packages/react/Stack/src",
    "@nimbus-ds/tag": "<rootDir>/packages/react/Tag/src",
    "@nimbus-ds/text": "<rootDir>/packages/react/Text/src",
    "@nimbus-ds/textarea": "<rootDir>/packages/react/TextArea/src",
    "@nimbus-ds/title": "<rootDir>/packages/react/Title/src",
    "@nimbus-ds/toast": "<rootDir>/packages/react/Toast/src",
    "@nimbus-ds/toggle": "<rootDir>/packages/react/Toggle/src",
    "@nimbus-ds/tooltip": "<rootDir>/packages/react/Tooltip/src",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transform: {
    "^.+\\.css\\.ts$": "babel-jest",
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["dist"],
};

export default config;
