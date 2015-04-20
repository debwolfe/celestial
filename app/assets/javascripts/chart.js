$(document).ready(function(){

 //TODO: use AJAX data (round and multiply by 100)
  $.ajax({
    url: 'meteorites/hemispheres',
    type: 'GET'
  }).done(function (response) {
    hemispheres_data = response;
  })

    var chart = c3.generate({
        data: {
              columns: [
                ['northeast', 47],
                ['southeast', 24],
                ['northwest', 23],
                ['southwest', 6],
            ],
            type : 'donut'
        },
        donut: {
            title: "Meteorites by Hemisphere:",
        }
    });
});
