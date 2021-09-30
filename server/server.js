// import express
const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolvers from schema folder
const { typeDefs, resolvers } = require('./schemas')
console.log("schema's imported")
// const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const path = require('path');
const db = require('./config/connection');

//remove this for now
//const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// create new Apollo server and pass in schema
async function startServer() {

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: authMiddleware, 
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  // playground: true
});
await server.start();
//adding Apollo server middlewear here
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

process.on

}

startServer();