d3.csv("data/apple_stock_data.csv").then(function(data) {
  var parseTime = d3.timeParse("%Y-%m-%d");

  var investmentAmount = 100000;
  var firstOpenPrice = +data[0].Close;
  var stocksPurchased = Math.floor(investmentAmount / firstOpenPrice);
  var remainingCash = investmentAmount - stocksPurchased * firstOpenPrice;

  data.forEach(function(d) {
      d.date = parseTime(d.Date);
      d.close = +d.Close;
      d.investmentValue = stocksPurchased * d.close + remainingCash;
  });

  var svg = d3.select("#aapl-chart").append("svg")
    .attr("width", 800)
    .attr("height", 600);

  var margin = {top: 50, right: 50, bottom: 50, left: 50};
  var width = +svg.attr("width") - margin.left - margin.right;
  var height = +svg.attr("height") - margin.top - margin.bottom;
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.close), d3.max(data, d => d.close)]) // this sets the domain based on the data
    .range([height, 0]);

  var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

  var path = g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  var startDate = d3.min(data, function(d) { return d.date; });
  var endDate = d3.max(data, function(d) { return d.date; });

  var totalMs = endDate.getTime() - startDate.getTime();

  var displayInitial = d3.select("#initial-investment");
  displayInitial.text(`Initial Investment: $${investmentAmount.toFixed(2)}`);

  var displayRunning = d3.select("#running-total");

  function drawPath(path) {
    var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(5000)
      .ease(d3.easeLinear)
      .attrTween("stroke-dashoffset", function() {
        return function(t) {
          var currentIdx = Math.floor(t * (data.length - 1));
          var currentValue = data[currentIdx].investmentValue;
          displayRunning.text(`Cumulative Total: $${currentValue.toFixed(2)}`);
          return totalLength * (1 - t);
        };
      });
  }

  drawPath(path);
  
  // Define the x axis
  var xAxis = d3.axisBottom(x)
    .ticks(5)
    .tickFormat(d3.timeFormat("%Y-%m"));

  // Append the x axis to your SVG
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Define the y axis
  var yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(function(d) { return '$' + d; });

  // Append the y axis to your SVG
  g.append("g")
    .call(yAxis);

  // Annotations
  // Get the first trading day after the split
  function getNextTradingDay(date) {
      return data.find(d => d.date > date).close;
  }

  var annotations = [
    {
      note: {
        title: "Apple split its stock on a 7-for-1 basis",
      },
      x: x(parseTime("2014-06-09")),
      y: y(getNextTradingDay(parseTime("2014-06-09"))),
      dy: -30,
      dx: 0,
      id: "split-2014",
      visibility: "hidden"
    },
    {
      note: {
        title: "Apple split its stock on a 4-for-1 basis",
      },
      x: x(parseTime("2020-08-28")),
      y: y(getNextTradingDay(parseTime("2020-08-28"))),
      dy: -30,
      dx: 0,
      id: "split-2020",
      visibility: "hidden"
    }
  ];

  // Add annotation to the chart
  const makeAnnotations = d3.annotation()
    .annotations(annotations);

  g.append("g")
    .call(makeAnnotations);
});
