var loadVersion,testFn;

loadVersion = '1.4.2'
testFn = function() { return true };
jQuerySandbox.setup(loadVersion);
stop();
$.fn.testFn = testFn;
jQuerySandbox.execute(function(jQuery,$) {
    test('window.jQuery and sandboxed jQuery are not the same',function() {
        expect(4)        
        equals(window.jQuery.fn.jquery,'1.3.2', 'global jQuery should be old jQuery');
        equals(window.$.fn.jquery,'1.3.2', 'global jQuery  should be old jQuery');    
        equals(jQuery.fn.jquery,loadVersion,'local jQuery should be new jQuery')
        equals($.fn.jquery,loadVersion,'local jQuery should be new jQuery')        
        start()
    });
});
jQuerySandbox.execute(function(jQuery,$) {
    test('Binding callbacks',function() {
        expect(1)
        ok(true,'Should be able to bind multiple execute callbacks');
        start();
    })

})
jQuerySandbox.execute(function(jQuery,$) {
    test('Plugin Integrity',function() {
        expect(2)
        same(window.jQuery.fn.testFn,testFn,'global jQuery should contain original plugin');
        ok((typeof $.fn.testFn === 'undefined'),'local jQuery should not contain original plugin');
        start();
    });
})

jQuerySandbox.execute(function(jQuery,$) {
    test('window.destroyjQuerySandbox',function() {
        jQuerySandbox.teardown();
        expect(4)        
        equals(window.jQuery.fn.jquery,'1.3.2', 'should be old jQuery');
        equals(window.$.fn.jquery,'1.3.2', 'should be old jQuery');    
        same(window.jQuery.fn.testFn,testFn,'plugin integrity: checking...');
        ok(window.jQuery.fn.testFn(),'plugin integrity: check!');        
        start()
    })
})

jQuerySandbox.execute(function(jQuery,$) {
    test('after a destroy, the new jQuery is still accessible, why the hell not?',function() {
        expect(1)        
        equals(window.jQuerySandbox.fn.jquery,'1.4.2', 'should be the previously sandboxed jQuery');
        start()
    })
})

