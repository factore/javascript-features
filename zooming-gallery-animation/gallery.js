// as seen here: http://lauratedesco.com/gallery

APP.features.gallery = {
  replaceImage: function (newPhoto) {
    var self      = APP.features.gallery,
        $newPhoto = $("#" + newPhoto),
        newId     = newPhoto.split('-')[1],
        currentId = $("#image img").attr("id").split('-')[1],
        $newImg   = $('<img />').attr({alt: $newPhoto.attr("alt"), id: 'photo-' + newId, src: $newPhoto.attr("href")}).css({top:'-200px', height:'0px', opacity:0}),
        nextId,
        prevId;

    if (newId !== currentId) {
      // rig up the arrows
      nextId = $newPhoto.data("next");
      prevId = $newPhoto.data("prev");
      $("#next").attr("data-new", nextId);
      $("#previous").attr("data-new", prevId);

      // set the active thumb
      self.$thumbs.find("a").attr("class", "");
      $newPhoto.attr("class", "active");

      // insert and animate the new photo
      self.$display
        .find("#title").fadeOut(500, function () {
          $(this).html($newPhoto.attr("alt"));
        }).fadeIn(500).end()
        .find("#photo-" + currentId).animate({ opacity:"0", top:"450px", height:"1000px"}, 900).end()
        .find("#inside").delay(100).prepend($newImg).end()
        .find("#photo-" + newId).animate({ height:"450px", opacity:"1", top:"0px"}, 900, function () {
          $("#photo-" + currentId).remove(); currentId = newId;
        });
    }
  },

  cycle: function (interval) {
    var self = APP.features.gallery,
      $button = $("#next");
    window.setInterval( function () { self.replaceImage("thumb-" + $button.attr("data-new")); }, interval);
  },

  init: function (options) {
    var self = APP.features.gallery;
    self.$display = $("#display");
    self.$thumbs = $("#thumbs");

    self.$display.on( "click", "a.arrow", function (e) {
      e.preventDefault();
      self.replaceImage("thumb-" + $(this).attr("data-new"));
    });

    self.$thumbs.on( "click", "a", function (e) {
      e.preventDefault();
      self.replaceImage($(this).attr("id"));
    });
  }
};