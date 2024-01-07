import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";

import db from "./_db.js";

const resolvers = {
  Query: {
    games: () => db.games,
    game: (parent, args) => db.games.find((game) => game.id === args.id),
    authors: () => db.authors,
    author: (parent, args) =>
      db.authors.find((author) => author.id === args.id),
    reviews: () => db.reviews,
    review: (parent, args) =>
      db.reviews.find((review) => review.id === args.id),
  },
  // Relationship resolvers
  Game: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.game_id === parent.id),
  },
  Review: {
    author: (parent) =>
      db.authors.find((author) => author.id === parent.author_id),
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
  },
  Author: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.author_id === parent.id),
  },
  // Mutations
  Mutation: {
    deleteGame: (parent, args) => {
      const deletedGame = db.games.find((game) => game.id === args.id);
      db.games = db.games.filter((game) => game.id !== args.id);
      return deletedGame;
    },
    addGame: (parent, args) => {
      const newGame = { id: String(db.games.length + 1), ...args.game };
      db.games.push(newGame);
      return newGame;
    },
    updateGame: (parent, args) => {
      let updatedGame = db.games.find((game) => game.id === args.id);
      Object.assign(updatedGame, args.game);
      return updatedGame;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token);
    return { user };
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server ready at ${url}`);
