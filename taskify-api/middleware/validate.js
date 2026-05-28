const { z } = require('zod');

function validateSchema(zodSchema){
    return (req,res,next)=>{
        try {
            zodSchema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = validateSchema;