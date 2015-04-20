function initializeGoogleMaps() {

  $.ajax({
    url: 'meteorites/by_year',
    type: 'GET'
  }).done(function (response) {
    meteo_data = response;
  })


  var styles =  [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}]

  var mapOptions = {
    mapTypeControlOptions: {
      mapTypeIds: ['Styled']
    },

    zoom: 2.2,
    center: new google.maps.LatLng(25, -18),
    mapTypeId: 'Styled',
    scrollwheel: false,
    disableDefaultUI: true,
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
  map.mapTypes.set('Styled', styledMapType);

}

function fadeoutCircle() {
  circles.forEach(
      function (circle, index, array) {
        console.log(circle);
        if (circle.fillOpacity > 0.0) {
          circle.setOptions(
              {
                strokeOpacity: circle.strokeOpacity - 0.1,
                fillOpacity: circle.fillOpacity - 0.1,
                radius: circle.radius * 1.1
              });
        }

      });

}

var circles = [];
//setInterval(function () {
//    fadeoutCircle();
//}, 200);

function clearCircles() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].setMap(null);
  }
  circles.length = 0;
}

function drawCircles(year) {
  clearCircles();
  meteo_data[year].forEach(
      function (element, index, array) {
        console.log(element);

        var meteoriteCircle = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.25,
          map: map,
          center: new google.maps.LatLng(element[1], element[2]),
          radius: Math.sqrt(element[0]) * 500
        };
        if (element[1] > 76) {
          meteoriteCircle["radius"] = Math.sqrt(element[0]) * 100;
        };

        var meteoObj = new google.maps.Circle(meteoriteCircle)

        circles.push(meteoObj);
      }
  );
}

google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);

$(function () {
  $("#slider").slider({
    animate: "fast",
    min: 1800,
    max: 2013,
    change: function (event, ui) {
      year = ui.value;
      year_text_location = event.clientX - 30;
      var $yearIndicator = $('#year_indicator');
      $yearIndicator.text(year);
      $yearIndicator.css("left", year_text_location)
      drawCircles(year);
    }
  });
});


