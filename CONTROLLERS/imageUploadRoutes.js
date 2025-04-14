const express = require('express');
const router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const User = require('../MODELS/UserSchema');

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

router.post('/uploadprofilepic' , upload.single('myimage') , async (req , res) => {
  //  res.send('Router is working!');
  try {
    const file = req.file;
    const {userid} = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const existingUser = await User.findById(userid);
    if(!existingUser)
    {
        return res.status(400).json({error : 'No user found'});
    }
    cloudinary.uploader.upload_stream({resource_type : 'auto'},async(error , result) => {
       if(error)
       {
        console.error('Cloudinary Upload Error ' , error);
        return res.status(500).json({error : 'Error uploading image to cloudinary'});
       }
     // Save URL to user document if needed
     existingUser.profilePic = result.secure_url;
     await existingUser.save();

     res.status(200).json({ message: 'Upload successful', url: result.secure_url });
       //res.send(result);
    }).end(file.buffer);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
}

});

module.exports = router;