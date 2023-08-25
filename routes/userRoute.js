const express=require('express');
const router=express.Router();
const { User }=require('../models');
const bcrypt=require('bcryptjs');

router.get('/', async(req,res)=>{
    try{
        let users=await User.findAll();
        return res.send(users);
    }
    catch(error){
        return res.send(error.message);
    }
    });

router.post('/signup',async(req,res)=>{
    try{
        let {userObj, passwordR}=req.body;
        if(userObj.password!==passwordR){
            return res.send('las contraseñas no coiciden');
        }
        const hashResult=await new Promise((resolve,reject)=>{
            bcrypt.hash(userObj.password,10,(err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
        userObj.password=hashResult;
        await User.create(userObj);
        return res.send('Registrado');
    }
    catch(error){
        return res.send(error.message);
    }
});

module.exports=router;