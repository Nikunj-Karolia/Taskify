const router = require('express').Router();
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const expressjwt = require('../middleware/jwt');
const validate = require('../middleware/validate');

const {userDetail,userLogin} = require('../schema/authSchema');

const db = require('../components/pg');



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *      tags:
 *          - Auth
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: test@example.com
 *                          password:
 *                              type: string
 *                              example: test@1234
 *                          phone_number:
 *                              type: string
 *                              example: +91 98XXX XXXXX
 *                          dob:
 *                              type: string
 *                              example: 19-03-1998
 *      responses:
 *          200:
 *              description: The user is successfully register in app
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              created:
 *                                  type: boolean
 *                                  example: true
 *          500:
 *              description: Error user registering in app
 */

router.post("/register",validate(userDetail),async(req,res)=>{
    try{
        const {email,password,phone_number,dob} = req.body;
        const passHash = await argon.hash(password);
        const query = `SELECT * FROM create_user('${email}','${passHash}',${phone_number?"'"+phone_number+"'":"NULL"},${dob?"'"+dob+"'":"NULL"});`;
        const response = await db.query(query);
        res.send(JSON.stringify({
            created: true
        }));
    }catch(e){
        res.status(500).send(e);
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *      tags:
 *          - Auth
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: test@example.com
 *                          password:
 *                              type: string
 *                              example: test@1234
 *      responses:
 *          200:
 *              description: The user is successfully register in app
 *              headers:
 *                  Set-Cookie:
 *                      description: This Cookie contains JWT token for authentication
 *                      schema:
 *                          type: string
 *                          example: token=sdfbsgbgbxxxxx...; Max-Age:3600; Path=/; HttpOnly
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              login:
 *                                  type: boolean
 *                                  example: true
 *                              expires:
 *                                  type: number
 *                                  example: 3600
 *          500:
 *              description: Error user registering in app
 */

router.post("/login",validate(userLogin),async(req,res)=>{
    try{
        const {email,password} = req.body;
        const passHash = await argon.hash(password);
        const query = `SELECT * FROM get_user('${email}');`;
        const response = await db.query(query);
        const {id} = response.rows[0];

        const verify = await argon.verify(response.rows[0].password,password);
        if(!verify){
            throw new Error({
                message: "Invalid Email or password"
            });
        }
        const token = jwt.sign({
            id:id
        },
        process.env.SECRET,
        {
            expiresIn: "1h",
            algorithm: "HS512"
        });

        res.cookie("token",token,{
            maxAge: 3600*1000,
            httpOnly: true,
            // sameSite: 'none',
            path: "/",
            // secure:true,
            // domain: "http://example.com"
        }).send(JSON.stringify({
            login: true,
            expires: 3600
        }));
    }catch(e){
        res.status(500).send(e);
    }
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *      tags:
 *          - Auth
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      parameters:
 *          - in: cookie
 *            name: token
 *            schema:
 *                type: string
 *            required: true
 *            description: "The Cookie validated whether the request is authentic or not."
 *      responses:
 *          200:
 *              description: The user is successfully register in app
 *              headers:
 *                  Set-Cookie:
 *                      description: This Cookie contains JWT token for authentication
 *                      schema:
 *                          type: string
 *                          example: token=sdfbsgbgbxxxxx...; Max-Age:3600; Path=/; HttpOnly
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              login:
 *                                  type: boolean
 *                                  example: true
 *                              expires:
 *                                  type: number
 *                                  example: 3600
 *          401:
 *              description: The user is unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: Invalid Token
 */

router.post("/refresh",expressjwt,(req,res)=>{
    const {id}  = req.jwt;
    const token = jwt.sign({
        id:id
    },
    "Taskify",{
            expiresIn: "1h",
            algorithm: "HS512"
    });


    res.cookie("token",token,{
        maxAge: 3600,
        httpOnly: true,
        sameSite: true,
        path: "/",
        // secure:true,
        // domain: "http://example.com"
    }).send(JSON.stringify({
        expires: 3600
    }));
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *      tags:
 *          - Auth
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      parameters:
 *          - in: cookie
 *            name: token
 *            schema:
 *                type: string
 *            required: true
 *            description: "The Cookie validated whether the request is authentic or not."
 *      responses:
 *          200:
 *              description: The user is successfully register in app
 *              headers:
 *                  Set-Cookie:
 *                      description: It clears token value
 *                      schema:
 *                          type: string
 *                          example: token=; Max-Age:3600; Path=/; HttpOnly
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              logout:
 *                                  type: boolean
 *                                  example: true
 *          401:
 *              description: The user is unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: Invalid Token
 */

router.post("/logout",expressjwt,(req,res)=>{
    res.clearCookie('token').json({
        logout:"success"
    });
});

module.exports = router;