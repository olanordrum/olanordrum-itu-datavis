var margin = {top:100, right:100, bottom: 40, left: 40},
width = 3000 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;


const canvas = d3.select("#canvas")
        .append("svg") //append svg to body
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color","black")
            .append("g")
            .attr("transform", "translate("+ margin.left + "," + margin.top + ")");


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
                .domain([10, 10])
                .range([10,10])
canvas
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
            
            
canvas
    .append("g")
    .attr("transform", "translate(0, 0)") // Plasser Y-aksen til venstre
    .call(d3.axisLeft(yScale))


const dotSize = 5; // Dot diameter
const dotsPerRow = 7; 

// Transformere data slik at vi får en array med alle prikkene
const dotsData = data.flatMap(d => 
    d.people > 0 ? // sjekker for fler en 0 personer
      Array.from({ length: d.people }, (_, i) => ({
        people: d.people,
        clock: d.clock,
        index: i,
    })) 
    // Legg til målinger med 0
    : [{people: 0,
        clock: d.clock,
        index: 0}]
);


// color-scale mapped to clock
const colorScale = d3.scaleOrdinal()
.domain(data.map(d => d.clock)) 
.range(["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#FFD700", "#FF8C00", "#DC143C", "#228B22", "#8A2BE2", "#00CED1"])



canvas.selectAll("circle")
    .data(dotsData)
    .join("circle")
    .attr("cx", d => xScale(d.clock) + xScale.bandwidth() + (d.index % dotsPerRow) * dotSize * 1.5 - 200) // X-posisjon basert på klokkeslett og kolonneplassering
    .attr("cy", d => yScale(d3.max(data.filter(e => e.clock === d.clock).map(e => e.people))) - Math.floor(d.index / dotsPerRow) * dotSize * 1.5) // Y-posisjon, stablet i rader
    .attr("r", (d) => d.people > 0 ? dotSize / 2 : dotSize)
    .attr("fill", d => d.people > 0 ? colorScale(d.clock) : "black")
    .attr("stroke", (d) => d.people > 0 ? null : "white");





