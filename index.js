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
