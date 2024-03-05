const fs = require('fs');

exports.delete_file = ((req , res , next) => {
    console.log("deletefile" , req.filepath)
    fs.unlink(req.filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });
})