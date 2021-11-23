const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {check} = require('express-validator');
const {
    
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require('../middleware/auth');


router.post('/', [

    verifyToken,

    check('userId', 'user ID is required'
    ).notEmpty(),

    check('amount', 'amount is required'
    ).notEmpty(),

    check('address', 'address is required'
    ).notEmpty(),

], orderController().placeOrder);


router.put('/:id', [

    verifyTokenAndAdmin

], orderController().updateOrder);

router.delete('/:id', [

    verifyTokenAndAdmin
    
], orderController().deleteOrder);

router.get('/find/:userId', [

    verifyTokenAndAuthorization

], orderController().getUserOrders);

router.get('/', [

    verifyTokenAndAdmin

], orderController().getAllOrders);


router.get('/income', [

    verifyTokenAndAdmin

], orderController().getIncome);


module.exports = router;