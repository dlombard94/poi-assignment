'use strict';

const Accounts = {
    index: {
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Islands' });
        }
    },
    showSignup: {
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Islands' });
        }
    },
    signup: {
        handler: function(request, h) {
            return h.redirect('/home');
        }
    },
    showLogin: {
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Islands' });
        }
    },
    login: {
        handler: function(request, h) {
            return h.redirect('/home');
        }
    },
    logout: {
        handler: function(request, h) {
            return h.redirect('/');
        }
    }
};

module.exports = Accounts;