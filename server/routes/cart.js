const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {
    
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require('../middleware/auth');


router.post('/', [

    verifyToken,

], cartController().addCart);


router.put('/:id', [

    verifyTokenAndAuthorization,

], cartController().updateCart);

router.delete('/:id', [

    verifyTokenAndAuthorization,

], cartController().deleteCart);


router.get('/find/:userId', [

    verifyTokenAndAuthorization

], cartController().getCart);


router.get('/', [

    verifyTokenAndAdmin

], cartController().getAllCarts);



module.exports = router;