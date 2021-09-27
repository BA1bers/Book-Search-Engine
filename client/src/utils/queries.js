import { gql } from "@apollo/client";

// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;