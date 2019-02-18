const Pois = require('./app/controllers/pois');

module.exports = [{ method: 'GET', path: '/', config: Pois.index },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        }
    }
    ];