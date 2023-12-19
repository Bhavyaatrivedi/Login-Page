const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const User = require('./model/authModel');

const app = express();

// app.use(
//   cors({
//     //origin: ['http://localhost:3000'],
//     origin: 'http://127.0.0.1:3000',
//     methods: ['GET', 'POST', 'DELETE'], 
//     credentials: true,
//   })cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
// );

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
     
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);



//  to get all the users registered in the database
app.get('/api/users', async (req, res) => {
 
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
