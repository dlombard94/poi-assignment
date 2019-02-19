'use strict';

const Pois = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Your Island Experience' });
        }
    }
};

module.exports = Pois;