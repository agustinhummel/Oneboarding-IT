const express=require('express');
const app=express();
const morgan=require('morgan');
require('dotenv').config();
const userRoute=require('./routes/userRoute');
const postsRoute = require('./routes/postRoute');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/users',userRoute);
app.use('/posts', postsRoute);

const port=process.env.PORT;

app.listen(port, ()=>{
    console.log(`Servidor en el puerto ${port}`);
})
