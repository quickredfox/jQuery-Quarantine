# UPDATE

I opened up the issues section seeing as some people seem to use this. I'd advise against using this now. This solution was written for a specific time 
in DHTML land and browsers/CSS/HTML have evolved past this. The future (I think) - for this kind of situation - is using the shadow dom.  

# jQuery Quarantine

Inject and Isolate a specific version of jQuery into the page and use it in a non-conflicting way.

## Example Usage

Let's say you're building a widget intended to be embedded within some arbitrary html which you have no control over. 
Furthermore, let's assume the page which our widget will be installed in either has an older jQuery version than the one 
you want or it has no jQuery at all. On top of that, you want to use some plugins you made/downloaded that all hook onto
the jQuery and $ namespaces without having to rewrite them entirely.... This haphazard of a hack flavoured javascript 
Helps you do that.

Of course, you cant use this right out of the box depending on the size and distribution of your project but I will try to document 
the 3 public methods and give a tiny theoretical application of this approach.

    /*
       jQQ.setup([aVersionString]); 

       Loads a copy of jquery from google CDN (you can pass in a version string 
	   see: http://code.google.com/apis/libraries/devguide.html#jquery for supported version strings.

    */
       jQQ.setup('1.4.2');

    /*
       jQQ.isolate([aFunction]); 
	   
	   Runs your function whenever the quarantine is ready. The function signature MUST have at least one argument, a jQuery placeholder.  
	   	
    */
       jQQ.isolate(function($){
			// $ here is our injected version.
			$.fn.myplugin = {
				desc: "A magic little plugin that exists only within the confines of quarantine"
			};
       });
       jQQ.isolate(function($){
			// Isolate callbacks are executed in order of addition
			$(document.body).myplugin();
       });
		// note: current design makes it that if your callback signature has n arguments it will be passed n times the newly loaded jQuery 
		// (each argument == jquery)
       jQQ.isolate(function(jQuery,$){
			// true	
			return (jQuery === $ && !arguments[2]); 
       });
       jQQ.isolate(function(jQuery,$,another){
            // false, because function signature has 3 arguments, the last one is the same as the others.	
			return (jQuery === $ && !arguments[2]);
       });


So basically, figure it out :P

## License 

(The MIT License)

Copyright (c) 2010 Francois Lafortune, code@quickredfox.at

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
