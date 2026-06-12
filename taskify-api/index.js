require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');

const cors = require('./middleware/cors');
const jwt = require('./middleware/jwt');

const authRouter =  require('./router/auth');
const taskRouter = require('./router/task');

const app = express();
const port = 5000;
// const address = "127.0.0.1";
const address = "localhost";

app.use(cors);
app.use(require('cookie-parser')());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/task",jwt,taskRouter);
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.listen(port,address,()=>{
    console.log(`Server: Express JS`);
    console.log(`port: ${port}`);
    console.log(`host: ${address}`);
    console.log(`url: http://${address}:${port}`);
});
