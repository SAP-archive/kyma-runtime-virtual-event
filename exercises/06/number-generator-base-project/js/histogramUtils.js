/**
 * keeping track of historams from different nodes
 */
var histograms = {};


/**
 * update the histogram data per host with the respective values
 * @param {*} id 
 * @param {*} values 
 */
const addOrUpdateHistogramById = (id, values, requestCount) => {
    var found = histograms[id];
    if (!!found) {
        // found, just change
        histograms[id] = values;
        updateHistogramInTable(id, values, requestCount);
    } else {
        // not found, add
        histograms[id] = values;
        insertHistogramToTable(id, values, requestCount);
    }

};

/**
 * inserts the histogram SVG into DOM
 * @param {*} id 
 * @param {*} values 
 */
const insertHistogramToTable = (id, values, requestCount) => {
    var parenttbl = document.getElementById("histogramRow");
    
    var newel = document.createElement('td');
    newel.setAttribute('id', 'histogram_' + id);

    // add svg
    var vizDiv = document.createElement('div');
    vizDiv.setAttribute('id', 'viz_' + id);
    newel.appendChild(vizDiv);
    parenttbl.appendChild(newel);
    createViz(id, values, requestCount);
};

/**
 * updates the histogram for a a given host id
 * @param {*} id 
 * @param {*} values 
 */
const updateHistogramInTable = (id, values, requestCount) => {

    updateViz(id, values, requestCount);
};


/**
 * updates the D3 vizualization for a given id
 * @param {*} id 
 * @param {*} values 
 */
const updateViz = (id, values, requestCount) => {

    document.getElementById('viz_' + id).remove();
    var td = document.getElementById('histogram_' + id);
    var vizDiv = document.createElement('div');
    vizDiv.setAttribute('id', 'viz_' + id);
    td.appendChild(vizDiv);

    createViz(id, values, requestCount);

};

/**
 * initially creates the vizualization per id
 * @param {*} id 
 * @param {*} values 
 */
const createViz = (id, values, requestCount) => {

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 350 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;


    var svg = d3.select("#viz_" + id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var myData = values; // use the values return from the indivudial nodes in cluster

    var x = d3.scaleLinear()
        .domain([0, 69])
        .range([0, width]);


    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    var histogram = d3.histogram()
        .value(function (d) { return d; })
        .domain(x.domain())
        .thresholds(x.ticks(69));


    var bins = histogram(myData);


    var y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function (d) { return d.length; })]);
    svg.append("g")
        .call(d3.axisLeft(y));


    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function (d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(id);

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Requests:" + requestCount);

};
