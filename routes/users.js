const userRouter = require('express').Router();
const { getUsers } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
