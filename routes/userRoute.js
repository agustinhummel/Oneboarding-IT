const express=require('express');
const router=express.Router();
const { Usuarios } =require('../models');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


router.get('/', async (req,res)=>{
    try{
        let users=await Usuarios.findAll();
        return res.json(users);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
});

router.get('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let user=await Usuarios.findOne({where:{id: id}});
        if(!user){
            return res.status(404).send('Ese usuario no existe')
        }
        return res.json(user);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        let userObj=req.body;
        /*let {passwordR}=req.body;
        if(userObj.password!==passwordR){
            return res.status(400).send('las contraseñas no coinciden');
        }*/
        const hashResult=await new Promise((resolve,reject)=>{
            bcrypt.hash(userObj.clave,10,(err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
        userObj.clave=hashResult;
        await Usuarios.create(userObj);
        return res.status(201).send('Usuario registrado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/login',async(req,res)=>{
    try{
        let userQuery=await Usuarios.findOne({where: {nombres: req.body.nombre}});
        if(userQuery){
            let matchPassword=await bcrypt.compare(req.body.clave,userQuery.clave);
            if(matchPassword){
                let payload={
                    id: userQuery.id
                }
                let token=jwt.sign(payload,process.env.SECRET_TOKEN,{expiresIn: '1h'});
                return res.status(200).json({token: token});
            }
        }
        return res.status(401).send('Error en el usuario o contraseña');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let userUpdate=await Usuarios.findOne({where:{id: id}});
        if(!userUpdate){
            return res.status(400).send(`No se puede actualizar el usuario con el id ${id} porque no existe`);
        }
        await Usuarios.update(req.body,{where:{id: id}});
        return res.send('Usuario actualizado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let userDelete=await Usuarios.findOne({where:{id: id}});
        if(!userDelete){
            return res.status(400).send(`No se puede eliminar el usuario con el id ${id} porque no existe`);
        }
        await Usuarios.destroy({where:{id: id}});
        return res.send('Usuario eliminado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
    });

module.exports=router;