(function() {
  var rotateSlider;

  $(function() {
    $('#nav').on('click', 'a', function(e) {
      var active, theSlide;
      e = e != null ? e : {
        e: window.event
      };
      e.preventDefault();
      e.stopPropagation();
      if ($('#nav').hasClass('active')) {
        return false;
      }
      $('.focus').removeClass('focus');
      $(this).addClass('focus');
      $('#nav').addClass('active');
      theSlide = $(this).attr('data-slide');
      active = $('.active').attr('data-slide');
      $('.slide').removeClass('active');
      return rotateSlider(theSlide, active);
    });
    setTimeout(function() {
      return $('#nav a[data-slide="2"]').trigger('click');
    }, 500);
    setTimeout(function() {
      return $('#nav a[data-slide="3"]').trigger('click');
    }, 1200);
    return setTimeout(function() {
      return $('#nav a[data-slide="4"]').trigger('click');
    }, 1900);
  });

  rotateSlider = function(slide, active) {
    var delta, slides, theSlide;
    slides = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four'
    };

    /*
    TODO -
    detect current slide position and calculate no. slides to 
    target.  Ease through those slides to avoid CSS3 
    transition wonkiness.
     */
    theSlide = slides[slide];
    delta = Math.abs(slide - active);
    if (delta === 3 && active === '1') {
      $('.slide[data-slide="' + slide + '"]').addClass('active');
      $('.slider-inner').attr('class', 'slider-inner rotate two');
      setTimeout(function() {
        return $('.slider-inner').attr('class', 'slider-inner rotate three');
      }, 400);
      setTimeout(function() {
        return $('.slider-inner').attr('class', 'slider-inner rotate four');
      }, 800);
    } else if (delta === 3 && active === '4') {
      $('.slide[data-slide="' + slide + '"]').addClass('active');
      $('.slider-inner').attr('class', 'slider-inner rotate three');
      setTimeout(function() {
        return $('.slider-inner').attr('class', 'slider-inner rotate two');
      }, 350);
      setTimeout(function() {
        return $('.slider-inner').attr('class', 'slider-inner rotate one');
      }, 700);
    } else {
      $('.slide[data-slide="' + slide + '"]').addClass('active');
      $('.slider-inner').attr('class', 'slider-inner rotate ' + theSlide);
    }
    return $('#nav').removeClass('active');
  };

}).call(this);
