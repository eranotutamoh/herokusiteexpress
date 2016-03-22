var mongoose = require('mongoose');
var recipesModel = mongoose.model('Recipe');
var ingredientModel = mongoose.model('Ingredient');

module.exports.singleRecipe = function (req, res) {
    if (req.params && req.params.recipeId) {
        recipesModel
            .find({'ingredients.name' : 'Carrots', 'ingredients.name' : 'Celery'})
            .select('_id')
            .exec(function(err, recipe) {
                if (!recipe) {
                    sendJsonResponse(res, 404, {
                        "message": "recipeId not found"
                    });
                    return;
                }  else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, recipe);
                    });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No recipeId in request"
        });
    }
};

module.exports.addRecipe = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.ingredientList = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.editRecipe = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteRecipe = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "success"});
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
