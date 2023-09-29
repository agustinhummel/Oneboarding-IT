const express=require('express');
const router=express.Router();
const { Contacto} =require('../models');

router.get('/:id?', async(req,res)=>{
    try{
        let id=req.params.id;
        if(id){
            let mensaje=await Contacto.findOne({id: id});
            if(!mensaje){
                return res.status(404).send(`El mensaje con el id ${id} no existe`);
            }
            return res.status(200).json(mensaje);
        }
        let mensajes= await Contacto.findAll();
        return res.status(200).json(mensajes);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        let { nombre, apellido, email, titulo, mensaje }=req.body;
        if(!nombre || !apellido || !email || !titulo || !mensaje){
            throw new Error('Faltan algúnos datos');
        }
        let mensajeBody=await Contacto.create({nombre,apellido,email,titulo,mensaje});
        return res.status(201).json(mensajeBody)
    }
    catch(error){
        res.status(500).send(error.message);
    }
});


module.exports=router;