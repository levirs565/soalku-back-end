const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

const loginAs = (id, session) => {
  const ses = session;
  ses.user = id;
};

const loggedAs = session => session.user;

exports.signup = (id, name, password) =>
  User.findOne({ id })
    .then(user => {
      if (user) {
        throw Error('Account already registered');
      }

      return bcrypt.genSalt(saltRounds);
    })
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      const user = new User({
        id,
        name,
        password: hash
      });

      return user.save();
    });

exports.login = (id, password, session) => {
  if (loggedAs(session)) {
    return Promise.reject(Error('Please logout first'));
  }

  return User.findOne({ id })
    .then(user => {
      if (!user) {
        throw Error('Account not registered');
      }

      const userPromise = Promise.resolve(user);
      const comparePromise = bcrypt.compare(password, user.password);

      return Promise.all([userPromise, comparePromise]);
    })
    .then(([user, matched]) => {
      if (!matched) throw Error('Password not match');

      loginAs(user.id, session);
    });
};

exports.logout = session =>
  this.validateUserLoggedIn(session).then(() => {
    loginAs(undefined, session);
  });

exports.validateUserLoggedIn = session => {
  const user = loggedAs(session);
  return user ? Promise.resolve(user) : Promise.reject(Error('Please login first'))
};

exports.getLoggedInAs = loggedAs;
