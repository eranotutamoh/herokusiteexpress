var mongoose = require( 'mongoose' );

var ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
});

var ingredientsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: String
});

var recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [ingredientsSchema],
    instructions: String
});


mongoose.model('Ingredient', ingredientSchema);
mongoose.model('Recipe', recipeSchema);


