function initialize() {

    $.ajax({
        url: 'meteorites/by_year',
        type: 'GET'
    }).done(function(response){
        console.log(response);



    })
    var meteorites = [];
    for (var i = 0; i < 100; i++) {
        //this is a place for deb to put in real data :)
        var mass = Math.random() * 100000 + 50000;
        var lat = Math.random() * 90;
        var lon = Math.random() * 90;
        var year = i + 1990;
        meteorites.push([mass, lat, lon, year]);
    }

    var mapOptions = {
        zoom: 2.2,
        center: new google.maps.LatLng(25, -18),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    drawCircles(meteorites, map, 0);

}

function fadeoutCircle(meteoCircleObj) {
    meteoCircleObj.setOptions(
        {
            strokeOpacity: meteoCircleObj.strokeOpacity - 0.01,
            fillOpacity: meteoCircleObj.fillOpacity - 0.01,
            radius: meteoCircleObj.radius * 1.01
        }
    );
    if (meteoCircleObj.fillOpacity > 0) {
        setInterval(function () {
            fadeoutCircle(meteoCircleObj);
        }, 100);

    } else {
        meteoCircleObj.setVisible(false);
    }
}

function drawCircles(meteorites, map, i) {
    if (i < meteorites.length) {
        var meteorite = meteorites[i];
        var meteoriteCircle = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 1.0,
            map: map,
            center: new google.maps.LatLng(meteorite[1], meteorite[2]),
            radius: Math.sqrt(meteorite[0]) * 500
            // (meteorite[0]/10)
        };

        var meteoObj = new google.maps.Circle(meteoriteCircle)

        fadeoutCircle(meteoObj);


        setTimeout(function () {
            drawCircles(meteorites, map, i + 1)
        }, 200);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);

$(function() {
    $( "#slider" ).slider();
});
