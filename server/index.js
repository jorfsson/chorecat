require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // path is used to join image file names with __dirname
const bcrypt = require('bcrypt');
// Used for auth
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { findUser } = require('../database/');

const breakfast = process.env.AUTH_KEY || 'nyannyan';

// Routes
const users = require('./routes/users');
const chores = require('./routes/chores');
const calendar = require('./routes/calendar');

const port = process.env.PORT || 3000; // Grab env variable if present, no fallback
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json()); // Expect body to always be JSON
app.use(session({ secret: breakfast, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', users); // Setup route
app.use('/api/chores', chores); // Setup route
app.use('/api/calendar', calendar); // Setup route

passport.use(new Strategy(
  (username, password, cb) => {
    findUser('*', { user_name: username })
      .then((userObject) => {
        try {
          bcrypt.compare(password, userObject[0].password)
            .then((passwordMatch) => {
              if (passwordMatch) {
                return cb(null, userObject[0]);
              }
              return cb(null, false);
            });
        } catch (err) {
          throw new Error(`[error ID 11] Username probably does not exist in DB. Full error message from system is: ${err}`);
        }
      })
      .catch((err) => {
        console.log(`[error ID 12] during verification promise ${err} `);
        // (err, user) => {
        //   if (err) { return cb(err); }
        //   if (!user) { return cb(null, false); }
      });
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  findUser('id', { id: userId })
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

app.get('/api/verify', (req, res) => {
  if (req.user) {
    res.status(200).json({ userId: req.user[0].id });
  } else {
    res.status(401).send();
  }
});

app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/meow' }),
  (req, res) => {
    res.send('Success!');
  });

app.get('/api/logout', (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  req.session.destroy();
  res.redirect('/');
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// Catch all routes (for all verbs) we aren't expecting and serve a feline 404
app.all('/*', (req, res) => {
  const feline404 = path.join(__dirname, '../client/dist/images/feline404.svg');
  res.status(404).sendFile(feline404);
});

// Start listening on PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
