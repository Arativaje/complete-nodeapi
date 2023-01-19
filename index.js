const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const uploadRouter = require("./src/routes/upload.route");
const userRouteroute = require("./src/routes/user.route");
const db = require("./src/config/db");
db.connect();
app.use(bodyParser.json());

app.use("/",uploadRouter);
app.use("/",userRouteroute);

app.listen(3000, ()=>{
    console.log('server started')
});

