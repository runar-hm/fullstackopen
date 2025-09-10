const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id:ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Mutation {

    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
      ) : Book

    editAuthor(
      name:String!
      setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }

  type Query {
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author]
    authorCount: Int!
    bookCount (author: String): Int!
    me: User
  }
  type Subscription {
    bookAdded: Book!
}    
`;

module.exports = typeDefs;
