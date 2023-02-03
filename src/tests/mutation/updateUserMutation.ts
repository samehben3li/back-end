import { IUserInfo } from '../../interfaces';

const updateUserMutation = (updateUserId: string, userInfo: IUserInfo) => ({
  query: `
    mutation Mutation($updateUserId: ID!, $username: String, $email: String, $password: String) {
        updateUser(id: $updateUserId, username: $username, email: $email, password: $password) {
            email
            id
            isAdmin
            username
        }
    }
    `,
  variables: { updateUserId, ...userInfo },
});

export default updateUserMutation;
