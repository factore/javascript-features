// As seen on
//
// Dependancies
// jquery.cycle => http://jquery.malsup.com/cycle/
// jquery.imagesloaded => http://desandro.github.com/imagesloaded/

APP.features.cycle = {
  // animate the main button icons on hover:
  init: function () {
    // define wrapper
    var $gallery = $('#photos');

    $gallery.imagesLoaded( function () {
      // run animateHeight once everything is loaded
      animateHeight($(this), $gallery);
      // initiate cycle
      $gallery.cycle({
        fx: 'fade',
        speed: 1000,
        // etc... => http://jquery.malsup.com/cycle/options.html
        before: function () {
          $gallery.find('.current').removeClass('.current');
          $(this).addClass('current');
          animateHeight($(this), $gallery);
        }
      });
    });
  },

  animateHeight: function (object, gallery) {
    var height = gallery.find(".current").height(),
        width = gallery.find(".current").width();
    gallery.animate({ height: height, width: width },400);
    // notes:
    //  you may have to add some height/width to the animation depending on
    //    your img border/padding as height() doesn't include padding or borders.
    //  width is optional depending on your template.
  }
};