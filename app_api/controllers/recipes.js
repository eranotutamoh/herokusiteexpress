var mongoose = require('mongoose');
var recipesModel = mongoose.model('Recipe');

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

module.exports.search = function (req, res) {
    if (true) {
        console.log('L:',Object.keys(req.query).length)
        recipesModel
            .find({'ingredients.name' : req.query.ing1, 'ingredients.name' : req.query.ing2})
            .select('')
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
    recipesModel.create({
        name: req.body.name,
        ingredients: formatIngredients(req),
        instructions:req.body.instructions
    }, function(err, recipe) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, recipe);
        }
    });
};


module.exports.editRecipe = function (req, res) {
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
                recipe.ingredients = formatIngredients(req),
                recipe.instructions = req.body.instructions
                recipe.save(function(err, recipe) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, recipe);
                    }
                 });
            } );
};

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

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


var formatIngredients = function (req) {
    var arr = [];
    for(key in req.body.ingredients) {
        var temp = req.body.ingredients[key].split(',');
        var obj = {name : temp[0] , quantity: temp[1]}
        arr.push(obj);
    }
    return arr
};