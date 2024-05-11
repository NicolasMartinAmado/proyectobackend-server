async function Test() {
  const ProductManager = require('./ProductManager');
  const managerProduct = new ProductManager(`./producto.json`);

  //Agregando productos mediante addProduct
  /*await managerProduct.addProduct('BMW', 'Duster 12', 450000, '../', 1, 54, "vehicles",true);
  await managerProduct.addProduct('Lamborghini', 'Aventador', 9000000, '../', 5, 32, "vehicles", true);
  await managerProduct.addProduct('Chevrolet', 'Onix', 710000, '../', 66, 20, "vehicles",true);
  await managerProduct.addProduct('Lamborghini', 'Spider', 10000000, '../', 3, 2, "vehicles",true);
  await managerProduct.addProduct('Peugeot', 'RCZ', 900000, '../', 5651, 4, "vehicles",true);
  await managerProduct.addProduct('Tesla', 'Roadster', 10000000, '../', 31, 2, "vehicles",true);
  await managerProduct.addProduct('Mercedes Benz', 'sprinter', 6050000, '../', 6, 20, "vehicles",true);
  await managerProduct.addProduct('Audi', 'TT', 78500000, '../', 45, 6, "vehicles",true);
 */

  //Eliminando productos segun su id
 try {
    const productoeliminado = await managerProduct.deleteProduct(3);
    console.log({ productoeliminado });
    console.log(await managerProduct.getProducts());
  } catch (error) {
    console.log('error' + error);
  }

  //Actualizando productos mediante updateProduct
  /**try {
    const updateProduct = await managerProduct.updateProduct(1,'BMW', 'Lordtype 12', 500000, '../', 1, 21);
console.log(updateProduct)
 await managerProduct.getProductByid(1)
} catch(error){
    console.log("error" + error)
} */





  
}

Test();
