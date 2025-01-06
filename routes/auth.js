const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../schema/user'); 

const router = express.Router();



/* GET /login - Render login form */
router.get('/login', (req, res) => {
  res.render('login'); // Adjust for your frontend setup
});

/* POST /login/password - Authenticate user */
router.post(
    '/login/password',
    passport.authenticate('local', { failureRedirect: '/auth', failureMessage: true }),
    (req, res) => {
      res.status(200).json({
        message: 'Login successful',
        user: { id: req.user._id, username: req.user.username },
      });
    }
  );

router.post('/logout', (req, res, next) => {
    req.logout;
    res.redirect('/');
});

/* GET /signup - Render signup form */
router.get('/signup', (req, res) => {
  res.render('signup'); // Adjust for your frontend setup
});


router.post('/signup', async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Generate salt and hash the password
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) return next(err);
  
        try {
          // Create and save the new user
          const user = new User({
            username,
            hashed_password: hashedPassword.toString('hex'),
            salt,
          });
  
          await user.save();
  
          // Log the user in after signup
          req.login(user, (err) => {
            if (err) return next(err);
            return res.status(201).json({
              message: 'User created successfully',
              user: { id: user._id, username: user.username },
            });
          });
        } catch (dbError) {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Database operation failed' });
        }
      });
    } catch (err) {
      console.error('Signup error:', err);
      next(err);
    }
  });

module.exports = router;