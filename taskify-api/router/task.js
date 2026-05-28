const router = require('express').Router();

const db = require('../components/pg');
const validate = require('../middleware/validate');

const taskSchema = require('../schema/taskSchema');

/**
 * @swagger
 * /api/task:
 *   get:
 *      tags:
 *          - Task
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: number
 *                                      example: 10
 *                                  name:
 *                                      type: string
 *                                      example: test
 *                                  desc:
 *                                      type: string
 *                                      example: test value
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
 *          500:
 *              description: Error user registering in app
 */

router.get("/",async(req,res)=>{
    const {id} = req.jwt;
    try {
        const response = await db.query(`SELECT * FROM get_tasks_by_user('${id}');`);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send("Server Error From Get");  
    }
});

/**
 * @swagger
 * /api/task:
 *   post:
 *      tags:
 *          - Task
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              created:
 *                                  id: integer
 *                                  example: 10
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
 *          500:
 *              description: Error user registering in app
 */

router.post("/",validate(taskSchema),async(req,res)=>{
    const {id} = req.jwt;
    try {
        const {name,desc} = req.body;
        const response = await db.query(`SELECT * FROM create_task('${name}','${desc}','${id}')`);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send(error);  
    }
});

/**
 * @swagger
 * /api/task/{id}:
 *   patch:
 *      tags:
 *          - Task
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      parameters:
 *          - in: cookie
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: "The Cookie validated whether the request is authentic or not."
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: "This is Task Id for deleteion"
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
 *          500:
 *              description: Error user registering in app
 */

router.patch("/:id",validate(taskSchema),async(req,res)=>{
    const {id} = req.jwt;
    try {
        const {name,desc} = req.body;
        const response = await db.query(`SELECT * FROM update_task('${req.params.id}','${id}','${name}','${desc}');`);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send(error);  
    }
});

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *      tags:
 *          - Task
 *      summary: Register user in the app
 *      description: This is used to register User in the app using db.
 *      parameters:
 *          - in: cookie
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: "The Cookie validated whether the request is authentic or not."
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: "This is Task Id for deleteion"
 *      responses:
 *          200:
 *              description: The user is successfully register in app
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              found:
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
 *                                  found: string
 *                                  example: Invalid Token
 *          500:
 *              description: Error user registering in app
 */

router.delete("/:id",async(req,res)=>{
    const {id} = req.jwt;
    try {
        const response = await db.query(`SELECT * FROM delete_task('${req.params.id}','${id}');`);
        res.json(response.rows);
    } catch (error) {
        res.status(500).send(error);  
    }
});

module.exports = router;