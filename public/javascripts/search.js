var input = document.querySelector('#search');

input.addEventListener('keyup' , function() {
    console.log('Rockin')

    var ajax = new XMLHttpRequest();

    ajax.open('GET', '/api/ingredients?ing='+this.value, true);

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

    function downloadFinished(evt){
        if(this.status == 200){
            var ressy = this.response;
            console.log(ressy)
        }
    }

    ajax.send();


});