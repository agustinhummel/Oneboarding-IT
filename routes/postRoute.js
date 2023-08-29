const express=require('express');
const router=express.Router();
const { Post } = require('../models');

router.get('/', async (req,res)=>{
    try{
        const post=await Post.findAll();
        return res.json(post);
    }
    catch(error){
        return res.status(500).send(error.message);
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findOne({where:{id: id}});
        if(!post){
            return res.status(404).send('Ese post no existe')
        }
        return res.json(post);
    }
    catch(error){
        res.status(500).send(error.message);
    }
    });


    router.post('/',async(req,res)=>{
        const { title, description, initialDate, finalDate } = req.body;
        try {
            
            if (!title || !description || !initialDate || !finalDate ) {
                throw new Error('missing parameters')
            }

            const newPost = await Post.create({title, description, initialDate, finalDate })

            return res.status(201).json(newPost)

        } catch (error) {
            return res.status(404).json(`[Error post Post] - [Post - POST]: ${error.message}`)

        }
    });

    router.delete('/:id',async(req,res)=>{
        try{
            const id = req.params.id;
            const postDelete=await Post.findOne({where:{id: id}});
            if(!postDelete){
                return res.status(400).send(`No se puede eliminar el post con el id ${id} porque no existe`);
            }
            await Post.destroy({where:{id: id}});
            return res.send('Post eliminado');
        }
        catch(error){
            res.status(500).send(error.message);
        }
        });

        router.put('/:id',async(req,res)=>{
            try {
                const id = req.params.id;
                const { title,
                    description,
                    initialDate,
                    finalDate } = req.body;

                if (!title || !description || !initialDate || !finalDate ) {
                    throw new Error('missing parameters')
                }
                const postFound = await Post.findByPk(id);
    
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