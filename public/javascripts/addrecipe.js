( function(){
    var form = document.querySelector('form');
    var ingsDiv = document.querySelector('section > .ingredients');
    var addIngButton = document.querySelector('.another');

    addIngButton.addEventListener('click' , function(){
        var newDiv = ingsDiv.cloneNode(true);
        form.insertBefore(newDiv, addIngButton);
        newDiv.childNodes[1].focus();
    })

    form.addEventListener('submit' , addIngredients);

    function addIngredients(){
        var ings = document.querySelectorAll('form .ingredients');
        for(i=0; i<ings.length; i++){
            var capName = ings[i].childNodes[3].value;
            capName = capName.charAt(0).toUpperCase() + capName.substr(1).toLowerCase();
            var ingQty =  capName +','+ ings[i].childNodes[1].value;
            addHidden(form , "ingredients" , ingQty);
        }
    }

    function addHidden(theForm, key, value) {
        // Create a hidden input element, and append it to the form:
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        theForm.appendChild(input);
    }

})()
