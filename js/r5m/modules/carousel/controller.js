define(['r5m/modules/carousel/carousel'], function (Carousel){
  [].forEach.call(document.querySelectorAll('.carousel'), function(elem) {
    new Carousel(elem);
  });
});
