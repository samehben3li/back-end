import assert from 'node:assert';
import server from '..';

it('should validate user info correctly', async () => {
  // correct credentials
  let response = await server.executeOperation({
    query:
      'mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { accessToken, user {email, id, username}}}',
    variables: {
      email: 'test@test.com',
      password: 'test123',
    },
  });
  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeTruthy();

  // incorrect credentials
  response = await server.executeOperation({
    query:
      'mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { accessToken, user {email, id, username}}}',
    variables: {
      email: 'incorrect@test.com',
      password: 'test123',
    },
  });
  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeTruthy();
  expect(response.body.singleResult.data).toBeFalsy();

  // missing email
  response = await server.executeOperation({
    query:
      'mutation Login($email: String!, $password: String!) { login(email: $email, password: $password) { accessToken, user {email, id, username}}}',
    variables: {
      email: '',
      password: 'test123',
    },
  });
  assert(response.body.kind === 'single');
  expect(response.body.singleResult.errors).toBeTruthy();
  expect(response.body.singleResult.data).toBeFalsy();
});
