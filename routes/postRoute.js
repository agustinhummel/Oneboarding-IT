const express=require('express');
const router=express.Router();
const { Vacantes } = require('../models');
const verifyToken=require('../middlewares/tokenMiddleware')

router.get('/', async (req,res)=>{
    try{
        const post=await Vacantes.findAll();
        return res.json(post);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Vacantes.findOne({where:{id: id}});
        if(!post){
            return res.status(404).send('Esa vacante no existe')
        }
        return res.json(post);
    }
    catch(error){
        res.status(500).send(error.message);
    }
    });


    router.post('/', verifyToken, async(req,res)=>{
        const { skills, descripcion } = req.body;
        try {
            
            if (!skills || !description) {
                throw new Error('missing parameters')
            }

            const newPost = await Vacantes.create({skills, description })

            return res.status(201).json(newPost)

        } catch (error) {
            return res.status(404).json(`[Error post Post] - [Post - POST]: ${error.message}`)

        }
    });

    router.delete('/:id', verifyToken, async(req,res)=>{
        try{
            const id = req.params.id;
            const postDelete=await Vacantes.findOne({where:{id: id}});
            if(!postDelete){
                return res.status(400).send(`No se puede eliminar la vacante con el id ${id} porque no existe`);
            }
            await Vacantes.destroy({where:{id: id}});
            return res.send('Vacante eliminada');
        }
        catch(error){
            res.status(500).send(error.message);
        }
        });

        router.put('/:id', verifyToken, async(req,res)=>{
            try {
                const id = req.params.id;
                const { skills,
                    descripcion,
                    } = req.body;

                if (!skills || !descripcion) {
                    throw new Error('missing parameters')
                }
                const postFound = await Vacantes.findByPk(id);
    
                if (!postFound) throw new Error("Post not found");
                const response = await postFound.update({ title, description, initialDate, finalDate });
                await postFound.save();
                return res.status(200).json(response)
    
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    

module.exports=router;