const express=require('express');
const router=express.Router();
const { User } =require('../models');
const bcrypt=require('bcryptjs');

router.get('/', async (req,res)=>{
    try{
        let users=await User.findAll();
        return res.json(users);
    }
    catch(error){
        return res.send(error.message);
    }
});

router.get('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let user=await User.findOne({where:{id: id}});
        if(!user){
            return res.send('Ese usuario no existe')
        }
        return res.json(user);
    }
    catch(error){
        res.send(error.message);
    }
    });

router.post('/',async(req,res)=>{
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
        return res.send('Usuario registrado');
    }
    catch(error){
        res.send(error.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let userUpdate=User.findOne({where:{id: id}});
        if(!userUpdate){
            return res.send(`El usuario con el id ${id} no existe`);
        }
        await User.update(req.body,{where:{id: id}});
        return res.send('Usuario actualizado');
    }
    catch(error){
        res.send(error.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let userDelete=await User.findOne({where:{id: id}});
        if(!userDelete){
            return res.send(`El usuario con el id ${id} no existe`);
        }
        await User.destroy({where:{id: id}});
        return res.send('Usuario eliminado');
    }
    catch(error){
        res.send(error.message);
    }
    });

module.exports=router;