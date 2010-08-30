(function() {
    if(typeof window.jQQ !== 'object'){
        var callbacks = [], script;
        window.jQQ = {
            originals: arguments,
            isReady: false,
            isolate: function(callback) {
                if(callback.length<1) throw "Must specify at least one jQuery placeholder argument on functions passed to jQQ.isolate()";
                if(window.jQQ.isReady) callback.call(this,window.jQQ.$,window.jQQ.$);  
                else callbacks.push(callback);
            },
            setup: function(version){
                if(!document.body){
                  return window.onload = function() { window.jQQ.setup(version);delete(arguments.callee) };   
                }else{
                    if( typeof script == 'undefined' ){
                        script = document.createElement('script');
                        script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/'+(version||'1.4.2')+'/jquery.min.js');
                        script.onload = function() { 
                             if ( ! script.done ) script.done = true; window.jQQ.setup(version);
                        };
                        script.onreadystatechange = function() { 
                             if ( ( "loaded" === script.readyState || "complete" === script.readyState ) && !script.done ) {
                                 script.done = true; window.jQQ.setup(version);
                             }
                        };
                        return document.getElementsByTagName('body')[0].appendChild(script);
                    }else{ 
                        window.jQQ.$ = jQuery.noConflict( true );
                        window.jQQ.$(script).remove();
                        window.jQQ.isReady = true;
                        callbacks.forEach(window.jQQ.isolate);
                    }                    
                }
            },
            teardown: function(completely) {
                window.jQuery = window.jQQ.originals[0];
                window.$ = window.jQQ.originals[1];               
                delete(callbacks);
                var jquery = window.jQQ.$;
                if(completely === true){
                  delete(window.jQQ);  
                  return jquery.noConflict();
                }
                return window.jQQ = window.jQQ.$.noConflict(true);
            }
        };
    }
})(window.jQuery,window.$)
