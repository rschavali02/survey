const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Database connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Session setup
app.use(
  session({
    secret: 'your_secret_key', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 1000, // 2 minutes
    },
  })
);

// Passport setup
const User = require('../schema/user'); // Mongoose user schema

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Fetch user from DB
    done(null, user); // Attach user to req.user
  } catch (err) {
    done(err);
  }
});

// Local strategy setup
const LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      // Verify password (assuming a `verifyPassword` method in your User model)
      const isMatch = await user.verifyPassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to expose `req.user` to templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const surveyRoutes = require('../routes/surveyRoutes');
const surveyTemplateRoutes = require('../routes/templates');
const authRouter = require('../routes/auth');

// API routes
app.use('/api/surveys', surveyRoutes);
app.use('/api/templates', surveyTemplateRoutes);
app.use('/api/auth', authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});