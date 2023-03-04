const dotEnv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGO_URI )
    .then(()=>{
        app.listen(PORT , ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch(err=>{console.log(err);});

app.get('/' , (req , res)=>{
     console.log("HOme");
     res.send("Hello World");
    
    } );