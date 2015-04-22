function cssMenu() {
	$(window).on('scroll', function() {
    for (i=0; i<5; i++) {
        if ($(window).scrollTop() > $(window).height()*i && $(window).scrollTop() < $(window).height()*(i+1)) {
            $('#cssmenu ul li').removeClass('active');
            $('#cssmenu ul li:nth-child('+ (i+1) +')').addClass('active');
        };
    };

    $('#cssmenu ul li:nth-child(1)').on('click', function() {
      $('#cssmenu ul li').removeClass('active');
      $('#cssmenu ul li:nth-child(1)').addClass('active');
    });

    $('#cssmenu ul li:nth-child(2)').on('click', function() {
      $('#cssmenu ul li').removeClass('active');
      $('#cssmenu ul li:nth-child(2)').addClass('active');
    });

    $('#cssmenu ul li:nth-child(3)').on('click', function() {
      $('#cssmenu ul li').removeClass('active');
      $('#cssmenu ul li:nth-child(3)').addClass('active');
    });

    $('#cssmenu ul li:nth-child(4)').on('click', function() {
      $('#cssmenu ul li').removeClass('active');
      $('#cssmenu ul li:nth-child(4)').addClass('active');
    });

    $('#cssmenu ul li:nth-child(5)').on('click', function() {
      $('#cssmenu ul li').removeClass('active');
      $('#cssmenu ul li:nth-child(5)').addClass('active');
    });

  });
};

$(function(){cssMenu()});
