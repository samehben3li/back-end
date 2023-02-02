import server from '../..';

describe('Admin API', () => {
  afterAll(async () => {
    server.close();
  });
});
