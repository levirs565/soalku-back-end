const UserService = require('../services/user');
const { sendError } = require('../error');

exports.signup = (req, res) => {
  const { id, name, password } = req.body;

  UserService.signup(id, name, password)
    .then(user => {
      res.json({
        msg: 'user registered'
      });
    })
    .catch(sendError(res));
};

exports.login = (req, res) => {
  const { id, password } = req.body;

  UserService.login(id, password, req.session)
    .then(() => {
      res.json({
        msg: 'user logged in'
      });
    })
    .catch(sendError(res));
};

exports.logout = (req, res) => {
  UserService.logout(req.session)
    .then(() => {
      res.json({
        msg: 'user logged out'
      });
    })
    .catch(sendError(res));
};

exports.state = (req, res) => {
  Promise.resolve(UserService.getLoggedInAs(req.session))
    .then(user =>
      res.json({
        loggedIn: user != null,
        user
      })
    )
    .catch(sendError(res));
};
