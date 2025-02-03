

var w = 500;
var h = 500;

var canvas = d3.select("#myVis")
		.append("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background-color","blue")

var g = canvas.append("g")
	.attr("transform",
		  "translate("+ 50+"," + 50+ ")")


//Scale linear
const x = d3.scaleLinear().domain([0,100]).range([0,w])
const y = d3.scaleLinear().domain([0,100]).range([h,0])



const generateDots = (number, maxX, maxY, maxR) => {
	let dots = []

	for (let i = 0; i < number; i++){
		let dot = {
			x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
            r: Math.floor(Math.random() * maxR) + 1
		};
		dots.push(dot)
	}

	return dots
}

const dots = generateDots(20, 100, 100, 50);


canvas.append("g")
	.selectAll("dot")
	.data(dots)
	.enter()
	.append("circle")
		.attr("cx", (morn) => x(morn.x))
		.attr("cy", (d) => y(d.y))
		.attr("r", (d) => d.r)
		.style("fill", "white")




