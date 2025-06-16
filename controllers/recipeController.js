//to get 3 recipes from database

const recipes = require("../models/recipeModel")

exports.getHomeRecipesController = async(req,res)=>{

    try {
    
const homeRecipes = await recipes.find().limit(6)
res.status(200).json(homeRecipes)

} catch (error) {
    res.status(500).json(error)
}
}

exports.getAllRecipesController = async(req,res)=>{

    try {
    
const allRecipes = await recipes.find()
res.status(200).json(allRecipes)

} catch (error) {
    res.status(500).json(error)
}
}

exports.viewRecipeController = async(req,res)=>{
    console.log('inside view recipe');
   // res.status(200).json('req,recived')
   const {id}= req.params

   try {
    const RecipeDetails = await recipes.findOne({_id:id})
    res.status(200).json(RecipeDetails)
    
   } catch (error) {
    res.status(401).json(error)
   }
}

exports.getAllRelatedRecipesController = async(req,res)=>{
    try {
        const cuisine = req.query.cuisine
        console.log(cuisine);

        const allrelatedRecipes = await recipes.find({cuisine})

        res.status(200).json(allrelatedRecipes)
        
        
    } catch (error) {
        
    }
}