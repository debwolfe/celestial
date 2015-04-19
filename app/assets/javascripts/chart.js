$(document).ready(function(){
    var chart = c3.generate({
        data: {
            columns: [
                ['northeast', 47],
                ['southeast', 23],
                ['northwest', 24],
                ['southwest', 6],

            ],
            type : 'donut'
        },
        donut: {
            title: "Meteorites by Hemisphere:",
        }
    });
});
6266
