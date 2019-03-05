'use strict';
const Island = require('../models/island');
const User = require('../models/user');
const Picture = require('../models/picture');

const Joi = require('joi');


const Islands = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Your Island Experience' });
        }
    },
    list: {
        handler: async function(request, h) {
            const islands = await Island.find().populate('addedBy');
            const pics = await Picture.find().populate('island');

            for (var i=0; i < islands.length; i++) {
                //have to wipe the pics to avoid doubling up after deleting another pic
                islands[i].pictures.length = 0;
                for (var j=0; j < pics.length; j++) {
                    if(islands[i]._id.equals(pics[j].island._id)){
                        islands[i].pictures.push(pics[j]);
                        await islands[i].save();
                    }
                }
            }

            return h.view('list', {
                title: 'List of Islands',
                islands: islands,
            });
        }
    },
    addIsland: {
        handler: async function(request, h) {
            try{
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newIsland = new Island({
                    name: data.name,
                    area: data.area,
                    description: data.description,
                    location:{
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    category: data.category,
                    addedBy: user._id
                });
                await newIsland.save();
                return h.redirect('/list');
            }catch (err) {
            return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    categorizeIslands: {
        handler: async function(request, h) {
            try{
                const id = request.auth.credentials.id;

                const user = await User.findById(id);

                const data = request.payload;

                const islands = await Island.find().populate('addedBy');


                const categorizedIslands = [];

                if (data.choice === "south"){

                    const southIslands = [];
                    var i;
                    for (i = 0; i < islands.length; i++) {
                        if(islands[i].category === "South") {
                            southIslands.push(islands[i]);
                        }
                    };
                    console.log(southIslands)
                    return h.view('list', {categorizedIslands : southIslands});

                } else if (data.choice === "north"){

                    const southIslands = [];
                    var i;
                    for (i = 0; i < islands.length; i++) {
                        if(islands[i].category === "South") {
                            southIslands.push(islands[i]);
                        }
                    };
                    console.log(southIslands)
                    return h.view('list', {categorizedIslands : southIslands});

                } else if (data.choice === "west"){

                    const southIslands = [];
                    var i;
                    for (i = 0; i < islands.length; i++) {
                        if(islands[i].category === "South") {
                            southIslands.push(islands[i]);
                        }
                    };
                    console.log(southIslands)
                    return h.view('list', {categorizedIslands : southIslands});

                } else {

                    const southIslands = [];
                    var i;
                    for (i = 0; i < islands.length; i++) {
                        if(islands[i].category === "South") {
                            southIslands.push(islands[i]);
                        }
                    };
                    console.log(southIslands)
                    return h.view('list', {categorizedIslands : southIslands});

                }

            }catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    deleteIsland: {
        handler: async function(request, h) {
            try {
                console.log(request.params.islandid);

                const islandId = request.params.islandid ;
                console.log(islandId);

                var correctIslandId = islandId.slice(0, -1);
                console.log(correctIslandId);

                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const islands = await Island.find().populate('addedBy');

                // get index of object with islandid passed in through route
                var removeIndex = islands.map(function(item) { return item.id; }).indexOf(correctIslandId);
                console.log(removeIndex);

                //getting rid of the island that is to be deleted form array
                // islands.splice(removeIndex,1)
                // console.log(islands)
                const requiredIsland = islands[removeIndex];
                console.log(requiredIsland)

                await requiredIsland.remove();

                return h.redirect('/list');
                //return h.view('list', { title: 'Islands List', islands: islands });
            } catch (err) {
                return h.view('list', { errors: [{ message: err.message }] });
            }
        }
    },
    showIsland: {
        handler: async function(request, h) {
            try {
                console.log(request.params.islandid);

                const islandId = request.params.islandid ;
                console.log(islandId);

                var correctIslandId = islandId.slice(0, -1);
                console.log(correctIslandId);

                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const islands = await Island.find().populate('addedBy');
                var requiredIndex = islands.map(function(item) { return item.id; }).indexOf(correctIslandId);
                console.log(requiredIndex);

                const requiredIsland = islands[requiredIndex];
                console.log(requiredIsland)

                return h.view('islandsettings', { title: 'Update Island', island: requiredIsland });
            } catch (err) {
                return h.view('list', { errors: [{ message: err.message }] });
            }
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

                console.log("island again: " + island);
                await island.save();

                await requiredPicture.remove();
                await island.save();
                console.log(islands);
                console.log(pics);
                //await cloudinary.v2.uploader.destroy("island2", {});
                return h.redirect('/list');
            } catch (err) {
                return h.view('list', { errors: [{ message: err.message }] });
            }
        }
    },
    updateIsland: {
        // validate: {
        //     payload: {
        //         name: Joi.string().required(),
        //         area: Joi.number().required(),
        //     },
        //     options: {
        //         abortEarly: false
        //     },
        //     failAction: function(request, h, error) {
        //         return h
        //             .view('islandsettings', {
        //                 title: 'Update error',
        //                 errors: error.details
        //             })
        //             .takeover()
        //             .code(400);
        //     }
        // },
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                console.log(userEdit)
                console.log(request.params.islandid);

                const islandId = request.params.islandid ;
                console.log(islandId);
                //dont have to get rid of " because that's done in the showisland method

                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const islands = await Island.find().populate('addedBy');
                var requiredIndex = islands.map(function(item) { return item.id; }).indexOf(islandId);
                console.log(requiredIndex);

                const requiredIsland = islands[requiredIndex];

                requiredIsland.name = userEdit.name;
                requiredIsland.area = userEdit.area;
                requiredIsland.description = userEdit.description;
                requiredIsland.category = userEdit.category;
                requiredIsland.location.latitude = userEdit.latitude;
                requiredIsland.location.longitude = userEdit.longitude;
                await requiredIsland.save();

                console.log(requiredIsland)
                return h.view('list', { title: 'Islands List', islands: islands });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Islands;