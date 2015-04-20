$(document).ready(function(){
    var chart = c3.generate({
        data: {
            columns: [
                ['northeast', 47],
                ['southeast', 23],
                ['southwest', 6],
                ['northwest', 24],
            ],
            type : 'donut',
            order: null
        },
        legend: {
            hide: true
        }
    });
});

