const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(fileUpload());
app.post('/api/upload', function(req, res){
    if(req.files === null) {
        return res.status(400).json({error: "No file was uploaded"});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, function(err){
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
    });
    return res.status(200).json({message: 'file uploaded', fileName: file.name, filePath: `/uploads/${file.name}`});
})
const PORT = process.env.PORT || 1111;
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
})
