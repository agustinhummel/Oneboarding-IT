const express=require('express');
const app=express();
const morgan=require('morgan');
const cors=require('cors');
require('dotenv').config();
const userRoute=require('./routes/userRoute');
const postsRoute = require('./routes/postRoute');
const clientRoute=require('./routes/clientRoute');
const professionalRoute=require('./routes/professionalRoute')


app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/users',userRoute);
app.use('/posts', postsRoute);
app.use('/clients',clientRoute);
app.use('/professionals',professionalRoute);

const port=process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Servidor en el puerto ${port}`);
})
