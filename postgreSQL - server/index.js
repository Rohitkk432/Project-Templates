const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./pool');
const routes = require('./routes/routes');

//middleware
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 5000 ;

pool.connect({
    host : process.env.POSTGRES_HOST,
    port : process.env.POSTGRES_PORT,
    database : process.env.POSTGRES_DATABASE,
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD
});

app.use('/',routes);

//cors settings - allow all origins 
//@notice change in production
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});

app.listen(Port,()=>{
    console.log(`server started on port ${Port} `);
});