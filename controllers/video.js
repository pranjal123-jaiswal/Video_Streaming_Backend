const VideoSchema = require('../models/VideoModel');
const admin = require("firebase-admin");
const serviceAccount = require("../db/firebaseAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.storageBucket // Replace with your Firebase Storage bucket URL
  });

exports.addVideo =  async (req, res) => {
    const {title, description} = req.body;
    const videoPath = req.file.path;

    const video = new VideoSchema({
        title,
        description,
        filename: req.file.filename,
        videoUrl: videoPath
    })

    try {
        await video.save();
        res.status(200).json({
            message: 'Video Uploaded Succesfully',
            video
        })
    } catch (error) {
        res.status(400).json({
            message: 'Video upload failed',
            error
        })
    }
}

exports.addVideoInFirebase = async (req , res , next) => {
    const {title, description} = req.body;
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }

    // Get the path of the uploaded video file
    const filePath = req.file.path;
    req.filePath = filePath

    // Upload the file to Firebase Storage
    const bucket = admin.storage().bucket();
    const fileName = `${req.file.originalname}`;
    const file = bucket.file(fileName);

    try {
        await bucket.upload(filePath, {
            destination: fileName,
            metadata: {
                contentType: req.file.mimetype
            }
        });

        // Get the public URL of the uploaded file
        const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2100' });

        const video = new VideoSchema({
            title,
            description,
            filename: req.file.filename,
            videoUrl: url
        })

        try {
            await video.save();
            res.status(200).json({
                message: 'Video Uploaded Succesfully',
                video
            })
        } catch (error) {
            res.status(400).json({
                message: 'Video upload failed',
                error
            })
        }

        // Send the URL back to the client
        console.log("url" , url)
        // res.send("send successfull");
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
    next()
}

exports.getAllVideos = async (req, res) => {
    try {
        console.log("video enter" )
        const videos = await VideoSchema.find({});
        // console.log("videos " , videos)
        res.status(200).json({ videos });
    } catch (error) {
        // Check if headers have already been sent
        if (res.headersSent) {
            console.error('Headers have already been sent, cannot send error response.');
            return;
        }

        // Send error response only if headers have not been sent 
        res.status(400).json({ message: 'Videos fetch failed', error });
    }
};
