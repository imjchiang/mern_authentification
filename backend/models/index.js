require("dotenv").config();
const mongoose = require("mongoose");

//Mongo connection
mongoose.connect(process.env.MONGO_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

//mongoose connection object
const db = mongoose.connection;

//set up an event listener to fire once when the connections "opens"
//console log what hose and port it's running on

db.once("open", () =>
{
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on("error", (err) =>
{
    console.log(`Database error \n ${err}`);
});

module.exports.Usser = require("./User");