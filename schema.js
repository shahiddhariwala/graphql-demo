export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        content: String!
        rating: Int!
        author: Author!
        game: Game!
    }

    type Author {
        id: ID!
        name: String!
        reviews: [Review]!

    }

    type Query {
        games: [Game]!
        game(id: ID!): Game
        authors: [Author]!
        author(id: ID!): Author
        reviews: [Review]!
        review(id: ID!): Review
    }

`;

// Data types supported by GraphQL
// int, float, string, boolean, ID
//  - ID is a special type that is serialized in the same way as a string
//  - ID is used to identify a unique object or record
//  - ID is serialized as a string, but not all strings are IDs
//  - ID is not intended to be human-readable

// type Query is must be defined in GraphQL schema
//  - Query is a special type in GraphQL
//  - Query is a root type
//  - Query is the entry point for all GraphQL queries
//  - Query is the entry point for all GraphQL mutations
//  - Query is the entry point for all GraphQL subscriptions
//  - Query is the entry point for all GraphQL fragments
//  - Query is the entry point for all GraphQL directives
//  - Query is the entry point for all GraphQL scalars
