// As seen on: http://builders.factore.ca
//
// Dependencies:
// jquery.cycle
// jquery.addresses
// jquery.easing

APP.features.cycle = {
  config: {
    timeout: 7000,
    speed: 750
  },
  
  init: function () {
    var self = APP.features.cycle,
        index = self.getIndex();
    
    // Start the cycle
    self.$cycle = $('#frame-holder');
    self.$cycle.cycle({
      timeout: self.config.timeout,
      speed: self.config.speed,
      startingSlide: index,
      before: self.onBefore,
      after: self.onAfter
    });
    
    // Set up the nav
    $('#banner-nav').find('a').click(self.changeSlide);
  },
  
  onBefore: function (out, inc, opts) {
    var self  = APP.features.cycle,
        index = self.getIndex();
        
    index = self.getIndex();
    if (out !== inc) {
      index = opts.nextSlide;
      $(out).not(':animated')
        .find('img').css('left', '0').end()
        .find('.text').css('right', '0').end()
        .find('img').css('position', 'absolute').animate({left: '-400px'}, self.config.speed + 50).end()
        .find('.text').css('position', 'absolute').animate({right: '-400px'}, self.config.speed + 50);
      $(inc)
        .find('img').css('left', '0').end()
        .find('.text').css('right', '0');      
      
      $('#fill').stop().animate({width: $('#banner-timer').width()}, 150);
    }
    
    $('#banner-nav')
      .find('a').removeClass('activeSlide').end()
      .find('a:eq(' + index + ')').addClass('activeSlide');
    
    
  },
  
  onAfter: function (out, inc, opts) {
    var self = APP.features.cycle;
    
    $(inc)
      .find('img').css('left', '0').end()
      .find('.text').css('right', '0');
    $('#fill').not('.stopped').animate({width: 0}, self.config.timeout + 600, 'easeOutQuad')
  },
  
  changeSlide: function () {
    $.address.value(this.href);
    var self  = APP.features.cycle,
        index = self.getIndex();
    
    self.$cycle.cycle(index);
    self.$cycle.cycle('pause');
    $('#fill').addClass('stopped');
    $('#banner-timer').fadeOut();
  },
  
  getIndex: function () {
    var pathNames = $.address.pathNames();
    index = parseInt(pathNames[pathNames.length - 1])
    return index ? index : 0;
  }
}
