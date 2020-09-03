require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const passport = require("passport");

const users = require("./routes/api/users");

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//passport middleware
app.use(passport.initialize());
//importing passport file into server
require("./config/passport")(passport);


//ROUTES
app.get("/", (req, res) =>
{
    res.status(200).json({message: "Smile, you\'re being watched by the Backend Team"});
});

app.use("/api/users", users);

app.listen(port, () =>
{
    console.log(`Server is running on port: ${port}`);
});
