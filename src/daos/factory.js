const { configObject } = require("../config/config")

let UserDao
let ProductDao
let CartDao
let MessageDao
let ProductFile
let CartFile

//console.log("Persistnece factory: ", configObject.persistence)

switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/userDaoMongo')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./mongo/productDaoMongo')
        ProductDao = ProductDaoMongo

        const CartDaoMongo = require('./mongo/cartDaoMongo')
        CartDao = CartDaoMongo

        const MessageDaoMongo = require('./mongo/messageDaoMongo')
        MessageDao = MessageDaoMongo
        break;

    case 'FILE':
        const ProductFileManager = require('./file/productManagerFile')
        ProductFile = ProductFileManager

        const CartFileManager = require('./file/cartManagerFile')
        CartFile = CartFileManager
        break;

    default:
        break;
}

//console.log('====================================',UserDao)

module.exports = {
    UserDao,
    ProductDao,
    CartDao,
    MessageDao,
    ProductFile,
    CartFile,
}