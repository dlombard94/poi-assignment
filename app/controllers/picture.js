'use strict';

const Island = require('../models/island');
const User = require('../models/user');
const Picture = require('../models/picture');
const fs = require('fs');
const cloudinary = require('cloudinary');

const Joi = require('joi');
const env = require('dotenv')
const cloudinaryConfig = {
    "cloud_name": "dlombard94",
    "api_key": "518919414164223",
    "api_secret": "5gtTQaciUESPpQyQiMgdP3orVkk",
};
cloudinary.config(cloudinaryConfig);


const Pictures = {

    uploadPicture: {
        handler: async function (request,h) {
            const title = request.payload.title;
            const islandId = request.params.islandid;
            const island = await Island.findById(islandId);

            const pictures = await Picture.find();
            const islands = await Island.find().populate('addedBy')


            const response = fs.writeFile('./upload/temp.img', request.payload.file, err => {
                if(err){

                }
                const result = cloudinary.uploader.upload('./upload/temp.img', result => {
                    console.log(result);
                    const newPicture = new Picture({
                        img: result.url,
                        title: title,
                        island: island._id,
                    });
                    newPicture.save();
                });
                return h.redirect('/home');
            })
            return h.redirect('/home');
        }
    },

    deletePicture:  {
            handler: async function(request, h) {
            await cloudinary.v2.uploader.destroy("island2", {});
            return h.redirect('/list');
        }
    },
};

module.exports = Pictures;