var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipes');

router.get('/recipe/:recipeId', ctrlRecipes.singleRecipe);
router.post('/recipeadd', ctrlRecipes.addRecipe);
router.get('/ingredients', ctrlRecipes.ingredientList);
router.put('/recipeedit', ctrlRecipes.editRecipe);
router.delete('/recipedelete', ctrlRecipes.deleteRecipe);

module.exports = router;