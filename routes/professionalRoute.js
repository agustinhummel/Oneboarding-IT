const express=require('express');
const router=express.Router();
const { Postulantes }=require('../models');
const bcrypt=require('bcryptjs');

router.get('/:id?',async(req,res)=>{
    try{
        let id=req.params.id;
        if(!id){
            let professionals= await Postulantes.findAll();
            return res.json(professionals);
        }
        let professional=await Postulantes.findOne({where:{id: id}});
        if(!professional){
            return res.status(404).send('Ese empleado no existe');
        }
        return res.json(professional);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.post('/',async(req,res)=>{
    try{
        let professional=req.body;
        /*let {passwordR}=req.body;
        if(professional.password!==passwordR){
            return res.status(400).send('Las contraseñas no coinciden');
        }*/
        const hashResult=await new Promise((resolve,reject)=>{
            bcrypt.hash(professional.clave,10,(err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
        professional.clave=hashResult;
        await Postulantes.create(professional);
        return res.status(201).send('Empleado registrado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
})

router.put('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let professionalQuery=await Postulantes.findByPk(id);
        if(!professionalQuery){
            return res.status(400).send(`No se puede actualizar el postulante con el id ${id} porque no existe`);
        }
        await Postulantes.update(req.body,{where:{id: id}});
        return res.send('Actualizado');
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let professionalQuery=await Postulantes.findByPk(id);
        if(!professionalQuery){
            return res.status(400).send(`No se puede eliminar el postulante con el id ${id} porque no existe`);
        }
        await Postulantes.destroy({where:{id: id}});
        return res.send('Eliminado')
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

module.exports=router;