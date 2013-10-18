describe("Setup", function () {


  beforeEach(function () {
    window.jQQ.isReady = false;
  });

  it("Check second jQuery is loaded", function () {
    runs(function () {
      jQQ.setup("1.4.2");
    });
    
    waitsFor(function () {
      if(window.jQQ.isReady === true) {
        return true;
      } else {
        return false;
      }
    }, "'noConflict' method never called", 3000);
  });

  it("Check second nonexistent jQuery is not loaded", function () {
    var flag = false;
    runs(function () {
      jQQ.setup("x.x.x");

      setTimeout(function() {
        flag = true;
      }, 1500);
    });
    
    waitsFor(function () {
      return flag === true;
    }, "flag should be true after 1500 ms", 2000);

    runs(function () {
      expect(window.jQQ.isReady).toEqual(false);
    });
  });

  it("Check callbacks are deleted properly", function () {

    spyOn(window.jQQ, "isolate").andCallThrough();
    var flag = false;
    runs(function () {
      jQQ.setup("1.4.2");
      jQQ.isolate(function (jQuery) {

      });

      setTimeout(function() {
        flag = true;
      }, 1500);
    });
    
    waitsFor(function () {
      return flag === true;
    }, "flag should be true after 1500 ms", 2000);

    runs(function () {
      expect(window.jQQ.isReady).toEqual(true);
      expect(window.jQQ.isolate.calls.length).toEqual(2);
    });
  });

});
