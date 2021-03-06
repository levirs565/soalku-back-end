const route = require('express').Router();
const UserController = require('../controllers/user');

route.post('/signup', UserController.signup);
route.post('/login', UserController.login);
route.post('/logout', UserController.logout);
route.get('/state', UserController.state);

module.exports = route;
