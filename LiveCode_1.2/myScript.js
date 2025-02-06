var width = 1200;
var height = 800;

var canvas = d3.select("#vis")
				.append("svg")
				.attr("width",width)
				.attr("height",height)
				.style("background-color","lightblue");






const colors = ["red", "blue"]




var cupsCoffee = [3,2,1,0,1,2,2,1,1,1,0,1,0,2,1,2,0,1];

var circsCoffee = canvas.selectAll("coffeeCircles")
                            .data(cupsCoffee) 
                            .join("rect") //join a shape-type to data from our array
                            .attr("x", (_,i) => i * 100) // cx -> centre x
                            .attr("y", (d,_) => d * 100) // cy -> centre y
                            .attr("width", (d) => d * 10)
                            .attr("height",(d) => d * 10)
                            .attr("fill",  _,i => colors(i % 1))

                              
                            
                              

