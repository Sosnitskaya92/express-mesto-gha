const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards } = require('../controllers/cards');
const { createCard } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/https?\:\/\/(www\.)?\d?\D{1,}#?/),
  }),
}), createCard);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
