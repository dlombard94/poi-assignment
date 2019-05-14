'use strict';

const Island = require('../models/island');

const Islands = {

    find: {
        auth: false,
        handler: async function(request, h) {
            const islands = await Island.find();
            return islands;
        }
    },
    findOne: {
        auth: false,
        handler: async function(request, h) {
            try {
                const island = await Island.findOne({ _id: request.params.id });
                if (!island) {
                    return Boom.notFound('No Island with this id');
                }
                return island;
            } catch (err) {
                return Boom.notFound('No Island with this id');
            }
        }
    },
    create: {
        auth: false,
        handler: async function(request, h) {
            const newIsland = new Island(request.payload);
            const island = await newIsland.save();
            if (island) {
                return h.response(island).code(201);
            }
            return Boom.badImplementation('error creating island');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Island.remove({});
            return { success: true };
        }
    },

    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const island = await Island.remove({ _id: request.params.id });
            if (island) {
                return { success: true };
            }
            return Boom.notFound('id not found');
        }
    }
};

module.exports = Islands;