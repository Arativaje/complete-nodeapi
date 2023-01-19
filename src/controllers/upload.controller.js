const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
    accessKeyId: "AKIARMNDXPJ3XSF7SDOY",
    secretAccessKey: "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"
});



exports.upload = (req, res) => {

    console.log(req.file);
    // res.send(req.file);
    console.log(req.body);
    const filename = req.file.path
    const fileContent = fs.readFileSync(filename)

    const params = {
        Bucket: 'mybucketarati',
        Key: req.file.originalname,
        Body: fileContent
    }

    s3.upload(params, (err, data) => {
        if (err) {
            res.end("File upload failed"+err);
        }
         
        fs.unlink(req.file.path, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('Temp File Delete');
        }); 

        res.end("File Uploaded"); 
    });
    
}

