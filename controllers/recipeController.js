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
    res.status(500).json(error)
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

exports.addNewRecipeController = async(req,res)=>{
    const {recipeName,preTime,calories, serving, cookingTime, rating, modeofCooking, mealType, cuisineType, ingredients, instructions, image} = req.body
    console.log(recipeName,preTime,calories, serving, cookingTime, rating, modeofCooking, mealType, cuisineType, ingredients, instructions, image);
    

    try {
        const newRecipe = new recipes({
            name:recipeName,
            ingredients,
            instructions,
            prepTimeMinutes:preTime,
            cookTimeMinutes:cookingTime,
            servings:serving,
            difficulty:modeofCooking,
            cuisine:cuisineType,
            caloriesPerServing:calories,
            image,
            rating,
            mealType
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)

    } catch (error) {
       res.status(500).json(error) 
    }
}

exports.deleteRecipeController = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {

        await recipes.findByIdAndDelete({_id:id})
        res.status(200).json('deletion successful')
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}