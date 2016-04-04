var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://nameless-dusk-99213.herokuapp.com";
}

module.exports.search = function (req, res) {
    var requestOptions, path;
    path = '/api/ingredientsearch';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            ing1 : 'oregano',
            ing2 : 'cheese'
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderHomepage(req, res, body);
        }
    );
};


module.exports.recipe = function (req, res) {
    res.render('recipe', { title: 'A Recipe' });
};


module.exports.add = function (req, res) {
    res.render('recipeadd', { title: 'Add Recipe' });
};


var renderHomepage = function(req, res, responseBody){
    res.render('search', {
        title: 'Recipe Search',
        text: {
            h1: 'Search',
            info: 'Enter an ingredient'
        },
        ingredients: responseBody
         });
};


