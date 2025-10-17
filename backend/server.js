require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { connectDB } = require('./src/config/database');
const typeDefs = require('./src/schema/schema');
const resolvers = require('./src/resolvers/resolver');

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();


    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();