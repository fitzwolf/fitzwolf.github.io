Promise.all([
    d3.csv('data/apple_stock_data.csv', parseData),
    d3.csv('data/dowjones_stock_data.csv', parseData),
    d3.csv('data/slv_stock_data.csv', parseData),
    d3.csv('data/spy_stock_data.csv', parseData)
  ]).then(([appleData, dowJonesData, slvData, spyData]) => {
    var mergedData = appleData.map((item, i) => {
      return {
        date: item.date,
        aaplClose: item.close,
        diaClose: dowJonesData[i].close,
        slvClose: slvData[i].close,
        spyClose: spyData[i].close
      }
    });
  
    drawChart(mergedData);
  });
  
  function parseData(d) {
    return {
      date: parseTime(d.Date),
      close: +d.Close
    };
  }
  
  function drawChart(data) {
    //... The chart drawing code as before, but with the new colors:
  
    svg.append("path")
      .datum(data)
      .attr("d", lineAAPL)
      .attr("fill", "none")
      .attr("stroke", "pink");  // AAPL is pink
  
    svg.append("path")
      .datum(data)
      .attr("d", lineDIA)
      .attr("fill", "none")
      .attr("stroke", "purple");  // DIA is purple
  
    svg.append("path")
      .datum(data)
      .attr("d", lineSLV)
      .attr("fill", "none")
      .attr("stroke", "white");  // SLV is white
  
    svg.append("path")
      .datum(data)
      .attr("d", lineSPY)
      .attr("fill", "none")
      .attr("stroke", "orange");  // SPY is orange
  }
  