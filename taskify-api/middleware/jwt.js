const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const {token} = req.cookies;
    try {
        if(!token){
            throw new Error({
                message:'No Token found'
            });
        }

        req.jwt = jwt.verify(token,process.env.SECRET,{
            algorithms:['HS512']
        });
        next();
    } catch (error) {
        console.log(JSON.stringify(error));
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
}