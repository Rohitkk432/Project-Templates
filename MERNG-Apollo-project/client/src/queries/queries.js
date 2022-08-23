import { gql } from 'apollo-boost';

//queries in graphql query language
const getUsersQuery = gql`
    {
        users{
            name
            id
            email
        }
    }
`;
const getUserQuery = gql`
    query GetUser($email: String!){
        user(email: $email) {
            name
            email
            id
        }
    }
`;
const addUserMutation = gql`
    mutation AddUser($name: String!, $email: String!){
        addUser(name: $name, email: $email){
            name
            email
            id
        }
    }
`;
const deleteUser = gql`
    mutation deleteUser($id : String!){
        deleteUser(id:$id){
            id
            name
            email
        }
    }
`;