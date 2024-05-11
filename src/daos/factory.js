const { configObject } = require("../config/config")

let UserDao
let ProductDao
let CartDao
let MessageDao
let ProductFile
let CartFile

//console.log("Persistnece factory: ", configObject.persistence)

switch (configObject.persistence) {
    case 'MEMORY':
        
       

    case 'FILE':
        const ProductFileManager = require('./file/productManagerFile')
        ProductFile = ProductFileManager

        const CartFileManager = require('./file/cartManagerFile')
        CartFile = CartFileManager
        break;

    default:
        const UserDaoMongo = require('./mongo/userDaoMongo')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./mongo/productDaoMongo')
        ProductDao = ProductDaoMongo

        const CartDaoMongo = require('./mongo/cartDaoMongo')
        CartDao = CartDaoMongo

        const MessageDaoMongo = require('./mongo/messageDaoMongo')
        MessageDao = MessageDaoMongo
        
        break;
}



module.exports = {
    UserDao,
    ProductDao,
    CartDao,
    MessageDao,
    ProductFile,
    CartFile,
}