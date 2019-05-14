const Islands = require('./app/api/islands');

module.exports = [
    { method: 'GET', path: '/api/islands', config: Islands.find }
];