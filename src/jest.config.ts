import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 1,
  testTimeout: 50000,
  detectOpenHandles: true,
  forceExit: true,
  setupFilesAfterEnv: ['./testSetup.ts'],
};

export default config;
