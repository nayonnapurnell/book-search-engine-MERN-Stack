const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
          },
          savedBooks: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
          },

    },
}


module.exports = resolvers;