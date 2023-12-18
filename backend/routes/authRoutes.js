const { register, login, logout } = require('../controllers/authControllers');
const { checkUser } = require('../middlewares/authMiddleware');
const {
  forget_password,
  reset_password,
} = require('../controllers/authControllers');

const router = require('express').Router();

router.post('/', checkUser);

router.post('/register', register);

router.post('/login', login);

router.post('/forget-password', forget_password);

router.get('/reset-password', reset_password);

router.get('/log-out', logout);


module.exports = router;
