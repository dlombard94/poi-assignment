const IslandsApi = require('./app/api/islands');
const Users= require('./app/api/users');
const Pictures = require('./app/api/pictures');


module.exports = [
    { method: 'GET', path: '/api/islands', config: IslandsApi.find },
    { method: 'GET', path: '/api/islands/{id}', config: IslandsApi.findOne },
    { method: 'POST', path: '/api/islands', config: IslandsApi.create },
    { method: 'DELETE', path: '/api/islands/{id}', config: IslandsApi.deleteOne },
    { method: 'DELETE', path: '/api/islands', config: IslandsApi.deleteAll },

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/users', config: Users.create },
    { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

    { method: 'GET', path: '/api/pictures', config: Pictures.findAll },
    { method: 'GET', path: '/api/islands/{id}/pictures', config: Pictures.findByIsland },
    { method: 'POST', path: '/api/islands/{id}/pictures', config: Pictures.addPicture },
    { method: 'DELETE', path: '/api/pictures', config: Pictures.deleteAll }




];