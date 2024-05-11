const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { configObject } = require('../config/config')
const { logger } = require('./logger')

// Configurar el transporte de nodemailer
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_password_app
    }
})


exports.sendPasswordResetEmail = async (userId, userEmail) => {
    
    const token = jwt.sign({ userId }, 'secreto', { expiresIn: '1h' })

    const resetUrl = `https://localhost:8080/api/reset-password?token=${token}`

    // Crear y enviar el correo electrónico
    await transport.sendMail({
        from: 'Tu aplicación <Ecommerce>',
        to: userEmail,
        subject: 'Restablecer contraseña',
        html: `
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetUrl}">Restablecer contraseña</a>
        `
    })
}


exports.verifyResetToken = (token) => {
    try {
        
        const decoded = jwt.verify(token, 'secreto')
        return decoded
    } catch (error) {
     
        logger.error('Token not found')
        return null
    }
}