const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const { GraphQLError } = require('graphql');

const User = require('./models/user');
const Book = require('./models/books');
const Author = require('./models/author');

const jwt = require('jsonwebtoken');
const { subscribe } = require('graphql');

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
        const filtered_books = await Book.find({
          genres: [args.genre],
        }).populate('author');
        return filtered_books;
      }

      return books;
    },
    // authorCount: (root, args) => authors.length,
    // bookCount: async (root, args) => {
    //   const books = await Book.find({}).populate('author');
    //   if (args.author) {
    //     return books.filter((b) => b.author === args.author).length;
    //   }
    //   return books.length;
    // },
    allAuthors: async () => {
      const [authors, counts] = await Promise.all([
        Author.find({}),
        Book.aggregate([{ $group: { _id: '$author', count: { $sum: 1 } } }]),
      ]);
      const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

      return authors.map((a) => {
        const obj = a.toObject();
        obj.bookCount = countMap.get(String(a._id)) || 0;
        return obj;
      });
    },
    me: async () => User.find,
  },
  // Author: {
  //   bookCount: async (root) => {
  //     const books = await Book.find({}).populate('author');
  //     return books.filter((b) => b.author === root.name).length;
  //   },
  // },
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

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

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
      const user = await User.findOne({ username: args.username });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
