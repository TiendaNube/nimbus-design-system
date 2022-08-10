import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "@nimbus/react-(.+)$": "<rootDir>/packages/react/$1/src",
    "@nimbus/(.+)$": "<rootDir>packages/core/$1/src",
  },
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
