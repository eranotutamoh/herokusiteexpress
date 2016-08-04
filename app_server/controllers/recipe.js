var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://utamoh.herokuapp.com";
}

// SEARCH BY INGREDIENTS
module.exports.search = function (req, res) {
    renderHomepage(req, res);
};
var renderHomepage = function(req, res){
    res.render('search', {
        title: 'Recipe Search',
        text: {
            h1: 'Search',
            info: 'Enter ingredients one at a time'

        }
    });
};

// LIST RECIPES
module.exports.listrecipes = function (req, res) {
    var requestOptions, path;
    path = '/api/recipes/';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    console.log('API INFO',requestOptions);
    request(
        requestOptions,
        function (err, response, body) {
            if (err)   console.log(err);
            else if (response.statusCode === 200)  renderRecipes(req, res, body);
            else console.log(response.statusCode);
        });
}
var renderRecipes = function(req, res, recipes){
    res.render('recipes', {
        title: 'Recipes',
        text: {
            h1: 'Recipes',
        },
        recipes : recipes
    });
};

// SHOW SINGLE RECIPE / EDIT A RECIPE
module.exports.recipe = function (req, res) {
    var renderPage = (req.params.edit) ? 'recipeedit' : 'recipe';
    var requestOptions, path;
    path = '/api/recipe/' + req.params.recipeid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (err)   console.log(err);
            else if (response.statusCode === 200)  renderRecipe(req, res, body, renderPage );
            else console.log(response.statusCode);
        });
}
var renderRecipe = function(req, res, recipe, view){
    var ings = []
    for(ing in recipe.ingredients) {
        ings.push({name : recipe.ingredients[ing].name, quantity : recipe.ingredients[ing].quantity});
    }
    res.render(view, {
        title: recipe.name,
        id  : req.params.recipeid,
        text: {
            h1: recipe.name,
            desc : recipe.instructions
        },
    ingred : ings
    });
};

// EDIT RECIPE
module.exports.editpost = function (req, res) {
    var requestOptions, path, postdata;
    path = "/api/recipeedit/"+req.body.recipeid;
    postdata = {
        name: req.body.name,
        ingredients: formatIngredients(req.body.ingredients),
        instructions: req.body.instructions
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };
    if (!postdata.name || postdata.ingredients.length === 0 || !postdata.instructions) {
        res.redirect('/recipeedit/' +req.body.recipeid+ '/true?err=val');
        return false;
    }
    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 200) {
                res.redirect('/recipe/' + req.body.recipeid);
            }
            else if (response.statusCode === 404 && body.name && body.name === "ValidationError" ) {
                res.redirect('/recipeedit/' +req.body.recipeid+ '/true?err=val');
            }
            else {
                console.log('Bad ass edit' , response.statusCode);
            }
        }
    );
};

// ADD A RECIPE
module.exports.add = function (req, res) {
    res.render('recipeadd', {
        title: 'Add Recipe',
        error: req.query.err
    });
};

module.exports.addpost = function (req, res) {

    var requestOptions, path, postdata;
    path = "/api/recipeadd";
    postdata = {
        name: req.body.name,
        ingredients: formatIngredients(req.body.ingredients),
        instructions: req.body.instructions
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    if (!postdata.name || postdata.ingredients.length === 0 || !postdata.instructions) {
        res.redirect('/recipeadd?err=vall');
        return false;
    }
    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/recipe/' + response.body._id);
            }
            else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
                res.redirect('/recipeadd?err=val');
            }
            else {
                console.log(body);
                res.render('recipeadd', { title: 'Add Recipe' });
            }
        }
    );
};

// PREPARE INGREDIENTS FOR THE SUB DOCUMENT
var formatIngredients = function (ings) {
    var ingsObj = (typeof(ings) === 'object') ? ings : [ings]; //If only  1 ingredient it is string not expected array
    var arr = [];
    for(key in ingsObj) {
        var temp = ingsObj[key].split(',');
        var obj = {name : temp[0] , quantity: temp[1]}
        if(obj.name) arr.push(obj);
    }
    return arr
};

