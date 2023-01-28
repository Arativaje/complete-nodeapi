const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

exports.register = (req, res,next) => {
    userModel.create(req.body).then(succ => {
        res.send({ msg: "User Registration Successfully.", succ }).end();
        next();
    }).catch(error => {
        res.send({ msg: "User Registration Failed.", error }).end();
        next();
    });
}

exports.get2 = (req, res) => {
    
    if (req.decoded.role === 'ADMIN') {
        userModel.find({}).then(output => {
            res.send(output);
        });
    } else {
        res.status(403).send("!Forbidden, please contact admin");
    }
}

exports.get = (req, res,next) => {
        userModel.find({}).then(output => {
            res.json(output);
            next();
        });
}

exports.login2 = (req, res) => {
    userModel.findOne({ email: req.body.username, pwd: req.body.password }).then(logiUser => {
        if (logiUser === null) {
            res.status(401).send({ msg: "login failed", status: false });
        }
        else {
            // create JWT token and send to ui

            let expiryTime = 60 * 5;
            let payload = {
                role: logiUser.userType,
                userId: logiUser._id
            };
            let key = "sandip";


            let token = jwt.sign(payload, key, { expiresIn: expiryTime });


            res.send({ msg: "login success", status: true, token });
        }
    });
}

exports.login = (req, res,next) => {
    userModel.findOne({ email: req.body.username, pwd: req.body.password }).then(logiUser => {
        if (logiUser === null) {
            res.status(401).send({ msg: "login failed", status: false }).end();
            next();
        }
        else {
            res.send({ msg: "login success", status: true }).end();
            next();
        }
    });
}

exports.getById = (req,res,next)=>{
    userModel.findById(req.params.id).then(user=>{
        res.json(user).end();
        next();
    })
}

exports.updateUser = (req,res,next)=>{
    userModel.findByIdAndUpdate(req.params.id,req.body).then(updatedUser=>{
        res.json(updatedUser).end();
        next();
    })
}

