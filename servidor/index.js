import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path: 'variables.env'});

const app = express();
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: async({req}) => {
        const token = req.headers['authorization'];
        if (token !== "null") {
            try {
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);
                req.usuarioActual = usuarioActual;

                return { usuarioActual };
            } catch(err) {
                console.error(err);
            }
        }
    }
});
const msg = "Running on http://localhost:8000" + server.graphqlPath;

server.applyMiddleware({app});

app.listen({port: 8000}, () => console.log(msg));