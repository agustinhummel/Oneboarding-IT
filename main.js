const express=require('express');
const app=express();
const sequelizeConfig=require('./config/index');
const morgan=require('morgan');
require('dotenv').config();
const userRoute=require('./routes/userRoute');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/users',userRoute);

const port=process.env.PORT;

sequelizeConfig.authenticateAndSync()
.then(()=>{
    sequelizeConfig.loadModels();
    app.listen(port, ()=>{
        console.log(`Servidor en el puerto ${port}`);
    });
})
.catch((error)=>{
    console.log(error.message);
});
