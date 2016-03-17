module.exports.search = function (req, res) {
    res.render('search', { title: 'Recipe Search' });
};
module.exports.recipe = function (req, res) {
    res.render('recipe', { title: 'A Recipe' });
};
module.exports.add = function (req, res) {
    res.render('recipeadd', { title: 'Add Recipe' });
};