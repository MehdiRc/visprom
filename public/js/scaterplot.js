    const  d3  = require('d3');
    


    function getcol(arr, column) {
        return arr.map(x => Number(Number(x[column]).toFixed(2)) )
    }

    exports.init = (svg) => {
        svg.append("g").attr("class","xAxis")
            .append("text")
            .attr("class", "label")
        
        svg.append("g").attr("class","yAxis")
            .append("text")
            .attr("class", "label")

        svg.append("g").attr("class","plot-points")

        //will use in Hover (to display the hover)
        svg.append("rect").attr("id","plot-hover")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "rgba(255, 255, 255, 0)");
        //////////////////////////////////////////
    }

    exports.chooseDims = (w,h,data, xColumn, yColumn, svg,zoom) => {
        setTimeout( ()=>{
        let paddingX = w/10
        let paddingY = h/10
        let dataX = getcol (data,xColumn)
        let dataY = getcol (data,yColumn)
    
        svg.attr("width",w)
            .attr("height", h)
            .attr("xDim",xColumn)
            .attr("yDim",yColumn)
    
        //creating the x scale
        let x = d3.scaleLinear()
        //let originalx = d3.scaleLinear()
        
        //originalx.domain(d3.extent(dataX))
        //.range([ paddingX, w-paddingX ])

        if(zoom === undefined || zoom === null){
            x.domain(d3.extent(dataX))
            .range([ paddingX, w-paddingX ])
        }
        else{
            x = svg.scalex
            let x0 = x.invert(zoom.xrange[0])
            let x1 = x.invert(zoom.xrange[1])

            x.domain([x0,x1])
            .range([ paddingX, w-paddingX ])
        }
        //adding the x axis
        svg.select(".xAxis")
            .attr("transform", "translate("+ 0 +"," + (h-paddingY) + ")")
            .call(d3.axisBottom(x))
            
            .select(".label")
                .style("font", "20px times")
                .style("fill", "black")           
                .attr("x", w/2)
                .attr("y", h/20)
                //.style("text-anchor", "end")
                .text(xColumn);
    
        //creating the y scale
        let y = d3.scaleLinear()
        // let originaly = d3.scaleLinear()

        // originaly.domain(d3.extent(dataY))
        // .range([ h-paddingY, paddingY ])

        if(zoom === undefined || zoom === null){
            y.domain(d3.extent(dataY))
            .range([ h-paddingY, paddingY ])
        }
        else{
            y = svg.scaley
            
            let y1 = y.invert(zoom.yrange[0])
            let y0 = y.invert(zoom.yrange[1])

            y.domain([y0,y1])
            .range([ h-paddingY, paddingY ])
        }

        

        //adding the y axis
        svg.select(".yAxis")
            .attr("transform", "translate("+paddingX+","+ 0 + ")")
            .call(d3.axisLeft(y))

            .select(".label")
                .style("font", "20px times")
                .style("fill", "black")
                .attr("transform", "rotate(-90)")
                .attr("x", -w/2)
                .attr("y", -h/19)
                //.style("text-anchor", "end")
                .text(yColumn);

        svg.xcol = xColumn
        svg.ycol = yColumn    
        
        svg.scalex = x
        svg.scaley = y

        module.exports.updatePoints(data, svg)
        },0)
    }

    exports.updatePoints = (data, svg) => {
        w = parseInt(svg.attr("width"))
        h = parseInt(svg.attr("height"))


        let x = svg.scalex
        let y = svg.scaley

        let xColumn = svg.xcol
        let yColumn = svg.ycol

        //adding the points
        let circle = svg.select(".plot-points")
        .selectAll("circle")
        .data(data, function(d) { return d.id })
        
        circle.join("circle")
            .transition()
            .duration(750)
            .style("fill", function (d,i ) {  

                let color = Array.from(d.color).pop()  
                if(color === undefined){
                    return "rgba(0, 0, 255, 0.5)" 
                }
                else{
                    return color.string
                }
            })
            .attr("cx", function (d)    {  return x(d[xColumn]) })
            .attr("cy", function (d)    {  return y(d[yColumn]) })
            .attr("id", function (d, i) {
                return "point-"+i
            })
            .attr("r", (w+h)/(2*90) )
            

    }

    
    exports.chooseDimsSmall = (w,h,data, xColumn, yColumn, svg) => {
        setTimeout( ()=>{
        let paddingX = w/10
        let paddingY = h/10
        let dataX = getcol (data,xColumn)
        let dataY = getcol (data,yColumn)
    
        svg.attr("width",w)
            .attr("height", h)
            .attr("xDim",xColumn) 
            .attr("yDim",yColumn)
    
        //creating the x scale 
        let x = d3.scaleLinear()
            .domain(d3.extent(dataX))
            .range([ paddingX, w-paddingX ])
            
        
        //adding the x axis
        svg.select(".xAxis")
            .attr("transform", "translate("+ 0 +"," + (h-paddingY) + ")")
            .call(d3.axisBottom(x).tickValues([]))
            

            .select(".label")
                .style("font", "20px times")
                .style("fill", "black")           
                .attr("x", w/2)
                .attr("y", h/10)
                //.style("text-anchor", "end")
                .text(xColumn);
    
        //creating the y scale
        let y = d3.scaleLinear()
            .domain(d3.extent(dataY))
            .range([ h-paddingY, paddingY ])
          
            


        //adding the y axis
        svg.select(".yAxis")
            .attr("transform", "translate("+paddingX+","+ 0 + ")")
            .call(d3.axisLeft(y).tickValues([]))
          
            .select(".label")
                .style("font", "20px times")
                .style("fill", "black")
                .attr("transform", "rotate(-90)")
                .attr("x", -w/2)
                .attr("y", -0)
                //.style("text-anchor", "end")
                .text(yColumn);

        svg.xcol = xColumn
        svg.ycol = yColumn    
        
        svg.scalex = x
        svg.scaley = y

        module.exports.updatePointsSmall(data, svg)
        },0)
    }

    exports.updatePointsSmall = (data, svg) => {
        w = parseInt(svg.attr("width"))
        h = parseInt(svg.attr("height"))


        let x = svg.scalex
        let y = svg.scaley

        let xColumn = svg.xcol
        let yColumn = svg.ycol

        //adding the points
        let circle = svg.select(".plot-points")
        .selectAll("circle")
        .data(data, function(d) { return d.id })
        
        circle.join("circle")
        
            .style("fill", function (d,i ) {  

                let color = Array.from(d.color).pop()  
                if(color === undefined){
                    return "rgba(0, 0, 255, 0.5)" 
                }
                else{
                    return color.string
                }
            })
            .attr("cx", function (d)    {  return x(d[xColumn]) })
            .attr("cy", function (d)    {  return y(d[yColumn]) })
            .attr("id", function (d, i) {
                return "point-"+i
            })
            .attr("r", (w+h)/(1*90) )
            

    }




