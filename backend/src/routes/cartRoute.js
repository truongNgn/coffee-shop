const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:phone', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/', cartController.updateCart);
router.delete('/', cartController.deleteFromCart);
router.delete('/all', cartController.deleteAllCart);

module.exports = router;