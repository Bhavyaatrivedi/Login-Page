const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const User = require('./model/authModel');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);


//  to get all the users registered in the database
app.get('/api/users', async (req, res) => {
  // Get all the users from the database
  const users = await User.find();
  res.json(users);
});

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server Started Successfully.');
  }
});

mongoose
  .connect('mongodb+srv://bhavyaa:bhavyaauser@cluster0.nsu1yqn.mongodb.net/LOGIN?retryWrites=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connetion Successfull');
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use(cookieParser());

app.use(express.json());
app.use('/', authRoutes);
