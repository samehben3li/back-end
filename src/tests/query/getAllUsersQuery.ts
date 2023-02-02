const getAllUsersQuery = {
  query: ` 
  query Query {
    getUsers {
      email
      id
      isAdmin
      username
    }
  }  
    `,
};

export default getAllUsersQuery;
