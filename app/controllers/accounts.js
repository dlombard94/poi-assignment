'use strict';
const User = require('../models/user');

const Accounts = {
    index: {
        auth: false,
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Islands' });
        }
    },
    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Islands' });
        }
    },
    signup: {
        auth: false,
        handler: async function(request, h) {
            const payload = request.payload;
            const newUser = new User({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: payload.password
            });
            const user = await newUser.save();
            request.cookieAuth.set({ id: user.id });
            return h.redirect('/home');
        }
    },
    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Islands' });
        }
    },
    login: {
        auth: false,
        handler: async function(request, h) {
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = 'Email address is not registered';
                    throw new Boom(message);
                }
                user.comparePassword(password);
                request.cookieAuth.set({ id: user.id });
                return h.redirect('/home');
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },
    logout: {
        auth: false,
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },
    showSettings: {
        handler: function(request, h) {
            var userEmail = request.auth.credentials.id;
            const userDetails = this.users[userEmail];
            return h.view('settings', { title: 'Islands Settings', user: userDetails });
        }
    },
    updateSettings: {
        handler: function(request, h) {
            const user = request.payload;
            this.users[user.email] = user;
            return h.redirect('/home');
        }
    },
};

module.exports = Accounts;