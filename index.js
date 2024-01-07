import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token);
    return { user };
  },
});

const { url } = await startStandaloneServer({ server, listen: { port: 4000  } });

console.log(`🚀 Server ready at ${url}:4000`);
