Promise.all([
    d3.csv('data/apple_stock_data.csv'),
    d3.csv('data/slv_stock_data.csv'),
    d3.csv('data/spy_stock_data.csv'),
    d3.csv('data/msft_stock_data.csv')
]).then(function(values) {
    var appleData = values[0];
    var slvData = values[1];
    var spyData = values[2];
    var msftData = values[3];

    var parseTime = d3.timeParse("%Y-%m-%d");
    var stocks = ["Apple", "SLV", "SPY", "MSFT"];
    var color = d3.scaleOrdinal()
        .domain(stocks)
        .range(["steelblue", "green", "red", "purple"]);
    
    appleData.forEach(function(d) {
        d.date = parseTime(d.Date);
        d.close = +d.Close;
    });

    slvData.forEach(function(d) {
        d.date = parseTime(d.Date);
        d.close = +d.Close;
    });

    spyData.forEach(function(d) {
        d.date = parseTime(d.Date);
        d.close = +d.Close;
    });

    msftData.forEach(function(d) {
        d.date = parseTime(d.Date);
        d.close = +d.Close;
    });

    // After parsing the data...
    var allData = appleData.concat(slvData, spyData, msftData);

    var margin = {top: 20, right: 20, bottom: 80, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleTime()
        .domain(d3.extent(allData, function(d) { return d.date; }))
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([d3.min(allData, function(d) { return d.close; }), d3.max(allData, function(d) { return d.close; })])
        .range([height, 0]);

    // Line generators
    var lineApple = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var lineSLV = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var lineSPY = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var lineMSFT = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    // Add lines to SVG
    var svgHeight = height + margin.top + margin.bottom
    var svgWidth = width + margin.left + margin.right
    var svg = d3.select("#combined-chart")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "lightgray");
    
    svg.append("path")
        .datum(appleData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineApple);

    svg.append("path")
        .datum(slvData)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineSLV);

    svg.append("path")
        .datum(spyData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineSPY);

    svg.append("path")
        .datum(msftData)
        .attr("fill", "none")
        .attr("stroke", "purple")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineMSFT);

        var covidStart = parseTime("2020-03-12");
        var covidEnd = parseTime("2020-08-30");

        // Annotation for Covid start
        svg.append("line")
            .attr("x1", x(covidStart))
            .attr("y1", 0)
            .attr("x2", x(covidStart))
            .attr("y2", height + 30) // adjust according to your need
            .attr("stroke", "darkgreen")
            .attr("stroke-dasharray", "2,2");

        svg.append("text")
            .attr("x", x(covidStart) - 100) // adjust the offset for your need
            .attr("y", height + 45) // adjust according to your need
            .attr("text-anchor", "start")
            .text("Covid lockdown starts")
            .attr("fill", "darkgreen")
            .style("font-size","10px");

        // Annotation for Covid end
        svg.append("line")
            .attr("x1", x(covidEnd))
            .attr("y1", 0)
            .attr("x2", x(covidEnd))
            .attr("y2", height + 30) // adjust according to your need
            .attr("stroke", "darkred")
            .attr("stroke-dasharray", "2,2");

        svg.append("text")
            .attr("x", x(covidEnd) + 5) // adjust the offset for your need
            .attr("y", height + 45) // adjust according to your need
            .attr("text-anchor", "start")
            .text("Covid lockdown ends")
            .attr("fill", "darkred")
            .style("font-size","10px");

            // Function to create gridlines for X-axis
        // function make_x_gridlines() {       
        //     return d3.axisBottom(x)
        //         .ticks(10)
        // }

        // // Function to create gridlines for Y-axis
        // function make_y_gridlines() {       
        //     return d3.axisLeft(y)
        //         .ticks(10)
        // }

        // // Add X-axis gridlines
        // svg.append("g")			
        //     .attr("class", "grid")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(make_x_gridlines()
        //         .tickSize(-height)
        //         .tickFormat("")
        //     )

        // // Add Y-axis gridlines
        // svg.append("g")			
        //     .attr("class", "grid")
        //     .call(make_y_gridlines()
        //         .tickSize(-width)
        //         .tickFormat("")
        //     )



    // Create X axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Create Y axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(10));
    

    var legend = svg.selectAll(".legend")
        .data(stocks)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", 18) // Changed from width - 18
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", 36) // Changed from width - 24
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start") // Changed from "end"
        .text(function(d) { return d; });
        
    // Calculate button event listener
    d3.select("#calculate").on("click", function() {
        // Parse user input
        var startDate = new Date(d3.select("#start-date").node().value);
        var endDate = new Date(d3.select("#end-date").node().value);
        var investment = +d3.select("#investment").node().value;
        var applePercentage = +d3.select("#apple-percentage").node().value / 100;
        var slvPercentage = +d3.select("#slv-percentage").node().value / 100;
        var spyPercentage = +d3.select("#spy-percentage").node().value / 100;
        var msftPercentage = +d3.select("#msft-percentage").node().value / 100;
        
        var appleDataRange = appleData.filter(d => d.date >= startDate && d.date <= endDate);
        var slvDataRange = slvData.filter(d => d.date >= startDate && d.date <= endDate);
        var spyDataRange = spyData.filter(d => d.date >= startDate && d.date <= endDate);
        var msftDataRange = msftData.filter(d => d.date >= startDate && d.date <= endDate);
        
        // Calculate the initial number of shares for each stock
        var appleShares = (investment * applePercentage) / appleDataRange[0].close;
        var slvShares = (investment * slvPercentage) / slvDataRange[0].close;
        var spyShares = (investment * spyPercentage) / spyDataRange[0].close;
        var msftShares = (investment * msftPercentage) / msftDataRange[0].close;
        
        // Calculate the value of the shares at each date within the range
        appleDataRange.forEach(d => d.value = d.close * appleShares);
        slvDataRange.forEach(d => d.value = d.close * slvShares);
        spyDataRange.forEach(d => d.value = d.close * spyShares);
        msftDataRange.forEach(d => d.value = d.close * msftShares);
        
        // Calculate the total portfolio value at each date
        var totalValues = appleDataRange.map((d, i) => {
            return {
                date: d.date,
                value: d.value + slvDataRange[i].value + spyDataRange[i].value + msftDataRange[i].value
            };
        });


        
    d3.select("#apple-investment").text(`Initial Apple Investment: $${(appleShares * appleDataRange[0].close).toFixed(2)}`);
    d3.select("#slv-investment").text(`Initial SLV Investment: $${(slvShares * slvDataRange[0].close).toFixed(2)}`);
    d3.select("#spy-investment").text(`Initial SPY Investment: $${(spyShares * spyDataRange[0].close).toFixed(2)}`);
    d3.select("#msft-investment").text(`Initial msft Investment: $${(msftShares * msftDataRange[0].close).toFixed(2)}`);
    d3.select("#total-investment").text(`Total Investment: $${investment}`);
    
    document.getElementById("apple-investment").innerHTML = `Initial Apple Investment: $${(appleShares * appleDataRange[0].close).toFixed(2)}`;
    document.getElementById("apple-investment").style.color = color("Apple");

    document.getElementById("slv-investment").innerHTML = `Initial SLV Investment: $${(slvShares * slvDataRange[0].close).toFixed(2)}`;
    document.getElementById("slv-investment").style.color = color("SLV");

    document.getElementById("spy-investment").innerHTML = `Initial SPY Investment: $${(spyShares * spyDataRange[0].close).toFixed(2)}`;
    document.getElementById("spy-investment").style.color = color("SPY");

    document.getElementById("msft-investment").innerHTML = `Initial Microsoft Investment: $${(msftShares * msftDataRange[0].close).toFixed(2)}`;
    document.getElementById("msft-investment").style.color = color("MSFT");


    var selectedRangeXStart = x(startDate);
    var selectedRangeXEnd = x(endDate);
    var greyOutColor = "#CC7722";

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", selectedRangeXStart)
        .attr("height", svgHeight)
        .attr("fill", greyOutColor)
        .attr("fill-opacity", 0.3);

    svg.append("rect")
        .attr("x", selectedRangeXEnd)
        .attr("y", 0)
        .attr("width", svgWidth - selectedRangeXEnd)
        .attr("height", svgHeight)
        .attr("fill", greyOutColor)
        .attr("fill-opacity", 0.3);

    // Calculate running total
    var runningTotal = totalValues[totalValues.length - 1].value;

    // Update HTML
    document.getElementById("running-total").innerText = "Running Total: $" + runningTotal.toFixed(2);

    });

}).catch(function(err) {
    console.error(err);
});
