const { z } = require('zod');

module.exports= z.object({
    name: z.string(),
    desc: z.string()
});