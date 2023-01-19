const userModel = require("../model/user.model");

exports.register = (req, res) => {

    console.log(req.body);
    userModel.create(req.body);
    // Store data in mongodb

    res.send({msg:"User Registration Successfully."})
    
}

exports.get = (req,res)=>{
    userModel.find({}).then(output=>{
        res.send(output);
    });
}

