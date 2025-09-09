const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GraphQLError } = require('graphql');

const Book = require('./models/books');
const Author = require('./models/author');
const User = require('./models/user');

mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;
console.log(`Connecting to ${MONGODB_URI}`);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((e) => {
    console.log('Error connecting to mongo: ', e.message);
  });

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
`;

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author');

      if (args.author) {
        const search_author = await Author.findOne({ name: args.author });
        if (!search_author) {
          return null; // TODO: set up errorhandling
        }
        filtered_books = await Book.find({ author: search_author }).populate(
          'author'
        );
        return filtered_books;
      }

      if (args.genre) {
        console.log('search for: ', args.genre);
        const filtered_books = await Book.find({
          genres: [args.genre],
        }).populate('author');
        console.log(filtered_books);
        return filtered_books;
      }

      return books;
    },
    authorCount: (root, args) => authors.length,
    bookCount: (root, args) => {
      if (args.author) {
        return books.filter((b) => b.author === args.author).length;
      }
      return books.length;
    },
    allAuthors: async () => Author.find({}),
    me: async () => User.find,
  },
  Author: {
    bookCount: (root) => {
      return books.filter((b) => b.author === root.name).length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authentication', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        author = await author.save().catch((error) => {
          throw new GraphQLError('Creating Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        });
      }
      const newBook = new Book({ ...args, author: author });
      await newBook.save().catch((error) => {
        throw new GraphQLError('Creating book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      });
      return newBook;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authentication', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const filter = { name: args.name };
      const update = { born: args.setBornTo };
      const updatedAuthor = await Author.findOneAndUpdate(filter, update, {
        new: true,
      }).catch((error) => {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      });
      console.log(updatedAuthor);
      return updatedAuthor;
    },

    createUser: async (root, args) => {
      if (!args.username || !args.favoriteGenre) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            message: 'CREATE USER REQUIRES TWO ARGS: USERNAME, FAVORITEGENRE',
          },
        });
      }

      const user = new User(args);

      user.save().catch((error) => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        });
      });

      return user;
    },
    login: async (root, args) => {
      const user = User.find({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const console_tester = async () => {
  const find = await Author.find({ genres: ['horror'] });
  console.log(find);
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return currentUser;
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
