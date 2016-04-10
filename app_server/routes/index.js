var express = require('express');
var router = express.Router();

var home = require('../controllers/main');
var recipes = require('../controllers/recipe');

console.log('Using the HTML routes');

router.get('/', home.index);
router.get('/recipes', recipes.listrecipes);
router.get('/recipesearch', recipes.search);
router.get('/recipe/:recipeid', recipes.recipe);
router.get('/recipeedit/:recipeid/:edit', recipes.recipe);
router.post('/recipeedit/:recipeid/:edit', recipes.editpost);
router.get('/recipeadd', recipes.add);
router.post('/recipeadd', recipes.addpost);


module.exports = router;
