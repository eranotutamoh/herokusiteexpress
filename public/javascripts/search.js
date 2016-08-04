(function() {
    var recipeList  = document.querySelector('#col3 ul');
    var showIngredient = document.querySelector('#ingText');
    var clearButton = document.querySelector('#clear');
    var parameters = [];

    clearButton.addEventListener('click' , clear)


    console.log('   IN SEARCH.JS@@@@')


    var suggest = Suggest.init({
        input : document.querySelector('#search'),
        suggestDiv : document.querySelector('#suggest'),
        lookup : lookupIngredients,
        selected : displayIngredient
    });

    function displayIngredient(ingredient) {
        var parameterString = '';
        showIngredient.textContent = showIngredient.textContent+' '+ingredient;
        parameters.push(ingredient);
        var j = 2;
        for(i=0; i<parameters.length; i++) {
            var par = (i == 0) ? '?ing1=' : '&ing'+j+++'='
            parameterString += par+parameters[i];
        }
        ajax('GET' , 200 , '/api/ingredientsearch'+parameterString, listRecipes)
    }

    function listRecipes(res){
        var results = JSON.parse(res);
        recipeList.innerHTML = '';
        for(var x in results){
            console.log('::',results[x].name)
            var li = document.createElement("li");
            var a = document.createElement("a");
            li.appendChild(a);
            var text = document.createTextNode(results[x].name);
        a.setAttribute('href','/recipe/'+results[x]._id);
            a.setAttribute('target','_blank');
            a.appendChild(text);
            recipeList.appendChild(li, null);
        }
    }

    function clear() {
        parameters = [];
        showIngredient.textContent = "Recipes with:";
        recipeList.innerHTML = "";
    }

    function lookupIngredients(searchString) {
        ajax('GET' , 200 , '/api/ingredients?ing=' + searchString, suggestResults)
    }

    function suggestResults(result) {
        suggest.create(JSON.parse(result));
    }

})();
