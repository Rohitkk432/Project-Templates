const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");


const app = express();
const Port = process.env.PORT || 5000 ;

//mongoDB Atlas
mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// allow cross-origin requests
app.use(cors());

app.use(express.json());
app.use( '/', routes);

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

app.listen(Port, () => {
    console.log(`App listening at http://localhost:${Port}`);
});