const express = require('express');
const dotenv = require("dotenv");
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();
const Port = process.env.PORT || 4000 ;

dotenv.config();

// allow cross-origin requests
app.use(cors());

//mongoDB Atlas
mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

//test 
app.get('/', (req, res) => res.send('Hello from Express!'));

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // this is for testing purposes with graphiql client
}));

app.listen(Port, () => {
    console.log(`now listening for requests on port ${Port}`);
});