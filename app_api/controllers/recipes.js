var mongoose = require('mongoose');
var recipesModel = mongoose.model('Recipe');

// RETURN A SINGLE RECIPE
module.exports.singleRecipe = function (req, res) {
    if (req.params && req.params.recipeId) {
        recipesModel
            .findById(req.params.recipeId)
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

// RETURN ALL RECIPES
module.exports.recipes = function (req, res) {
    recipesModel
        .find()
        .sort('name')
        .select({ _id : 1 , name : 1})
        .exec(function(err, recipes) {
            if (!recipes) {
                sendJsonResponse(res, 404, {
                    "message": "recipeId not found"
                });
                return;
            }  else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, recipes);
        });
};

// SEARCH FOR RECIPES THAT MATCH INGREDIENTS
module.exports.search = function (req, res) {
        var params = [];
        for (var propName in req.query) {
            if (req.query.hasOwnProperty(propName)) {
                var param = {'ingredients.name' : req.query[propName]};
                params.push(param);
            }
        }
        recipesModel
            .find( { $and : params } )
            .select('name')
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
};

// INSERT RECIPE TO DB
module.exports.addRecipe = function (req, res) {
    console.log('recipe add api', req.body.ingredients)
    console.log('recipe add api', req.body.name)
    console.log('recipe add api', req.body.instructions)
    recipesModel.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions:req.body.instructions
    }, function(err, recipe) {
        if (err) {
            console.log('This 400' , err);
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, recipe);
        }
    });
};

// EDIT RECIPE
module.exports.editRecipe = function (req, res) {
    console.log('recipe edit ing', req.body.ingredients)
    console.log('recipe edit name', req.body.name)
    console.log('recipe edit instruction', req.body.instructions)
    console.log('recipe edit id', req.params.recipeId)
    if (!req.params.recipeId) {
        sendJsonResponse(res, 404, {
            "message": "Not found, recipeId is required"
        });
        return; }
    recipesModel
        .findById(req.params.recipeId)
        .exec(
            function(err, recipe) {
                if (!recipe) {
                    sendJsonResponse(res, 404, {
                        "message": "recipeId not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                recipe.name = req.body.name,
                recipe.ingredients = req.body.ingredients,
                recipe.instructions = req.body.instructions
                recipe.save(function(err, recipe) {
                    if (err) {
                        console.log('This 404' , err);
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, recipe);
                    }
                 });
            } );
};

// DELETE RECIPE
module.exports.deleteRecipe = function (req, res) {
    var recipeId = req.params.recipeId;
    if (recipeId) {
        recipesModel
            .findByIdAndRemove(recipeId)
            .exec(
                function(err, recipe) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No recipeId"
        }); }

};

// GET LIST INGREDIENTS FOR AUTO SUGGEST
module.exports.listIngredients = function (req, res) {
        recipesModel
            .distinct('ingredients.name')
            .exec(function(err, list) {
                if (!list) {
                    sendJsonResponse(res, 404, {
                        "message": "List not found"
                    });
                    return;
                }  else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var reg = new RegExp("^" +req.query.ing , 'i')
                var regexpList = list.filter(
                    function(ingredient) {
                        return reg.test(ingredient);
                    }
                );
                sendJsonResponse(res, 200, regexpList);
            });
};

// GENEREIC RESPONSE
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

