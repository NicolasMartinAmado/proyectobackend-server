const { Router } = require('express')
const CartManager = require('../daos/file/cartManagerFile')
const cartRouter = Router()

const managerCart = new CartManager("./carrito.json");


cartRouter.post('/', async (req, res) => {
  await firstCartManager.createCart()
  res.status(200).send("Carrito creado con exito!")
})

cartRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const carritoEncontrado = await managerCart.getCartById(cartId);
  if(carritoEncontrado) {
    res.status(200).json(carritoEncontrado);
  }
  else{
    res.status(404).send('No se encontró ningún carrito!')
  }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  await managerCart.addtoCart(cartId, productId);
  res.status(200).send('Se agregó el producto al carrito correctamente!')
})

module.exports = cartRouter;