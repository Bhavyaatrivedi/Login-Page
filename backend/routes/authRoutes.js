const { register, 
        login, 
        logout, 
        addUser, 
        deleteUser, 
        update_password
       } = require('../controllers/authControllers');
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

router.post('/reset-password', reset_password);

router.get('/log-out', logout);

router.post('/add-user', addUser);

router.post('/update-password', update_password);

router.delete('/delete-user/:id', deleteUser);

module.exports = router;
