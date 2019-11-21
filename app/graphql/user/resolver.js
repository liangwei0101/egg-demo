'use strict';

module.exports = {
  Query: {
    async user(root, { }, ctx) {
      return await ctx.model.User.find();
    },
  },
  Mutation: {
    async user(root, { }, ctx) {
      return await ctx.model.User.findOne();
    },
  }
}