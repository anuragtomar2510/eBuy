const router = require('express').Router();
const userController = require('../controllers/userController');
const {
    
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require('../middleware/auth');


router.put('/:id', verifyTokenAndAuthorization, userController().updateUser);
router.delete('/:id', verifyTokenAndAuthorization, userController().deleteUser);
router.get('/find/:id', verifyTokenAndAdmin, userController().getUser);
router.get('/', verifyTokenAndAdmin, userController().getAllUsers);
router.get('/stats', verifyTokenAndAdmin, userController().getUserStats);

module.exports = router;