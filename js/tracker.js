const chartConfig = {
    aapl: {
        dataFile: 'data/aapl_stock_data.csv',
        chartDiv: '#aapl-chart'
    },
    slv: {
        dataFile: 'data/slv_stock_data.csv',
        chartDiv: '#slv-chart'
    },
    dia: {
        dataFile: 'data/dia_stock_data.csv',
        chartDiv: '#dia-chart'
    },
    spy: {
        dataFile: 'data/spy_stock_data.csv',
        chartDiv: '#spy-chart'
    }
};

function drawChart(data) {
    //... The same chart setup as before
  
    // Draw the chart with all data
    drawPath(data);
  
    // Get the user's selected start and end times
    var userStart = startDate.value;
    var userEnd = endDate.value;
  
    // Convert these to dates
    var userStartDate = parseTime(userStart);
    var userEndDate = parseTime(userEnd);
  
    // Calculate the x positions of these dates
    var userStartX = x(userStartDate);
    var userEndX = x(userEndDate);
  
    // Add a grey rectangle before the user's start date
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", userStartX)
      .attr("height", height)
      .attr("fill", "rgba(0, 0, 0, 0.2)"); // Semi-transparent grey
  
    // And after the user's end date
    svg.append("rect")
      .attr("x", userEndX)
      .attr("y", 0)
      .attr("width", width - userEndX)
      .attr("height", height)
      .attr("fill", "rgba(0, 0, 0, 0.2)"); // Semi-transparent grey
  }
  
function calculateInvestment(data, startDate, endDate, investment) {
    // Implement your investment calculation logic
    // and update the value beside the respective chart
}

$(document).ready(function() {
    // Draw charts initially
    for (let stock in chartConfig) {
        drawChart(chartConfig[stock].dataFile, chartConfig[stock].chartDiv);
    }

    $('#calculate').click(function() {
        let startDate = new Date($('#start-date').val());
        let endDate = new Date($('#end-date').val());
        let investment = $('#investment').val();

        for (let stock in chartConfig) {
            d3.csv(chartConfig[stock].dataFile).then(function(data) {
                calculateInvestment(data, startDate, endDate, investment);
            });
        }
    });
});
