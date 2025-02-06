var margin = {top:20, right:40, bottom: 40, left: 40},
width = 600 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;


const canvas = d3.select("#canvas")
        .append("svg") //append svg to body
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color","lightblue")
            .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top +")");


const data = [
    {clock: "11:00",people: 34},
    {clock: "13:00",people: 8} ,
    {clock: "15:00",people: 7} ,
    {clock: "17:00",people: 1} ,
    {clock: "19:00",people: 50} ,
    {clock: "21:00",people: 2} ,
    {clock: "23:00",people: 0} ,
    {clock: "02:00",people: 0} ,
    {clock: "04:00",people: 0} ,
    {clock: "06:00",people: 0} ,
    {clock: "08:00",people:1} ,
    {clock: "10:00",people: 60}, 
]


const maxCount = d3.max(data.map(d => d.people))
const minCount = d3.min(data.map(d => d.people))



const hours = data.map(d => d.clock) // stringlist of all hours in data (x -axis)


//scaling

const xScale = d3.scaleBand()
                .domain(hours)
                .range([0,width + margin.left])


const yScale = d3.scaleLinear()
                .domain([0, maxCount])
                .range([height,0])
canvas
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
            
            
canvas
    .append("g")
    .attr("transform", "translate(0, 0)") // Plasser Y-aksen til venstre
    .call(d3.axisLeft(yScale))



canvas.selectAll("circle")
                            .data(data)
                            .join("circle")
                                .attr("cx",(d) => xScale(d.clock)) 
                                .attr("cy", (d) => yScale(d.people))
                                .attr("r", 20)
                                .attr("fill", "black")