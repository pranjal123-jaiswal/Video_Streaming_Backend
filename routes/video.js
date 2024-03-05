const { addVideo, getAllVideos , addVideoInFirebase } = require('../controllers/video')
const {  videoUpload   } = require('../middlewares/videoUpload')
const {delete_file} = require("../middlewares/deleteFile")

const router = require('express').Router()


router.post('/upload', videoUpload.single('video'), addVideo)
    .post('/firebaseUpload' , videoUpload.single('video') ,  addVideoInFirebase , delete_file) 
    .get('/videos', getAllVideos)
module.exports = router