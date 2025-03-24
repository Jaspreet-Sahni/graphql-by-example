import { ApolloServer } from '@apollo/server';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4'
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js'
import { getUser } from './db/users.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);
const typeDefs = await readFile('./schema.graphql', 'utf-8'); // to read the schema.graphql file

// // commenting basic getcontext function way1
// function getContext({req}) {

//   // console.log('[getContext] req.body:', req.body);
//    console.log('step 1 , step 2 is resolver[getContext] req.auth:', req.auth);
//   // console.log('[getContext] req:', req);
//   // return { weather: "Sunny"}
//   return { auth: req.auth}
// }

// skipping way 2, Advance getContext function way3
async function getContext({req}) {
  // console.log('[getContext] req.body:', req.body);
   console.log('step 1 , step 2 is resolver[getContext] req.auth:', req.auth);
  // console.log('[getContext] req:', req);
  
  if(req.auth){
    const user = await getUser(req.auth.sub);
    console.log("server user", user)
    return {user};

  }
  // return { weather: "Sunny"}
  return { }
}
const apolloServer = new ApolloServer({typeDefs, resolvers })
await apolloServer.start();
app.use('/graphql',apolloMiddleware(apolloServer, {context: getContext}))

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
