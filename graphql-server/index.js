import express from 'express';
import graphqlHTTP from 'express-graphql';
import {schema} from './data/schema';

const app = express();
const msg = "Running...";

app.get('/', (req, res) => {
    res.send(msg)
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8000, () => console.log(msg));