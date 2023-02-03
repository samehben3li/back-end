import { IUserInfo } from '../../interfaces';

const updateUserMutation = (id: string, userInfo: IUserInfo) => ({
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
  variables: { updateUserId: id, ...userInfo },
});

export default updateUserMutation;
