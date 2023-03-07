const express = require('express');
const { createProduct  , getAllProducts , getProductById , updateProduct , deleteProduct } = require('../controllers/productController');
const protect = require('../middleWare/authMiddleWare');
const router = express.Router();
const {upload} = require('../utils/fileUpload');


router.post('/' , protect , upload.single("image") , createProduct );
router.get('/' , protect , getAllProducts );
router.get('/:id', protect , getProductById );
router.delete('/:id' , protect , deleteProduct);
router.patch('/:id', protect , upload.single("image") , updateProduct);

module.exports = router;