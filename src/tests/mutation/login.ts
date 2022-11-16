import { IUserInfo } from '../interfaces';

const loginMutation = (userInfo: IUserInfo) => ({
  query: `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        email
        id
        username
      }
    }
  }`,
  variables: userInfo,
});

export default loginMutation;
