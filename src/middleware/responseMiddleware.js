exports.responseMiddleware = (req, res) => {
    req.on("end",  ()=> {
        console.log("Outgoing Request with Payload "+ req.method + ': ' + req.path + ' -> ' + res.statusCode + ': ' + res.body + '\n');
    });
};
