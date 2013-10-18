if(typeof window.jQQ !== 'object'){
(function() {
    var callbacks = [],jq;
    function loadScript(url, callback){
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (typeof script.readyState === 'undefined'){  
            script.onload = function(){
                callback();
            };            
        } else { // IE LAST!
            script.onreadystatechange = function(){
                if (script.readyState === "loaded" || script.readyState === "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };            
        };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        return script;
    };
    function validateCallback(callback) {
        if(typeof callback === 'undefined') throw "Cannot validate callback: undefined";
        if(callback && callback.length<1) throw "Callback missing at least 1 placeholder argument";
        return callback;
    };
    function fillArray(data,qty) {
        var array  = [];
        for(var i=qty;i>0;i--) array.push(data);
        return array;
    };
    window.jQQ = {
      isReady: false,
      isolate: function() {
          var callback = validateCallback(arguments[0]);
          if( !window.jQQ.isReady ) return callbacks.push( callback );
          return callback.apply( this, fillArray( jq, callback.length ) );

      },
      setup: function(version) {
          // wait for document to load...
          if(!document.body) return window.onload = function(){ window.jQQ.setup(version) };

          var useSSL = 'https:' === document.location.protocol;
          var url = (useSSL ? 'https:' : 'http:') + '//ajax.googleapis.com/ajax/libs/jquery/'+(version||'1.4.2')+'/jquery.min.js';

          loadScript( url , function() {
              window.jQQ.isReady = true;

              // this stores the new version and gives back the old one, completely.              
              jq = jQuery.noConflict(true);
              
              var callback;
              for(var i = 0; i < callbacks.length; i++) {
                callback = callbacks[i];
                window.jQQ.isolate(callback);
              }
              delete(callbacks);
              
          });
      }
    };
})(window.jQuery,window.$)
}
