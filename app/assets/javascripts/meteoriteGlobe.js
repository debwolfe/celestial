function initializeWebGL() {
  // Set up Map
  var options = {zoom: 2.5, position: [28, -80], scrollWheelZoom: false, atmosphere: true};
  var earth = new WE.map('earth_div', options);
  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(earth);

  // Marker
  var marker2 = WE.marker([-19.583330, 17.916670]).addTo(earth);
  marker2.bindPopup("<b>Hoba</b><br>Largest Meteorite!", {maxWidth: 120, closeButton: true});

  // -----------------------------------------------------

  // Put meteorites on map
  function makeMeteoriteMarkers(meteorites, num_meteorites) {
    var marker;
    for (i=0; i<num_meteorites; i++) {
      marker = WE.marker([meteorites[i].reclat, meteorites[i].reclong]).addTo(earth);
      marker.bindPopup("<b>"+ meteorites[i].name +"</b><br>Mass: "+ meteorites[i].mass +" (g)<br>Year: "+ meteorites[i].year.match(/\d{4}/g) +" ", {maxWidth: 120, closeButton: true});
    }
  };
  // AJAX call to get meteorites from index route and pass them to
  // the makeMeteoriteMarkers function
  function getMeteorites() {
    $.ajax({
      url: '/meteorites/top_10',
      type: 'GET'
    })
    .done(function(response) {
      console.log("Success! The Ajax call worked.");
      console.log(response[0]);
      makeMeteoriteMarkers(response, response.length);
    })
    .fail(function() {
      console.log("Error, Ajax call did not work!");
    })
  };
  // Run getMeteorites function
  getMeteorites();

  // -----------------------------------------------------

  // Rotate Globe
  var speedDivisor = 150;
  var before = null;
  requestAnimationFrame(function animate(now) {
    var c = earth.getPosition();
    var elapsed = before ? now - before : 0;
    before = now;
    earth.setCenter([c[0], c[1] + 0.1 * (elapsed / speedDivisor)]);
    requestAnimationFrame(animate);
  });

  // Zoom in & zoom out with Font Awesome Icon "Buttons"
  $('.plusZoom').on('click', function(e) {
    var currentZoom = earth.getZoom();
    console.log("zoom level is currently " + currentZoom);
    earth.setZoom(currentZoom + 0.5);
  });

  $('.minusZoom').on('click', function(e) {
    var currentZoom = earth.getZoom();
    console.log("zoom level is currently " + currentZoom);
    earth.setZoom(currentZoom - 0.5);
  });

  // Stop/Start Globe Rotating button
  $('.stop_moving').on('click', function(e) {
    if (speedDivisor === 150) {
      speedDivisor = 100000000000000;
      $('.stop_moving button').text("Rotate Globe");
    } else {
      speedDivisor = 150;
      $('.stop_moving button').text("Stop Moving");
    }
  });

  // Close popup
  $('#earth_div').on('click', '.we-pp-close', function(e) {
    e.preventDefault();
  });

};

$(function(){initializeWebGL()});
