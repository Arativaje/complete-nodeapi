const mongoose = require('mongoose');
const connect = () =>{
    const url="mongodb://localhost:27017/db";
    //console.log(url);
    // mongoose.connect(url,{useNewUrlParser: true});
   

    // mongoose.connection.once("open", async () => {
    //     console.log("Connected to database");
    // });
      
    // mongoose.connection.on("error", (err) => {
    //     console.log("Error connecting to database  ", err);
    // });
    mongoose.set('strictQuery', true);
    mongoose.connect(url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          console.log('Connected to database !!');
        })
        .catch((err)=>{
          console.log('Connection failed !!'+ err.message);
        });
}

module.exports={
    connect
}

