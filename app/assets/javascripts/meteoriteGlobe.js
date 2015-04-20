function initializeWebGL() {
  // Set up Map
  var options = {zoom: 2.0, position: [28, -80], scrollWheelZoom: false, atmosphere: true};
  var earth = new WE.map('earth_div', options);
  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(earth);

  // Marker
  var marker2 = WE.marker([-19.583330, 17.916670]).addTo(earth);
  marker2.bindPopup("<b>Hoba</b><br>Largest Meteorite!", {maxWidth: 120, closeButton: true});

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
    earth.setZoom(currentZoom + 1.0);
  });

  $('.minusZoom').on('click', function(e) {
    var currentZoom = earth.getZoom();
    console.log("zoom level is currently " + currentZoom);
    earth.setZoom(currentZoom - 1.0);
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

};

$(function(){initializeWebGL()});
