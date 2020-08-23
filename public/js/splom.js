const  d3  = require('d3');
const multi = require('multitask');

// Heavily inspired by http://bl.ocks.org/Jverma/39f9b6d9d276d7c9232cd53fd91190c4

const Stardust = require("stardust-core");
const StardustWebGL = require("stardust-webgl");

function getcol(arr, column) {
    return arr.map(x => Number(x[column]))
}

function getcol(arr, column) {
    return arr.map(x => Number(x[column]))
}




let temp = document.createElement('canvas')
d3.select(temp)
    .attr('width', 60/2)
    .attr('height', 60/2)

////
/// Implementation of paper technique
let subset = (D,k) =>{
    let R = []
    for (const t of D){
        if (R.length < k){
            R = expand(R,t)  
        }else{
            R = expand(R,t) 
            R = shrink(R)     
        }
    }

    let s = [] 
    for (e of R){
        s.push(e[0])
    }
    s.pop()
    return s
}

let expand = (R,t) => {
    let rsp = 0
    for (let siri of R){
        //console.log(R)
        let si = siri[0]
        let ri = siri[1]
        
        //console.log("1" , si)
        
        let l = prox(t,si)
        ri = ri + l
        rsp = rsp + l
    }
    R.push( [t,rsp] )
    return R
}

let shrink = (R) =>{
    let indexOfMax = (arr) =>{
        if (arr.length === 0) {
            return -1;
        }
        var max = arr[0][1];
        var maxIndex = 0;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i][1] > max) {
                maxIndex = i;
                max = arr[i][1];
            }
        }
        return maxIndex;
    }


    let maxindx = indexOfMax(R)
    let t = R[maxindx][0]
    R.splice(maxindx,1)
    for(let siri of R){
        let si = siri[0]
        let ri = siri[1]

        //console.log("2" , si)
        ri = ri - prox(t,si)
    }
    
    return R
}

let distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

let prox = (si, sj) =>{
    let dist = distance(si[0],si[1],sj[0],sj[1])
    return Math.exp(  -(dist*dist) ) //
}



////////////////////
const initCanvasPlot = (w,h,data, xColumn, yColumn, canvas, temp, sampleData) => {
    let cloud = []
    for (i in data){
        cloud.push( [data[i][xColumn] , data[i][yColumn], data[i]["color"] ] ) 
    }
   // console.log("done cloud")
    let subs = subset(cloud, 400)
    sampleData.push(subs)
    //canvas.attr("num",sampleData.length)
    // console.log("subs")
   // console.log(subs)   
    
    let platform = Stardust.platform("webgl-2d", temp , w, h)

    var circleSpec = Stardust.mark.circle(1);
    var circles = Stardust.mark.create(circleSpec, platform);

        let xScale = d3.scaleLinear()
            .domain( d3.extent(getcol(subs,0)) )
            .range([0, w]);

        let yScale = d3.scaleLinear()
            .domain( d3.extent(getcol(subs,1)) )
            .range([h, 0]);

    // Attributes with Vector or Color types can be set using corresponding functions
    circles.attr("center", (d)=>{ return [xScale(d[0]), yScale(d[1]) ] }  )
    
    circles.attr("radius", 2);
    circles.attr('color', function(d){
        let color = Array.from(d[2]).pop()  
        if(color === undefined){
            return   [0,0,1,1]
        }
        else{
            return color.array
        }
                    
    });

    //console.log(subs)
    circles.data(subs);
    circles.render();
    canvas = cloneCanvas(temp, canvas)
    canvas.style("border", "3px solid white" );    

}


function cloneCanvas(oldCanvas, newCanvas) {
    //create a new canvas
    var context = newCanvas.node().getContext('2d');
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    
    newCanvas.acc = oldCanvas.acc;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}


exports.createSplom = (data,container, dimensions,sampleData,viewVisitcount) => {
    
    let res =[]
    sampleData.length = 0
    
    //getting the dimensions in the data
    let dims = dimensions
     
    //size of each splom element
    //console.log(window.devicePixelRatio)
    let w =  (60/2) * window.devicePixelRatio
    let h = w
    let boarder =15/2

    //console.log("The dimensions in the data:"+dims)
    //container.html("")
    container.html("")
    //console.log("newsplom")
    //console.log(container.attr("class"))
    let splom = container

    let labelrow = splom.append("div").attr('id',"labels").attr('class',"splom-labels")

    .attr("width",w+(10/2))
    .attr("height", h+(10/2))

    labelrow.append("svg")
    .attr("width",w+(10/2))
    .attr("height", h+(10/2))
    .append("text")
    .attr("text-anchor", "middle")
        for (let [j,dim2] of dims.entries()) {
        labelrow.append("svg")
        .attr("width",w+(10/2))
        .attr("height", h+(10/2))
        .append("text").text(dim2)
        .attr("text-anchor", "middle")
        .attr("x", w+(10/2)/2)
        .attr("y", w+(10/2)/2)
        }

    for (let [i,dim1] of dims.entries()) {
        
        
        let row = splom.append("div").attr('id',"row-"+dim1).attr('class',"splom-row")
        row.append("svg")
        .attr("width",w+(10/2))
        .attr("height", h+(10/2))
        .append("text").text(dim1)
        .attr("text-anchor", "middle")
        .attr("x", w/2)
        .attr("y", h/2)
        for (let [j,dim2] of dims.entries()) { 
            //setTimeout( ()=>{
            if(j>=i){
                //multi.set()
                //let curr = row.append("div").attr("class", "splom-plot")//.attr('id',dim1+"-"+dim2).append("div")
    
                let curr = row.append("td").attr("class","tooltip")
                    .attr('width', w)
                    .attr('height', h)
                curr.append("span").attr("class","tooltiptext")
                .text(dim1+" / "+dim2) 

                let  canvas = curr.append('canvas').attr("class", "splom-plot") 

                
                     
                    .attr('width', w)
                    .attr('height', h)

                    .attr('xDim', dim1)
                    .attr('yDim', dim2)
                    
                    .attr('acc','0')
                    //.style("float","left")

                //scaterplot.init(curr)
                //scaterplot.chooseDims(w,h, data , dim1, dim2, curr);

                if(viewVisitcount !== null ){
                    viewVisitcount[dim1+"_"+dim2] = 0
                }

                initCanvasPlot(w,h, data , dim1, dim2, canvas, temp, sampleData)
            }
            else{
                let curr = row //.append("div")//.attr('id',dim1+"-"+dim2)
                curr.append("svg")
                    .attr("width",w+(10/2))
                    .attr("height", h+(10/2))

               
              
                    //.style("stroke", "white")
                    //.style("stroke-width", "10px")    
                    
            }
            
        //},0)

        }
    }

    splom.style('display','grid')
    splom.style('grid-template-columns',"repeat("+(dims.length+1)+","+(w+boarder)+"px)" )
    
    //console.log("in")
   // console.log(sampleData)

    
    //console.log("SPLOM done")



}


exports.updateSplom = (data,splom,sampleData,maxSplomAcc, viewVisitcount) => {



    //console.log("hallo0")
     splom.selectAll( "canvas")
     .each( function(d, i) {
        //setTimeout( ()=>{
         //let xColumn = d3.select(this).attr("xDim")
         //let yColumn = d3.select(this).attr("yDim")

         let w =60/2 
         let h =60/2 
         let canvas = d3.select(this)
         let acc =  viewVisitcount[canvas.attr("xDim")+"_"+canvas.attr("yDim")]
        //console.log(maxSplomAcc.v)

        if( parseInt(acc) > maxSplomAcc.v){
           // console.log(canvas.attr("acc") , ">", maxSplomAcc.v)
            maxSplomAcc.v = parseInt(acc)
           // console.log("max " , maxSplomAcc.v)
        }
       // console.log( canvas.attr("acc")  )

         let borderCol = d3.scaleLinear().domain([0,maxSplomAcc.v])
         .range(["white", "red"])

         canvas.style("border", "2.5px solid "+ borderCol(acc) );
        // console.log(borderCol(canvas.attr('acc')))
         let subs = sampleData[i]
         //canvas.attr("num",i+1)
         let platform = Stardust.platform("webgl-2d", temp , w, h)

         var circleSpec = Stardust.mark.circle(1);
         var circles = Stardust.mark.create(circleSpec, platform);
     
             let xScale = d3.scaleLinear()
                 .domain( d3.extent(getcol(subs,0)) )
                 .range([0, w]);
     
             let yScale = d3.scaleLinear()
                 .domain( d3.extent(getcol(subs,1)) )
                 .range([h, 0]);
     
         // Attributes with Vector or Color types can be set using corresponding functions
         circles.attr("center", (d)=>{ return [xScale(d[0]), yScale(d[1]) ] }  )
         
         circles.attr("radius", 2);
         circles.attr("color", (d)=>{
             //console.log(d)
            let color = Array.from(d[2]).pop()  
                if(color === undefined){
                    return   [0,0,1,1]
                }
                else{
                    return color.array
                }
         });

         circles.data(subs); 
         circles.render();
            
         canvas = cloneCanvas(temp, canvas)
         
        

        
       // canvas.style("stroke","red");
         
        //},0)
     })

}


exports.reSyncSampleData = (data, sampleData) => {
    console.log(sampleData)
    // for (canvasdata of sampleData){
    //     for (point of canvasdata){
    //         point = data[point.id]
    //     }
    // }
}
