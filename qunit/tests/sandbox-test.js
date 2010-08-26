module("Test jQuery noConflict Sandboxing");
window.onjQuerySandboxed = function(jQuery,$) {
    asyncTest('window.jQuery is 1.3.2',function() {
    expect(2)        
    equals(window.jQuery.fn.jquery,'1.3.2', 'should be old jQuery');
    equals(window.$.fn.jquery,'1.3.2', 'should be old jQuery');    
        start()
    });
    asyncTest('sandbox.jQuery is 1.4.2',function() {
        expect(2)                
        equals(jQuery.fn.jquery,'1.4.2','should new jQuery')
        equals($.fn.jquery,'1.4.2','should new jQuery')    
        start()
    })
}