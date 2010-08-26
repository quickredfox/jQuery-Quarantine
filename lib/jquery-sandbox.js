(function() {
    var script,init,sandboxed,origin = arguments;
    window.onload = function() {
        if(typeof window.onjQuerySandboxed === 'function'){
            init = arguments.callee;
            if(!init.setup){
                init.setup = true;
                script = document.createElement('script');
                script.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
                script.onload = function() { 
                     if ( ! script.done ) script.done = true; init();
                };
                script.onreadystatechange = function() { 
                     if ( ( "loaded" === script.readyState || "complete" === script.readyState ) && !script.done ) {
                         script.done = true;init();
                     }
                };
                return document.getElementsByTagName('body')[0].appendChild(script);
            }else{
                sandboxed = jQuery.noConflict( true );
                window.onjQuerySandboxed.call( window, sandboxed, sandboxed );
                window.jQuery = origin[0]; 
                window.$ = origin[1];
            }            
        }
    }
// $ could have been noConflict()'ed so we have to split these in 2 vars.
})(window.jQuery,window.$);