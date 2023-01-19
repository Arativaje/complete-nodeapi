const express = require("express");
const app = express();
const uploadRouter = require("./src/routes/upload.route");

app.use("/",uploadRouter);

app.listen(3000, ()=>{
    console.log('server started')
});

