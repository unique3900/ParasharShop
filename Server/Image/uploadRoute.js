const express = require('express');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs')

const router = express.Router();

const server=express()


// If Post -> /upload then upload by url and if / then upload local
const photoMiddleware = multer({dest:'uploads/'});


router.post('/', photoMiddleware.array('photos', 4), async (req, res) => {
    try {
        const uploadedFiles = [];
        for (var i = 0; i <= req.files.length; i++){
            const {path,originalname} = req.files[i];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            const newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads\\',''));
        }
        res.status(200).json({success:true,message:"Local Image Uploaded Successfully",uploadedFiles})
    } catch (error) {
        res.status(401).json({success:false,message:'Uploading Local Image Failed',error})
        console.log(error)
    }
}).post('/upload-link', async (req, res) => {
    try {
        const { imageURL } = req.body;
        const newName = 'photo' + Date.now() + '.jpg';
        await imageDownloader.image({
            url: imageURL,
            dest: __dirname + '/uploads/' + newName
        })
        res.status(200).json({success:true,message:"Image Uploaded Successfully",newName})
    } catch (error) {
        res.status(401).json({success:false,message:"Image Upload Failed",error})
        console.log(error)
    }
})


exports.router = router;