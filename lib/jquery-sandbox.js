(function() {
    function randomStringID(len) {
        var randoms = [];
        for(var i = 0;i<len;i++){
            randoms.push();
        }
        return String.fromCharCode.apply(String,randoms);
    }
    var libname = randomStringID;
    if(typeof window.jQuerySandbox !== 'object'){
        var callbacks = [], script;
        window.jQuerySandbox = {
            originals: arguments,
            isReady: false,
            execute: function(callback) {
                if(window.jQuerySandbox.isReady) callback.call(this,window.jQuerySandbox.$,window.jQuerySandbox.$);
                else callbacks.push(callback);
            },
            setup: function(version){
                if(!document.body){
                  return window.onload = function() { window.jQuerySandbox.setup(version) };   
                }else{
                    if( typeof script == 'undefined' ){
                        script = document.createElement('script');
                        script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/'+(version||'1.4.2')+'/jquery.min.js');
                        script.onload = function() { 
                             if ( ! script.done ) script.done = true; window.jQuerySandbox.setup(version);
                        };
                        script.onreadystatechange = function() { 
                             if ( ( "loaded" === script.readyState || "complete" === script.readyState ) && !script.done ) {
                                 script.done = true; window.jQuerySandbox.setup(version);
                             }
                        };
                        return document.getElementsByTagName('body')[0].appendChild(script);
                    }else{ 
                        window.jQuerySandbox.$ = jQuery.noConflict( true );
                        window.jQuerySandbox.$(script).remove();
                        window.jQuerySandbox.isReady = true;
                        callbacks.forEach(function(fn) {
                            fn.call( window, window.jQuerySandbox.$, window.jQuerySandbox.$ );
                        });
                    }                    
                }
            },
            teardown: function(completely) {
                window.jQuery = window.jQuerySandbox.originals[0];
                window.$ = window.jQuerySandbox.originals[1];               
                delete(callbacks);
                var jquery = window.jQuerySandbox.$;
                if(completely === true){
                  delete(window.jQuerySandbox);  
                  return jquery
                }
                return window.jQuerySandbox = window.jQuerySandbox.$;
            }
        };
    }
})(window.jQuery,window.$)
