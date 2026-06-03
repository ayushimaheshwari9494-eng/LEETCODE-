
const express = require ('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
 const cookieParser= require('cookie-parser');










app.use(express.json());
app.use(cookieParser());



main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("Error connecting to DB", err);
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port:" + process.env.PORT);
}) ;
