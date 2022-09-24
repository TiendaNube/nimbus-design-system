import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "@nimbus-ds/styles": "<rootDir>/packages/styles/src",
    "@nimbus-ds/skeleton": "<rootDir>/packages/react/Skeleton/src",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transform: {
    "^.+\\.css\\.ts$": "babel-jest",
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["dist"],
};

export default config;
