var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipes');

router.get('/recipe/:recipeId', ctrlRecipes.singleRecipe);
router.post('/recipeadd', ctrlRecipes.addRecipe);
router.get('/ingredients', ctrlRecipes.listIngredients);
router.get('/ingredientsearch', ctrlRecipes.search);
router.get('/recipes', ctrlRecipes.recipes);
router.put('/recipeedit/:recipeId', ctrlRecipes.editRecipe);
router.delete('/recipedelete/:recipeId', ctrlRecipes.deleteRecipe);

module.exports = router;