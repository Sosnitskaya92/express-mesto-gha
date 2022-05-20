const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = userRouter;
