$(document).ready(function(){

function initialize() {
  var earth;
  earth = new WE.map('earth_div');
  earth.setView([-19.583330, 17.916670], 3);
  WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '© OpenStreetMap contributors'
  }).addTo(earth);

  var marker2 = WE.marker([-19.583330, 17.916670]).addTo(earth);
  marker2.bindPopup("<b>Hoba</b><br>Largest Meteorite!", {maxWidth: 120, closeButton: false});

        // Start a simple rotation animation
        var before = null;
        requestAnimationFrame(function animate(now) {
          var c = earth.getPosition();
          var elapsed = before? now - before: 0;
          before = now;
          earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
          requestAnimationFrame(animate);
        });
      }

})
