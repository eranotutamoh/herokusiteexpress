(function() {
    var recipeList  = document.querySelector('#col3');
    var showIngredient = recipeList.querySelector('li:first-child');
    var suggest = Suggest.init({
        input : document.querySelector('#search'),
        suggestDiv : document.querySelector('#suggest'),
        lookup : lookupIngredients,
        selected : displayIngredient
    });

    function displayIngredient(ingredient) {
        showIngredient.textContent = showIngredient.textContent+' '+ingredient;
        ajax('/api/ingredientsearch?ing1=lettuce&ing2=cheese', listRecipes)
    }

    function listRecipes(results){

        for(var x in results){
            console.log('::',results[x].name)
            var li = document.createElement("li");
            var a = document.createElement("a");
            li.appendChild(a);
            var text = document.createTextNode(results[x].name);
            a.setAttribute('href','api/recipe:'+results[x]._id);
            a.appendChild(text);
            recipeList.appendChild(li, null);
        }
    }

    function lookupIngredients(searchString) {
        ajax('/api/ingredients?ing=' + searchString, suggestResults)
}

    function suggestResults(result) {
        suggest.create(result);
    }

    function ajax(url, callback) {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.addEventListener('load', downloadFinished, false);
        ajax.addEventListener('loadstart', onLoadStart, false);
        ajax.addEventListener('progress', onProgress, false);
        ajax.addEventListener('error', onError, false);
        ajax.addEventListener('abort', onAbort, false);

        function onLoadStart(evt) {
            //console.log('onLoadStart')
        }
        function onProgress(evt) {
            //console.log('onProgress')
        }
        function onError(evt) {
            console.log('onError')
        }
        function onAbort(evt) {
            console.log('onAbort')
        }
        function downloadFinished(evt) {
            if (this.status == 200) {
                callback(JSON.parse(this.response));
            }
        }
        ajax.send();
    }

})();

