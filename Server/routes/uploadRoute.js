const express = require('express');
const imageDownloader = require('image-downloader');
const router = express.Router();

// If Post -> /upload then upload by url and if / then upload local
router.post('/upload-link', async (req, res) => {
    const { imageURL } = req.body;
    try {
        const newName = 'photo' + Date.now() + '.jpg';
        await imageDownloader.image({
            url: newName,
            dest: __dirname + '/uploads' + newName
        })
        res.status(200).json({success:true,message:"Image Uploaded Successfully",image:newName})
    } catch (error) {
        res.status(401).json({success:false,message:"Image Upload Failed"})
        console.log(error)
    }
})


exports.router = router;