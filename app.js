import express from "express";
import connectDB from './config/db.js';
import schemas from './schemas/index.js';
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer.js';

import cors from 'cors';

const port = process.env.ENV_PORT || 5000
connectDB();

const app = express()
// Apply middleware
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schemas,
    graphiql: true, // Enable GraphiQL for testing in the browser
  })
);

// Create Apollo Server
const server = new ApolloServer({
  schema: schemas,
  context: ({ req }) => ({ req })
});
await server.start()
// Apply Apollo middleware to Express
server.applyMiddleware({ app });

app.listen(port, () => console.log(`Server started on port ${port}`));
