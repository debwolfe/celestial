function initializeGoogleMaps() {

  $.ajax({
    url: 'meteorites/by_year',
    type: 'GET'
  }).done(function (response) {
    meteo_data = response;
  })


  var styles = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#333739"}]
  }, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#000000"}]}, {
    "featureType": "poi",
    "stylers": [{"color": "#2ecc71"}, {"lightness": -7}]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{"color": "#2ecc71"}, {"lightness": -28}]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#2ecc71"}, {"visibility": "on"}, {"lightness": -15}]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#2ecc71"}, {"lightness": -18}]
  }, {"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]}, {
    "elementType": "labels.text.stroke",
    "stylers": [{"visibility": "off"}]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{"color": "#2ecc71"}, {"lightness": -34}]
  }, {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{"visibility": "on"}, {"color": "#333739"}, {"weight": 0.8}]
  }, {"featureType": "poi.park", "stylers": [{"color": "#2ecc71"}]}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#333739"}, {"weight": 0.3}, {"lightness": 10}]
  }]

  var mapOptions = {
    mapTypeControlOptions: {
      mapTypeIds: ['Styled']
    },

    zoom: 2,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: 'Styled',
    scrollwheel: false,
    disableDefaultUI: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});
  map.mapTypes.set('Styled', styledMapType);

}

const maxExplosionCircles = 100;
var circles = [];

function fadeoutCircle() {
  if (circles.length > maxExplosionCircles){
    return;
  }

  var opacityInterval = 0.1;
  circles.forEach(
      function (circle) {
        if (circle.fillOpacity > opacityInterval) {
          circle.setOptions(
              {
                strokeOpacity: circle.strokeOpacity - opacityInterval,
                fillOpacity: circle.fillOpacity - opacityInterval,
                radius: circle.radius * 1.2
              });
        }
      });
  circles = circles.filter(function (circle) {
    if (circle.fillOpacity <= opacityInterval) {
      circle.setMap(null);
    }
    return circle.fillOpacity > opacityInterval;
  });
}


function clearCircles() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].setMap(null);
  }
  circles.length = 0;
}

function drawCircles(year) {
  if (!playing || circles.length > maxExplosionCircles) {
    clearCircles();
  }
  if (year in meteo_data) {
    if (meteo_data[year].length > maxExplosionCircles) {
      clearCircles();
    }
    meteo_data[year].forEach(
        function (element, index, array) {
          var meteoriteCircle = {
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.5,
            map: map,
            center: new google.maps.LatLng(element[1], element[2]),
            radius: Math.sqrt(element[0]) + 200000
          };

          var meteoObj = new google.maps.Circle(meteoriteCircle)

          circles.push(meteoObj);
        }
    );
  }

}

google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);


function relocateTools() {
  $("#min_year").css("left", $("#slider").offset().left);
  $("#max_year").css("left", $("#slider").offset().left + $("#slider").width() - 50);

  $("#play_button").css("left", $("#slider").offset().left - 55);
  $("#play_button").css("top", $("#slider").position().top - 10);

}

$(window).resize(function () {
  relocateTools();
});

var playing = false;

function moveTick() {
  var year = parseInt($('#year_indicator').val()) + 1;
  if (year > 2013) {
    year = 1800;
  }

  $('#slider').slider('value', year);
}

$(function () {
  relocateTools();

  $("#slider").slider({
    animate: "fast",
    min: 1800,
    max: 2013,
    change: function (event, ui) {
      year = ui.value;
      year_text_location = event.clientX - 30;
      $('#year_indicator').val(year);
      drawCircles(year);
    }
  });

  $('#year_indicator').on("change", function () {
    $('#slider').slider('value', $('#year_indicator').val());

  });

  $("#play_button").click(function () {
    if (playing) {
      $("#play_button").attr("src", "/assets/play.png");
      playing = false;
      clearInterval(play_interval);
      clearInterval(fadeout_interval);
    } else {
      $("#play_button").attr("src", "/assets/stop.png");
      playing = true;
      play_interval = setInterval(function () {
        moveTick();
      }, 1000);
      fadeout_interval = setInterval(function () {
        fadeoutCircle();
      }, 150);
    }

  });


});
