const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const uploadRouter = require("./src/routes/upload.route");
const userRouteroute = require("./src/routes/user.route");
const db = require("./src/config/db");
const { responseMiddleware } = require("./src/middleware/responseMiddleware");
const { logRequest } = require("./src/middleware/logMiddleware");
db.connect();
app.use(bodyParser.json());
app.use(logRequest);
app.use("/", uploadRouter);
app.use("/",userRouteroute);

app.use(responseMiddleware);

app.listen(3000, ()=>{
    console.log('server started')
});

