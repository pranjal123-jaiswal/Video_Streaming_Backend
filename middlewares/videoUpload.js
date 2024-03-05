const multer = require('multer');
const path = require('path')
const uuid = require('uuid').v4;
// const videosCollectionRef = require("../db/config.js") 

// const googleStorage = require('@google-cloud/storage');
// const serviceAccount = require("../db/firebaseAccountKey.json");
// var admin = require("firebase-admin");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://video-streaming-4ec42.appspot.com' // Replace with your Firebase Storage bucket URL
//   });

// const firebaseStorage = async (req, res, next) => {
//     const data = req.body
//     console.log(data)
//     try {
//         // Use the add function to add data to the Firestore collection
//         await videosCollectionRef.add(data);
//         res.send("Data sent successfully");
//     } catch (error) {
//         console.error("Error adding document: ", error);
//         res.status(500).send("Error adding document");
//     }
//     // console.log("req" , req)  
//     // try {
//     //     const db = admin.firestore();
//     //     const collectionRef = db.collection('videoStreaming');
//     //     const docRef = collectionRef.doc(req.body.title);

//     //     await docRef.set({
//     //         description: req.body.description,
//     //         videoUrl: req.body.video,  
//     //     });

//     //     res.send('done');
//     //     console.log("file send")
//     // } catch (error) {
//     //     console.error('Error uploading video:', error);
//     //     res.status(500).send('Error uploading video');
//     // }
// }


//destination dir
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'video') {
            const rootDir = path.dirname(require.main.filename);
            cb(null, path.join(rootDir, 'public/').concat('videos'))
        }
    },
    filename: (req, file, cb) => {
        const videoExt = file.mimetype.split('/')[1]
        const id = uuid()
        cb(null, "video_" + id + '.' + videoExt)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'video/mp4') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}
exports.videoUpload = multer({storage, fileFilter})