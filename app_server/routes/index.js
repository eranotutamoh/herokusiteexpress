var express = require('express');
var router = express.Router();

var home = require('../controllers/main');
var recipes = require('../controllers/recipe');

console.log('Using the HTML routes');

router.get('/', home.index);
router.get('/recipesearch', recipes.search);
router.get('/recipe', recipes.recipe);
router.get('/recipeadd', recipes.add);


module.exports = router;
