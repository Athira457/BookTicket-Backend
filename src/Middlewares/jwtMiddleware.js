const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next) => {
    try{   
    const token = req.headers['authorization'].slice(7)
    const jwtVerification = jwt.verify(token,"superkey")
    req.payload = jwtVerification.userId
    next()
    }
    catch(err){
        res.status(401).json({"Authorization error":err.message})
    }
}

module.exports = jwtMiddleware