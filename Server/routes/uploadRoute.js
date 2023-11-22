const express = require('express');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs=require('fs')
const router = express.Router();

const photoMiddleware = multer({dest:'D:/Web Dev/MERN projects/ParasharShop/ParasharShop/Server/uploads/'});

// If Post -> /upload then upload by url and if / then upload local
router.post('/upload-link', async (req, res) => {
    const { imageURL } = req.body;
    try {
       
        const newName = 'photo' + Date.now() + '.jpg';
        await imageDownloader.image({
            url: imageURL,
            dest: 'D:/Web Dev/MERN projects/ParasharShop/ParasharShop/Server/uploads/'+newName,
        });
        res.status(200).json({success:true,message:"Image Uploaded Successfully",image:newName})
    } catch (error) {
        res.status(401).json({success:false,message:"Image Upload Failed",error})
        console.log(error)
    }
}).post('/', photoMiddleware.array('photos', 5), async (req, res) => {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++){
            const {path,originalname} = req.files[i];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            const newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('D:/Web Dev/MERN projects/ParasharShop/ParasharShop/Server/uploads/',''));
        }
        res.status(401).json({success:true,message:"Local Image Uploaded Successfully",uploadedFiles})
    } catch (error) {
        res.status(401).json({success:false,message:"Local Image Upload Failed",error})
        console.log(error)
    }
})


exports.router = router;