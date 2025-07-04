const express = require('express')
const userController = require('./controllers/userController')
const recipeController = require('./controllers/recipeController')
const saveRecipeController = require('./controllers/savedRecipeController')
const downloadController = require('./controllers/downloadController')
const testimonialController = require('./controllers/testimonialController')
const jwt = require('./middleware/jwtMiddleware')
const routes = express.Router()

//Register
routes.post('/user-register', userController.registerController)
//login
routes.post('/user-login',userController.loginController)

//home recipes
routes.get('/home-recipes',recipeController.getHomeRecipesController)

//all recipes
routes.get('/all-recipes',recipeController.getAllRecipesController)

//get view a recipe
routes.get('/view/:id',jwt, recipeController.viewRecipeController)

//get all related recipes
routes.get('/related-recipes',jwt,recipeController.getAllRelatedRecipesController)

//to save recipe
routes.post('/save-recipe/:recipeId',jwt,saveRecipeController.addSaveRecipeController)

//path to download recipe
routes.post('/download-recipe/:recipeId',jwt, downloadController.addDownloadRecipeController)

//path to get all svaed user recipes
routes.get('/saved-user-recipes',jwt, saveRecipeController.getAllSavedUserRecipesController)

//path to delete a saved recipe
routes.delete('/delete-saved-user-recipes/:id',saveRecipeController.deleteSavedRecipesController)

//path to get downloaded user recipes
routes.get('/downloaded-user-recipes',jwt, downloadController.getAllDownloadedRecipesController)

//path to update profile
routes.put('/profile-update',jwt,userController.updateProfileController)

//path to get all users
routes.get('/all-users',userController.getAllUsersConstroller)

//path to get all downloads
routes.get('/all-downloads',downloadController.getAlldownloadController)

//path to add a new recipe
routes.post('/add-recipe',recipeController.addNewRecipeController)

//path to delete a recipe
routes.delete('/delete-recipe/:id',recipeController.deleteRecipeController)

//path to add testimonial
routes.post('/add-testimonial', testimonialController.addTestimonialController)

//path to get all testimonial
routes.get('/get-all-testimonials', testimonialController.getAllTestimonialController)

//path to update testimony
routes.put('/update-testimonial/:id',testimonialController.updateTestimonialStatusController)

//path to get approved testimonial
routes.get('/all-approved-testimonial',testimonialController.getAllApprovedTestimonialsController)

module.exports = routes