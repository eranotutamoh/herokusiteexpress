function ajax( method, status, url, callback) {
    var ajax = new XMLHttpRequest();
    ajax.open(method , url, true);
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
        if (this.status == status) {
            callback(this.response);
        }
    }
    ajax.send();
}