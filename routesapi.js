const IslandsApi = require('./app/api/islands');

module.exports = [
    { method: 'GET', path: '/api/islands', config: IslandsApi.find },
    { method: 'GET', path: '/api/islands/{id}', config: IslandsApi.findOne },
    { method: 'POST', path: '/api/islands', config: IslandsApi.create },
    { method: 'DELETE', path: '/api/islands/{id}', config: IslandsApi.deleteOne },
    { method: 'DELETE', path: '/api/islands', config: IslandsApi.deleteAll },
];