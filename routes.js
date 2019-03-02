const Islands = require('./app/controllers/island');
const Accounts = require('./app/controllers/accounts');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    { method: 'POST', path: '/addisland', config: Islands.addIsland },
    { method: 'POST', path: '/categorize', config: Islands.categorizeIslands },
    { method: 'GET', path: '/islandlist/deleteisland/{islandid}', config: Islands.deleteIsland },
    { method: 'GET', path: '/islandlist/showisland/{islandid}', config: Islands.showIsland },
    { method: 'POST', path: '/updateisland/{islandid}', config: Islands.updateIsland },



    { method: 'GET', path: '/list', config: Islands.list },
    { method: 'GET', path: '/home', config: Islands.home },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
    ];