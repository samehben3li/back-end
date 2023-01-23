import { AuthenticationError } from 'apollo-server-core';

const authorization = (isAdmin: boolean) => {
  if (!isAdmin) {
    throw new AuthenticationError('NOT_AUTHORIZED');
  }
};

export default authorization;
