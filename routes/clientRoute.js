const express=require('express');
const router=express.Router();
const { Client }=require('../models');


router.get('/:id?',async(req,res)=>{
    try{
        let id=req.params.id; 
        if(!id){
            let clients=await Client.findAll();
            return res.json(clients);
        }
        let client=await Client.findOne({where:{id:id}});
        if(!client){
            return res.status(404).send(`El cliente con el id ${id} no existe`);
        }
        return res.json(client);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        let client=req.body;
        await Client.create(client);
        return res.status(201).send('Cliente registrado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let clientQuery=await Client.findOne({where:{id: id}});
        if(!clientQuery){
            return res.status(400).send(`No se puede actualizar el cliente con el id ${id} porque no existe`);
        }
        await Client.update(req.body,{where:{id:id}});
        return res.send('Cliente actualizado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let clientQuery=await Client.findOne({where:{id: id}});
        if(!clientQuery){
            return res.status(400).send(`No se puede eliminar el cliente con el id ${id} porque no existe`);
        }
        await Client.destroy({where:{id: id}});
        return res.send('Cliente eliminado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

module.exports=router;