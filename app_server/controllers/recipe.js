module.exports.search = function (req, res) {
    res.render('search', {
        title: 'Recipe Search',
        text: {
            h1: 'Search',
            info: 'Enter an ingredient'
        },
        ingredients: ['broccoli','carrot','sour cream']
    });
};
module.exports.recipe = function (req, res) {
    res.render('recipe', { title: 'A Recipe' });
};
module.exports.add = function (req, res) {
    res.render('recipeadd', { title: 'Add Recipe' });
};