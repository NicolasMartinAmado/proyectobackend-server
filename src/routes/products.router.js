
const { Router } = require('express')
const ProductsController = require('../controllers/products.controllers')
const { isAdminOrPremium } = require('../middlewars/roleverification')

const router = Router()
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = new ProductsController()

router
    .get('/', getProducts)
    .get('/:pid', getProductById)
    .post('/', addProduct)
    .put('/:pid', updateProduct)
    .delete('/:pid', isAdminOrPremium, deleteProduct)


module.exports = router
