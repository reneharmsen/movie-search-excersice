/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default createJestConfig(config)
