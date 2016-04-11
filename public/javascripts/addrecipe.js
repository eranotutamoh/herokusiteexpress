( function(){
    var form = document.querySelector('form');
    var ingsDiv = document.querySelector('section > .ingredients');
    var addIngButton = document.querySelector('.another');
    var edit = location.href.includes('true');

    if(location.href.includes('true')) console.log('Here we are' , location);

    addIngButton.addEventListener('click' , addIngredientDiv)

    form.addEventListener('submit' , valid);

    function valid(e) {
        e.preventDefault();
        clearErrors();
        var ings = form.querySelectorAll('.ingredients');
        for(i=0; i<ings.length; i++) {
            var ingNameEl = ings[i].childNodes[3];
            if (!ingNameEl.value) ingNameEl.classList.add('error');
        }
        var recipeName = document.querySelector('input[name="name"]');
        if(!recipeName.value) recipeName.classList.add('error');
        var missing = document.querySelectorAll('.error');
        if(missing.length === 0) {
            addIngredients(ings);
            form.submit();
        } else missing[0].focus();
    }

    function clearErrors() {
        var errs = document.querySelectorAll('.error');
        for(i=0; i<errs.length; i++) {
            errs[i].classList.remove('error');
        }
    }

    function addIngredients(ings){
        for(i=0; i<ings.length; i++){
            var capName = ings[i].childNodes[3].value;
            capName = capName.charAt(0).toUpperCase() + capName.substr(1).toLowerCase();
            var ingQty =  capName +','+ ings[i].childNodes[1].value;
            addHidden(form , "ingredients" , ingQty);
        }
    }

    function addIngredientDiv(){
        var newDiv = ingsDiv.cloneNode(true);
        var delIngButton = newDiv.querySelector('.takeaway');
        delIngButton.addEventListener('click' , function(){
            var removeThis = this.parentNode;
            form.removeChild(removeThis);
        })
        form.insertBefore(newDiv, addIngButton);
        newDiv.childNodes[1].focus();
    }

    function addHidden(theForm, key, value) {
        // Create a hidden input element, and append it to the form:
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        theForm.appendChild(input);
    }

    if(edit) {
        var takeaways = form.querySelectorAll('.takeaway');
        for (i = 0; i < takeaways.length; i++) {
            if(i == 0) {
                takeaways[i].parentNode.removeChild(takeaways[i]);
                continue;
            }
            takeaways[i].addEventListener('click', function () {
                var removeThis = this.parentNode;
                form.removeChild(removeThis);
            })
        }
    }

})()
