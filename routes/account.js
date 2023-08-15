/**
 * @file account.js - Express Router for User Account Handling
 */

/**
 * This module defines an Express router responsible for handling user account related routes, including login and signup.
 * It utilizes bcrypt for password hashing and user authentication.
 * @module accountRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

/**
 * Handles POST request for user signup.
 * @name POST/signup
 * @function
 * @memberof module:accountRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/signup', async (req, res) => {
    // Extract and trim user input
    const firsname = req.body.first.trim();
    const lasname = req.body.last.trim();
    const username = req.body.username.trim();
    const password = req.body.signuppassword.trim();
    const confirmpassword = req.body.confirmpassword.trim();

    // Check if passwords match
    if (password != confirmpassword) {
        res.render('signup', { show_login: false, message: "Passwords Don't match" });
        return;
    }

    // Check if user already exists
    const user = await req.db.findUserByUserName(username);
    if (user) {
        res.render('signup', { show_login: true, message: 'This account already exists!' });
        return;
    }

    // Generate hash from password and create new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await req.db.createUser(firsname, lasname, username, hash);

    // Set session for the new user and redirect to home
    req.session.user = await req.db.findUserByUserName(username)
    res.redirect('/');
});

/**
 * Handles GET request for user account page.
 * @name GET/account
 * @function
 * @memberof module:accountRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/account', async (req, res) => {
    res.render('account', { title: 'Login', show_login: false, at_Home: false });
});

/**
 * Handles POST request for user login.
 * @name POST/account
 * @function
 * @memberof module:accountRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/account', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    // Find user and admin by username
    const user = await req.db.findUserByUserName(username);
    const admin = await req.db.findAdminByUsername(username);

    // Check user and admin authentication
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/');
        return;
    } else if (admin && bcrypt.compareSync(password, admin.password)) {
        req.session.Admin = admin;
        res.redirect('/');
        return;
    } else if (!user) {
        res.render('account', { show_login: false, message: 'Could not find.' });
        return;
    } else if (!admin) {
        res.render('account', { show_login: false, message: 'Get outta here.' });
        return;
    }
});

/**
 * Handles GET request for user signup page.
 * @name GET/signup
 * @function
 * @memberof module:accountRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up', show_login: false });
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:accountRouter
 */
module.exports = router;