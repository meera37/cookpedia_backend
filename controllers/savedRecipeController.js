const savedRecipes = require("../models/saveModel")

exports.addSaveRecipeController = async(req,res)=>{
   const {recipeId} = req.params
   const {name,image} = req.body
   const userId = req.payload //payload string so no need to destructure
   
    try {
        const recipe = await savedRecipes.findOne({recipeId, userId})
        if(recipe){
            res.status(406).json('Already Saved')
        }
        else{
            const newSavedRecipe = new savedRecipes({
                recipeId,
                name,
                image,
                userId
            })
            await newSavedRecipe.save()
            res.status(200).json(newSavedRecipe)
        }
    } catch (error) {
      res.status(500).json(error)  
    }
}

exports.getAllSavedUserRecipesController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    
    try {
        const allSavedRecipes = await savedRecipes.find({userId})
        res.status(200).json(allSavedRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteSavedRecipesController = async(req,res)=>{
    const {id} = req.params
    try {
        await savedRecipes.findByIdAndDelete({_id:id})
        res.status(200).json('deletion successful')
        
    } catch (error) {
        res.status(500).json(error)
    }
}