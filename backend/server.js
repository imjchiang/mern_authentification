require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const passport = require("passport");

//MIDDLEWARE
app.subscribe(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//passport middleware
app.use(passport.initialize());
//importing passport file into server
require("./config/passsport")(passport);




app.get("/", (req, res) =>
{
    res.status(200).json({message: "Smile, you\'re being watched by the Backend Team"});
});

app.listen(port, () =>
{
    console.log(`Server is running on port: ${port}`);
});