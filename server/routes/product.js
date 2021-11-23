const router = require('express').Router();
const productController = require('../controllers/productController');
const {verifyTokenAndAdmin} = require('../middleware/auth');
const {check} = require('express-validator');


router.post('/', [

    verifyTokenAndAdmin,

    check('title', 'product title is required'
        ).notEmpty(),

    check('desc', 'product description is required'
        ).notEmpty(),

    check('image', 'product image is required'
        ).notEmpty(),

    check('price', 'product price is required'
        ).notEmpty(),

    

], productController().addProduct);


router.put('/:id', [

    verifyTokenAndAdmin

], productController().updateProduct);


router.delete('/:id', [

    verifyTokenAndAdmin

], productController().deleteProduct);

router.get('/find/:id', productController().getProduct);
router.get('/', productController().getAllProducts);


module.exports = router;