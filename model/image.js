const mongoose = require('mongoose'); // MongoDB

// What the image schema consist
const ImageSchema = new mongoose.Schema({
    name: String,
    image:
        {
            data: Buffer,
            contentType: String
        }
});

const ImageModel = mongoose.model('image', ImageSchema);

module.exports = ImageModel;