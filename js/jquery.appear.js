/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.3
 */
(function($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  }
  var $window = $(window);

  var $prior_appeared;

  function process() {
    check_lock = false;
    for (var index = 0; index < selectors.length; index++) {
      var $appeared = $(selectors[index]).filter(function() {
        return $(this).is(':appeared');
      });

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared) {
        var $disappeared = $prior_appeared.not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared = $appeared;
    }
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  }

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      selectors.push(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      };
      return false;
    }
  });
})(jQuery);

$(document).ready(function () {
  // FETCHING DATA FROM JSON FILE
  $.getJSON("doctors.json", function (data) {
    var doctors=[];
    var hello="123456";
    $.each(data, function (key, value) {
      //CONSTRUCTION OF ROWS HAVING
      // DATA FROM JSON OBJECT
      doctors[key]=value;
    });
    document.getElementById("doctorsName1").innerHTML = doctors[0].name;
    document.getElementById("doctorsPosition1").innerHTML = doctors[0].position;
    document.getElementById("doctorsName2").innerHTML = doctors[1].name;
    document.getElementById("doctorsPosition2").innerHTML = doctors[1].position;
    document.getElementById("doctorsName3").innerHTML = doctors[2].name;
    document.getElementById("doctorsPosition3").innerHTML = doctors[2].position;
    document.getElementById("doctorsName4").innerHTML = doctors[3].name;
    document.getElementById("doctorsPosition4").innerHTML = doctors[3].position;
  })
})

$('#myForm').on('submit', function() {
  var data = $(this).serializeArray();
  //console.log(data);
  alert('Name: '+data[0].value + ' ' + data[1].value + '\nEmail: ' + data[2].value + '\nPhone No: ' + data[3].value);
  
});