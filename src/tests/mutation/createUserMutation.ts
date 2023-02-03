import { IUserInfo } from '../../interfaces';

const creatUserMutation = (userInfo: IUserInfo) => ({
  query: `
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
          email
          id
          isAdmin
          username
        }
    }
    `,
  variables: userInfo,
});

export default creatUserMutation;
