import type { JestConfigWithTsJest } from "ts-jest";

const config = {
  preset: "ts-jest",
  testEnvironment: "node",
} satisfies JestConfigWithTsJest;

export default config;
