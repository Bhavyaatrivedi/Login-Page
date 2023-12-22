const User = require('../model/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
// const config = require('../config');

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.SENDMAIL_API_KEY;
// console.log('apikey', API_KEY);
sgMail.setApiKey(API_KEY);

const sendMail = (name, email, token) => {
  return new Promise((resolve, reject) => {
    try {
      const msg = {
        to: email,
        from: 'shaishav.mahaseth@acumensa.co',
        subject: 'Reset your password',
        //html: '<p> Rest your password here ' + email + '</p>',
        html: '<p> Hi '+ name +', Copy the link  <a href="http://127.0.0.1:3000/reset-password?token='+token+'">and reset your password </a>',
      };
      sgMail
        .sendMultiple(msg)
        .then((msg) => {
          resolve(msg);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, ' super secret key', {
//     expiresIn: maxAge,
//   });
// };
const createToken = (userId) => {
  console.log('Using secret key:', process.env.SECRET);
  return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: maxAge });
};


//error handling
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  console.log(err);
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


//hash the new password
const securePassword = async (password) => {
  try {
    const passHash = await bcrypt.hash(password, 10);
    return passHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Register a user
module.exports.register = async (req, res, next) => {
  try {
    const { email, password, mobileNo, address } = req.body;
    const user = await User.create({ email, password, mobileNo, address });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};


//Login a user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    //res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, token:token ,success: true }); 
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, success: false }); 
  }
};


//Forget password
module.exports.forget_password = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendMail(userData.name, userData.email, randomString);
      res.status(200).send({
        success: true,
        msg: 'Check your inbox and reset your password',
      });
    } else {
      res.status(200).send({ success: true, msg: 'This email does not exist' });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
};

//updating password
module.exports.update_password = async(req, res) =>{
  try {
    const { token, password } = req.body;

    // Check if the token is valid
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ success: false, msg: 'Invalid or expired token' });
    }

   
    const hashedPassword = await securePassword(password);

    // Update the user's password and clear the token
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { password: hashedPassword, token: '' } },
      { new: true }
    );

    res.status(200).json({ success: true, msg: 'Password updated successfully', data: updatedUser });
  } catch (err) {
    consle.error('Error updating password:', err);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
}


//checking password
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // console.log(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

//reset password
module.exports.reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token,"DRK4TVCUQmsBtd5CxssTu2QGWl4HAwyeDRK4TVCUQmsBtd5CxssTu2QGWl4HAwyeDRK4TVCUQmsBtd5CxssTu2QGWl4HAwye")

    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const newPassword = req.body.password;
      const confirmPassword = req.body.confirmPassword;

      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).send({
          success: false,
          msg: 'New password and confirm password do not match',
        });
      }

      const hashedPassword = await securePassword(newPassword);

      // Update the user's password and clear the token
      const userData = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: hashedPassword, token: '' } },
        { new: true }
      );

      res.status(200).send({
        success: true,
        msg: 'User password has been reset',
        data: userData,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: 'Invalid or expired token. Could not reset password.',
      });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
};


//adding a user

module.exports.addUser = async (req, res) => {
  try {
    const { email, password, mobileNo, address } = req.body;
    const user = await User.create({ email, password, mobileNo, address });

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.error(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

//delete user
module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    res.status(200).json({ success: true, msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

//get user
module.exports.get_user= async(req, res) =>{
  const users = await User.find();
  res.json(users);
}



// upload files
const uploadFile = require("../middlewares/upload");

const fs = require("fs");


module.exports.upload_file = async (req, res) => {
  try {
    await uploadFile(req, res);
   

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


//get files
module.exports.get_files = (req, res) => {
  const directoryPath = __basedir + "/uploads";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        // url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};


//download files

module.exports.download = (req, res) => {
  try {
    const fileName = req.params.name;
    const filePath = path.join(__basedir, '/uploads', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send({
        message: 'File not found.',
      });
    }

    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error.message);
    res.status(500).send({
      message: 'Internal server error.',
    });
  }
};



//adding input fields

//add fields
module.exports.add_field = (req, res) => {
  try {
    const { fields } = req.body;

    if (!Array.isArray(fields) || fields.some(field => !field.name || !field.value)) {
      return res.status(400).json({ message: 'Invalid or missing fields in the request.' });
    }


    const items = [...fields];

    res.status(201).json({ message: 'Items added successfully.', items });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



//delete fields
module.exports.delete_field =  (req, res) => {
  let items = [];
  const nameToDelete = req.params.name;

  items = items.filter((item) => item.name !== nameToDelete);

  res.json({ message: 'Item deleted successfully.', items });
}
