const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config/config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.jwtSecret);
}

exports.login = function(req, res, next) {
  // user has already had their email and password auth'd
  // we just need to give them a token

  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  // see if a user with a given email exists
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

  if (existingUser) {
    res.status(422).send({ error: "This email is already taken!" });
  } else if (existingUser === null) {
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    })
  }
  })

};
