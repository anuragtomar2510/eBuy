const router = require('express').Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');


router.post('/register', [

    check('username', 'username length must be greater than 3'
        ).isLength({ min: 4}),

    check('email', 'email must be a valid email'
        ).normalizeEmail().isEmail(),

    check('password', 'password length must be greater than 5'
        ).isLength({ min: 6})

], authController().register); 



router.post('/login', [

    check('username', 'username length must be greater than 3'
        ).isLength({ min: 4}),

    check('password', 'password length must be greater than 5'
    ).isLength({ min: 6})
    

], authController().login);





module.exports = router;