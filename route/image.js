const fs = require('fs');
const express = require('express');
const imageModel = require('../model/image');
const imageService = require('../service/image');
const userService = require('../service/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // Get the user first
    userService.Find({email: req.params.email}).then((userResult) => {
        if (userResult.success) {
            imageModel.Find({_id: userResult.image})
                .then((imageResult) => {
                    if(imageResult.success) {
                        return res.status(200).send(imageResult);
                    } else {
                        return next(imageResult.error)
                    }
                })
        } else {
            return next(userResult.error)
        }
    });
});

router.post('/', async (req, res, next) => {
    try { // DEBUG
        await imageService.uploadFileMiddleware(req, res);
    } catch (exception) {
        return next(exception)
    }

    const newImage = new imageModel({
        name: req.body.name ?? "avatar",
        image: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/png'
        }
    });

    // Save document to database
    newImage.save()
        .then((imageResult) => {
            userService.Find({email: req.query.email})
                .then((userResult) => {
                    if (userResult.success) {
                        userResult.user.image = imageResult._id
                        userResult.user.save().catch((error) => console.log(`Could not associate new image to user: ${error}`)) // Save async
                        return res.status(201).send({success: true});
                    } else {
                        return next(userResult.error)
                    }
                })
        });
});

module.exports = router;
