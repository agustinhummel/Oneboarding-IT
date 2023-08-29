const express=require('express');
const app=express();
const morgan=require('morgan');
require('dotenv').config();
const userRoute=require('./routes/userRoute');
const postsRoute = require('./routes/postRoute');
const clientRoute=require('./routes/clientRoute');


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/users',userRoute);
app.use('/posts', postsRoute);
app.use('/clients',clientRoute);

const port=process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Servidor en el puerto ${port}`);
})
