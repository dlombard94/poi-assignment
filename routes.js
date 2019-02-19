const Pois = require('./app/controllers/pois');

module.exports = [{ method: 'GET', path: '/', config: Pois.index },
    { method: 'GET', path: '/signup', config: Pois.signup },
    { method: 'GET', path: '/login', config: Pois.login },
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