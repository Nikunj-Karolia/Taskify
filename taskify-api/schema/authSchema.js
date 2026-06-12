const { z } = require('zod');

const userDetail = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    dob: z.string().date(),
    phone_number: z.string().min(10).max(13)
});

const userLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

module.exports={
    userDetail:userDetail,
    userLogin:userLogin
};