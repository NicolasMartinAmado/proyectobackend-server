
const { productService, userService } = require('../repositories/service')
const customError = require('../services/errors/customError')
const { EErrors } = require('../services/errors/enum')
const { generateProductErrorInfo } = require('../services/errors/generateErrorInfo')
const { logger } = require('../utils/logger')
const { sendEmail } = require('../utils/sendEmail')


class ProdcutsController {
    constructor(){
        this.productService = productService
        this.userService = userService
       
    }

    getProducts = async (req,res)=>{
        try{
            const products = await this.productService.getProducts()
            return res.json({
                status: 'success',
                payload: products
            })
        }catch (error){
            console.error(error)
            res.status(500).send('Server error')
        }
    }

    getProductById = async (req,res,next)=>{
        try{
            const pid = req.params.pid
            if(!pid){
                customError.createError({
                    name: 'Not found a product',
                    cause: generateProductErrorInfo(filteredProduct),
                    message: 'Error, trying to found a product',
                    code: EErrors.DATABASE_ERROR,
                })
                //res.status(404).send("Product not exist")
            }
            const filteredProduct = await this.productService.getProductById(pid)
            res.json({
                status: 'succes',
                payload: filteredProduct
            })    
        }catch(error) {
            next(error)
                //res.status(500).send('Server error')
        }
    }

    addProduct = async (req,res,next)=>{
        try {
            const {
              title,
              description,
              price,
              thumbnail,
              code,
              stock,
              status,
              category,
            } = req.body
            
            const user = req.session.user

            if (user.role !== 'premium') {
                return res.status(403).json({ status: 'error', message: 'Only user premium can create product' })
            }

            if(!title || !price || !code || !stock){
                customError.createError({
                    name: 'Product creation error',
                    cause: generateProductErrorInfo({
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        status,
                        category
                    }),
                    message: 'Error trying to add a product',
                    code: EErrors.DATABASE_ERROR
                })
            }

            const owner = user._id

            const newProduct = await this.productService.addProduct({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category,
                owner, 
            })
        
            res.json({
                status: 'success',
                payload: newProduct,
                message: 'Product added successfully',
            })
            } catch (error) {
              next(error)
              //res.status(500).send('Server error')
        }
    }

    updateProduct = async (req,res,next)=>{
        try{
            const pid = req.params.pid
            const {title, description, price, thumbnail, code, stock, status, category} = req.body
            if(!title || !price || !code || !stock){
                customError.createError({
                    name: 'Product to update error',
                    cause: generateProductErrorInfo({
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        status,
                        category,
                    }),
                    message: 'Error trying to update a product',
                    code: EErrors.DATABASE_ERROR
                })
            }
            await this.productService.updateProduct(pid, title, description, price, thumbnail, code, stock, status, category)
            res.json({
                status: 'success',
                message: 'Product updated successfully',
            })
        }catch(error){
            next(error)
            //res.status(500).send('server error')
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const pid = req.params.pid
            const user = req.session.user
    
            const product = await this.productService.getProductById(pid)
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' })
            }

            if (user.role === 'admin' || product.owner.equals(user._id)) {
                const deletedProduct = await this.productService.deleteProduct(pid)
                if (deletedProduct) {
                    if (product.owner && user.role === 'premium') {
                        const ownerEmail = product.owner.email
                        const subject = 'Product Deleted'
                        const html = `
                            <p>Dear ${product.owner.first_name},</p>
                            <p>We would like to inform you that your product "${deletedProduct.title}" has been deleted from our platform.</p>
                            <p>If you have any questions, please do not hesitate to contact us.</p>
                            <p>Thank you for using our platform.</p>
                        `

                        await sendEmail(ownerEmail, subject, html)
                    }
                    
                    return res.json({ status: 'success', message: 'Product deleted successfully' })
                }
                return res.status(404).json({ status: 'error', message: 'Product not found' })
            } else {
                return res.status(403).json({ status: 'error', message: 'Unauthorized to delete this product' })
            }
        } catch (error) {
            next(error)
        }
    };


}

module.exports = ProdcutsController
