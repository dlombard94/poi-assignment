'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const islandSchema = new Schema({
    area: Number,
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model('Island', islandSchema);