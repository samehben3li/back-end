import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 1,
  testTimeout: 50000,
  detectOpenHandles: true,
  forceExit: true,
};

export default config;
