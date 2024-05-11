function authentication(req, res, next) {
     
    if(req.session.username !== 'nicolas' || !req.session.admin ) {
        return res.status(401).send('error de autenticación')
    } 
    next()

}

module.exports = {
    authentication
}
