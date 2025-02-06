
var margin = {top:10, right:40, bottom: 30, left: 40},
width = 450 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;




const canvas = d3.select("#myVis")
        .append("svg") //append svg to body
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top +")");


const coffeeData = [
{"day": "Monday" , "cups": 7 },
{"day": "Tuesday" , "cups": 2 },
{"day": "Wednesday" , "cups": 4 },
{"day": "Thursday" , "cups": 2 },
{"day": "Friday" , "cups": 1 },
{"day": "Saturday" , "cups": 3 },
{"day": "Sunday" , "cups": 5 },
]


var minData = d3.min(coffeeData, d => d.cups)
var maxData = d3.max(coffeeData, d => d.cups)



const days = coffeeData.map(d => d.day)


// x-scale and axis
var xScale = d3.scaleBand()
            .domain(days)
            .range([0,width + margin.left])


var yScale = d3.scaleLinear()
            .domain([0, maxData + 2]) // +2 to get some excess space
            .range([height,0])


canvas
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))


canvas.append("g")
    .attr("transform", "translate(0, 0)") // Plasser Y-aksen til venstre
    .call(d3.axisLeft(yScale))



// y-axis label
canvas.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y",20)
        .attr("x",40)
        .attr("dy", ".200em")
        .attr("transform", "rotate(0)")
        .text("Cups");


canvas            
        .selectAll("circle")
        .data(coffeeData)
        .enter()
        .append("circle")
            .attr("cx",(d) => xScale(d.day) + xScale.bandwidth()/2) 
            .attr("cy", (d) => yScale(d.cups))
            .attr("r", 5)
            .attr("fill", "blue")




