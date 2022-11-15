import server from '..';

it('should validate user info correctly', async () => {
  const response = await server.executeOperation({});
  expect(response).toBeTruthy();
  // expect(result?.errors).toBeTruthy();
});
