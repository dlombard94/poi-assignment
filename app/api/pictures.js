'use strict';

const Boom = require('boom');
const Picture = require('../models/picture');
const Island = require('../models/island')

const Pictures = {
    findAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function (request, h) {
            const pictures = await Picture.find();
            return pictures;
        }
    },

    findByIsland: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            console.log(request.params.id);
            const pictures = await Picture.find({ island: request.params.id });
            return pictures;
        }
    },
    addPicture: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            let picture = new Picture(request.payload);
            const island = await Island.findOne({ _id: request.params.id });
            if (!picture) {
                return Boom.notFound('No Island with this id');
            }
            picture.island = island._id;
            picture = await picture.save();
            return picture;
        }
    },
    deletePictures: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            await Picture.deleteMany({island: request.params.id });
            return { success: true };
        }
    },
    deleteAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            await Picture.deleteMany({});
            return { success: true };
        }
    }
};

module.exports = Pictures;