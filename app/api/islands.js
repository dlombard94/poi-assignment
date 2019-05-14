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
};

module.exports = Islands;