(function() {
    var input = document.querySelector('#search');
    var suggestDiv = document.querySelector('#suggest');
    var counter = 0;

    input.addEventListener('keydown', enter);
    input.addEventListener('keyup', keyCode);

    function suggest(ingredient) {
        var a = document.createElement("a");
        var text = document.createTextNode(ingredient);
        a.appendChild(text);
        if(counter == 0) a.classList.add('hot');
        suggestDiv.insertBefore(a, null);

    }

    function select() {
        var hot = document.querySelector('.hot');
        hot.classList.remove('hot');
        var next = (hot.nextSibling === null) ? suggestDiv.firstChild : hot.nextSibling;
        console.log('NEXT:' , next);
        next.classList.add('hot');

    }

    function enter(e) {
        if(e.code === "Enter") {
            e.preventDefault();
            input.value='';
            var hot = document.querySelector('.hot');
            console.log('ENTER!!!!!!', hot.textContent);
            suggestDiv.innerHTML='';

        }

    }

    function keyCode(e) {
        if(e.code === "ArrowDown") select();
        else if(e.code === "Enter") return false;
        else lookupIngredients.call(e.target);
    }

    function lookupIngredients() {

        var ajax = new XMLHttpRequest();

        ajax.open('GET', '/api/ingredients?ing=' + this.value, true);

        ajax.addEventListener('load', downloadFinished, false);
        ajax.addEventListener('loadstart', onLoadStart, false);
        ajax.addEventListener('progress', onProgress, false);
        ajax.addEventListener('error', onError, false);
        ajax.addEventListener('abort', onAbort, false);

        function onLoadStart(evt) {
            console.log('onLoadStart')
        }

        function onProgress(evt) {
            console.log('onProgress')
        }

        function onError(evt) {
            console.log('onError')
        }

        function onAbort(evt) {
            console.log('onAbort')
        }

        function downloadFinished(evt) {
            if (this.status == 200) {
                counter = 0;
                suggestDiv.innerHTML='';
                var parsed = JSON.parse(this.response);
                for(var x in parsed){
                    suggest(parsed[x]);
                    counter++;
                }
            }
        }

        ajax.send();


    }


})();