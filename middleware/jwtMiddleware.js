//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next)=>{
   
const token = req.headers['authorization'].split(' ')[1]

try {
    const response = jwt.verify(token, process.env.SECRETKEY)
    console.log(response);
    console.log(response.userId);
    

    req.payload = response.userId
    
    next()

} catch (error) {
    res.status(401).json('Authorization failed due to:',error)
}

}

module.exports = jwtMiddleware