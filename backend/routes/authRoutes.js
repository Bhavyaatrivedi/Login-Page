const { register, 
        login, 
        addUser, 
        deleteUser, 
        update_password,
        get_user,
        forget_password,
        reset_password,
        upload_file,
        download,
        get_files,
        add_field,
        delete_field,
       } = require('../controllers/authControllers');

 const { checkUser } = require('../middlewares/authMiddleware');


//const requireAuth = require('../middlewares/requireAuth')

const router = require('express').Router();



router.post('/', checkUser);

router.post('/register', register);

router.post('/login', login);

router.post('/forget-password', forget_password);

router.post('/reset-password', reset_password);

router.post('/add-user', addUser);

router.post('/update-password', update_password);

router.delete('/delete-user/:id', deleteUser);
//router.use(requireAuth)
router.get('/get-user', get_user);

router.post("/upload",upload_file);
router.get("/files", get_files);
router.get("/files/:name", download);

//input filds
router.post('/add-field', add_field)
router.delete('/delete-field/:name', delete_field)




module.exports = router;
