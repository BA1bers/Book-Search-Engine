import { gql } from '@apollo/client'

// Defined login mutation type to accept an email and password parameters, returns an Auth type
export const USER_LOGIN = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

// Defined add user mutation type to accept a username, email, and password as parameters; returns an Auth type
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            }
        }
    }
`;

// Defined save book to accept a book author's array, description, title, bookId, image, and link as parameters; returns a user type.
export const SAVE_BOOK = gql`
    mutation saveBook($book: SavedBookInput!) {
        saveBook(book: $book) {
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

// Defined remove book to accept a book's bookId as a parameter; returns a user type
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
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
