const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // path is used to join image file names with __dirname

// Used for auth
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const { findUser } = require('../database/');

// Routes
const users = require('./routes/users');
const chores = require('./routes/chores');
const calendar = require('./routes/calendar');

const port = process.env.PORT || 3000; // Grab env variable if present, otherwise use port 3000
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(bodyParser.json()); // Expect body to always be JSON
app.use(session({ secret: 'keyboard cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', users); // Setup route
app.use('/chores', chores); // Setup route
app.use('/calendar', calendar); // Setup route

passport.use(new Strategy(
  (username, password, cb) => {
    findUser(username)
      .then((user) => {
        if (user.password !== password) { return cb(null, false); }
        return cb(null, user);
      })
      .catch((err) => {
        console.log(`[error] during verification promise ${err} `);
        // (err, user) => {
        //   if (err) { return cb(err); }
        //   if (!user) { return cb(null, false); }
      });
  },
));

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/meow' }),
  (req, res) => {
    res.send('Success!');
  });

// Catch all routes (for all verbs) we aren't expecting and server a feline 404
app.all('/*', (req, res) => {
  const feline404 = path.join(__dirname, '../client/dist/images/feline404.svg');
  res.status(404).sendFile(feline404);
});

// Start listening on PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
