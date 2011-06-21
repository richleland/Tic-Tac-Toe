(function($) {
  $.fn.tictac = function(options) {
    var settings = {};

    return this.each(function() {
      // apply custom options if supplied
      if(options) {
        $.extend(settings, options);
      }
    });
  };
})(jQuery);
