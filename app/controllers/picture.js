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
                const result = cloudinary.uploader.upload('./upload/temp.img',result => {
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
    deletePicture: {
        handler: async function(request, h) {
            try {
                const pics = await Picture.find().populate('island');
                const islands = await Island.find().populate('addedBy');
                const picId = request.params.pictureid;
                const islandId = request.params.islandid;
                console.log("picId: " + picId);
                console.log("IslandId: " + islandId);

                // get index of object with pictureid passed in through route
                var removeIndex = pics.map(function(item) { return item.id; }).indexOf(picId);
                console.log("Index to be remove: " + removeIndex);

                //getting rid of the picture that is to be deleted from pictures array
                const requiredPicture = pics[removeIndex];
                console.log("Required Pic: " + requiredPicture);

                const island = await Island.findById(islandId);
                console.log("Pic Belongs to: " + island);

                console.log(island.pictures.length);

                if(island.pictures.length != 0){
                    for (var i = 0; i < island.pictures.length; i++){
                        if(island.pictures[i]._id.equals(picId)){
                            console.log("winner: ");
                            island.pictures.splice(i,1);
                            console.log(island);
                        }
                    }
                }


                await requiredPicture.remove();
                console.log(islands)
                console.log(pics);
                //await cloudinary.v2.uploader.destroy("island2", {});
                return h.redirect('/list');
            } catch (err) {
                return h.view('list', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Pictures;