var input = document.querySelector('#search');

input.addEventListener('keyup' , function() {


    var ajax = new XMLHttpRequest();

    ajax.open('GET', '/api/ingredients?ing='+this.value, true);

    ajax.addEventListener('load', downloadFinished, false);

    function downloadFinished(evt){
        if(this.status == 200){
            var ressy = this.response;
            console.log(ressy)
        }
    }

    ajax.send();


});