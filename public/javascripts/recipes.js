(function() {
    var delButtons = document.querySelectorAll('.delete');
    var editButtons = document.querySelectorAll('.edit');
    var deleteId = '';

    Array.prototype.forEach.call(delButtons, function( button ){
        button.addEventListener('click' , function(){
            if(!confirm('Delete recipe?')) return;
            var id =  button.parentNode.id.substr(2);
            deleteId =  button.parentNode.id  ;
            ajax('DELETE' , 204, '/api/recipedelete/'+id , deleted)
        })
    });

    Array.prototype.forEach.call(editButtons, function( button ){
        button.addEventListener('click' , function(){
            var id =  button.parentNode.id.substr(2);
            location = '/recipeedit/' +id+ '/true   '
        })
    });

    function deleted(res) {
        var dumped = document.querySelector('#'+deleteId);
        dumped.style.display = 'none'
    }

})();

