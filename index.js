const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });
let MONGODB = process.env.URL;
let PORT = process.env.PORT;
//   ApolloServer
// typeDefs: GraphQL type definitions
// resolver: How do you resolve the queries
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: "true",
  })
  .then(() => {
    console.log("MongoDB connection successful");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
