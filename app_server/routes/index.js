var express = require('express');
var router = express.Router();

var home = require('../controllers/main');
var recipes = require('../controllers/recipe');

// Home site
router.get('/', home.index);
router.get('/git', home.git);


// Sub site Recipes
router.get('/recipes', recipes.listrecipes);
router.get('/recipesearch', recipes.search);
router.get('/recipe/:recipeid', recipes.recipe);
router.get('/recipeedit/:recipeid/:edit', recipes.recipe);
router.post('/recipeedit/:recipeid/:edit', recipes.editpost);
router.get('/recipeadd', recipes.add);
router.post('/recipeadd', recipes.addpost);


router.get('/', home.index);

module.exports = router;
