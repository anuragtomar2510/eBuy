const router = require('express').Router();
const checkoutController = require('../controllers/checkoutController');
const {
    
    verifyTokenAndAuthorization,
 
} = require('../middleware/auth');


router.post('/payment', [

    verifyTokenAndAuthorization

], checkoutController().payment);

module.exports = router;