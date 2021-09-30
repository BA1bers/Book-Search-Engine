const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('__v -password');

                return userData;
            }
            throw new AuthenticatioError('You must be logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log('generatingtoken')
            const token = signToken(user);
            return {
                token,
                user
            };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Improper credentials, try again');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Improper credentials, try again');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You must be logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { saveBook: { bookId: bookId } } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You must be logged in');
        }
    },
};

module.exports = resolvers;