'use strict';
const Island = require('../models/island');
const User = require('../models/user');

const Islands = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Your Island Experience' });
        }
    },
    list: {
        handler: async function(request, h) {
            const islands = await Island.find().populate('user')
            return h.view('list', {
                title: 'List of Islands',
                islands: islands
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
                    area: data.area,
                    name: data.name,
                    user: user._id
                });
                await newIsland.save();
                return h.redirect('/list');
            }catch (err) {
            return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Islands;