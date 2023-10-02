import type { JestConfigWithTsJest } from "ts-jest";

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
} satisfies JestConfigWithTsJest;

export default config;
