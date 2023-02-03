const deleteUserMutation = (deleteUserId: string) => ({
  query: `
    mutation Mutation($deleteUserId: ID!) {
      deleteUser(id: $deleteUserId)
    }
  `,
  variables: deleteUserId,
});

export default deleteUserMutation;
