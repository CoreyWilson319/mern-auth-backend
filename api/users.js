// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const db = require('../models')

// Models
const User = require('../models/User')

// GET api/users/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK!'});
});

// POST api/users/register (Public)
router.post('/register', (req, res) => {
    // Find user by email
    User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exist, send a 400 response
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' })
        } else {
            // Create a new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Salt and hash the password, then save the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw Error;
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err2 => console.log(err2))
                })
            })
        }
    })
})
module.exports = router;