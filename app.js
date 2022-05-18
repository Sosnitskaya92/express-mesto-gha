const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

require('dotenv').config();

const NOT_FOUND = 404;

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.get('/posts', (req) => {
  console.log(req.cookies.jwt);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6272c9319d9bcb546a0a5730',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден.' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`App listener on port ${PORT}`);
  });
}

main();
