import { AuthenticationError } from 'apollo-server-core';

const authorization = async (isAdmin: boolean) => {
  if (!isAdmin) {
    throw new AuthenticationError('NOT_AUTHORIZED');
  }
};

export default authorization;
