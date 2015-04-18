$(document).ready(function(){

  var earth;
  function initialize() {
    earth = new WE.map('earth_div');
    earth.setView([-19.583330, 17.916670], 3);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
    // Example marker
    var marker2 = WE.marker([-19.583330, 17.916670]).addTo(earth);
    marker2.bindPopup("<b>Hoba</b><br>Largest Meteorite!", {maxWidth: 120, closeButton: true});
      
      // // --------------------------------------
      // // Put meteorites on map
      // function makeMeteoriteMarkers(meteorites, num_meteorites) {
      //   var marker;
      //   for (i=0; i<num_meteorites; i++) {
      //     marker = WE.marker([meteorites[i].reclat, meteorites[i].reclong]).addTo(earth);
      //     marker.bindPopup("<b>"+ meteorites[i].name +"</b><br>Mass: "+ meteorites[i].mass +" grams", {maxWidth: 120, closeButton: true});
      //   }
      // };
      // // AJAX call to get meteorites from index route and pass them to
      // // the makeMeteoriteMarkers function
      // function getMeteorites() {
      //   $.ajax({
      //     url: '/meteorites',
      //     type: 'GET'
      //   })
      //   .done(function(response) {
      //     console.log("Success! The Ajax call worked.");
      //     // console.log(response.meteorites);
      //     makeMeteoriteMarkers(response.meteorites, response.meteorites.length);
      //   })
      //   .fail(function() {
      //     console.log("error");
      //   })
      // };
      // // Run getMeteorites function
      // getMeteorites();
      // // --------------------------------------
      // // Start a simple rotation animation
      // var before = null;
      // requestAnimationFrame(function animate(now) {
      //     var c = earth.getPosition();
      //     var elapsed = before? now - before: 0;
      //     before = now;
      //     earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
      //     // requestAnimationFrame(animate);
      // });
  }

})
