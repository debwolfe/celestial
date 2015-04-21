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

      var chart2 = c3.generate({
        data: {
            columns: [
              ['1800', 15],
              ['1810', 26],
              ['1820', 22],
              ['1830', 31],
              ['1840', 42],
              ['1850', 62],
              ['1860', 82],
              ['1870', 74],
              ['1880', 109],
              ['1890', 106],
              ['1900', 120],
              ['1910', 133],
              ['1920', 142],
              ['1930', 258],
              ['1940', 170],
              ['1950', 165],
              ['1960', 271],
              ['1970', 536],
              ['1980', 767],
              ['1990', 1286],
              ['2000', 1565],
              ['2010', 240]
            ],
            type : 'bar',
            labels: true
        },
        bindto: "#chart2",
        axis: {
           x: {
            label: 'Decades'
          },
          y: {
              label: 'Number of Reported Meteorites'
          }
        }
    });

    $("graphCarousel").carousel();

});

