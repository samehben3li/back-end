import server from '../../..';
import { getTokens } from '../../utils';

describe('CRUD_USER', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing create user functionnality', async () => {
    const { adminToken } = await getTokens();
  });
});
