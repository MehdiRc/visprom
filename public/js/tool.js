//"use strict";

//var lasso = require ('./lasso.js')
const  d3  = require('d3');

 
const scaterplot = require('./scaterplot.js')
const sploom = require('./splom.js')
const polyparser = require('./polyparser.js')
const sel = require('./selection.js')
const firebase = require('./save.js') 
const loader = require('./loader.js') 

const  math  = require('mathjs')
const cloneDeep = require('lodash/clonedeep');
var update = require('react-addons-update');

var $ = require('jquery');
const { array } = require('stardust-core');
const { range } = require('mathjs');
const { active } = require('d3');
window.$ = $; 
//require('bootstrap');

let cEnum = {

    RED :       {string : "#e66465"                         , array: [1, 0, 0, 1]          ,  order:0 },
    GREEN:      {string : "#00ff00"            , array: [0, 1, 0, 1]          ,  order:1 },
    BLUE:       {string : "#0000ff"            , array: [0, 0, 1, 1]          ,  order:2 },
    ORANGE:     {string : "#eb9532"         , array: [0.9, 0.6, 0.2, 1]    ,  order:3 },
    PINK:       {string : "#ff1493"         , array: [1, 0.1, 0.6, 1]      ,  order:4 },
    CIAN:       {string : "#00ffff"             , array: [0, 1, 1, 1]          ,  order:5 },
    YELLOW :    {string : "#ffff00"          , array:  [1, 1, 0, 1]         ,  order:6 },
    PURPLE:     {string : "#9500ff"          , array:  [0.6, 0, 1, 1]       ,  order:7 },
    BROWN:      {string : "#502800"            , array:  [0.4, 0.2, 0, 1]     ,  order:8 },

    OLIVE :       {string : "#93c00a"                         , array: [0.576, 0.752, 0.039]          ,  order:9 },
    RASPBERRY:    {string : "#a23963"            , array: [0.6, 0.2, 0.4]          ,  order:10 },
    LAVENDER:     {string : "#9c59b1"            , array: [0.6, 0.3, 0.7]          ,  order:11 },
    GOLD:         {string : "#f1ad13"         , array: [0.9, 0.7, 0.1]    ,  order:12 },
    STRAWBERRY:   {string : "#bb0346"         , array: [0.7, 0.0, 0.3]      ,  order:13 },
    JADE:         {string : "#01a586"             , array: [0.0, 0.6, 0.5]          ,  order:14 },
    GRAPE:        {string : "#6f61ab"          , array:  [0.4, 0.4, 0.7]         ,  order:15 },
    DUNE:         {string : "#d1b345"          , array:  [0.8, 0.7, 0.3]       ,  order:16 },
    CLEMENTINE:   {string : "#e67504"            , array:  [0.9, 0.4, 0.0]     ,  order:17 },
    

  };


let selections = [
    {color: cEnum.BLUE  , displayName: "Non Selected"   , cname: "Blue"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.GREEN , displayName: "Selection 1"          , cname: "Green"  , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.RED   , displayName: "Selection 2"            , cname: "Red"    , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.ORANGE, displayName: "Selection 3"         , cname: "Orange" , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.PINK  , displayName: "Selection 4"           , cname: "Pink"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.CIAN  , displayName: "Selection 5"           , cname: "Cian"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
] 

let reserve = [
    {color: cEnum.PURPLE , displayName: "Selection 17" , cname: "Purple"  , content: new Set(),  originCol: [], originOP: null,    rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.YELLOW , displayName: "Selection 16" , cname:"Yellow"   , content: new Set(),  originCol: [], originOP: null,    rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.BROWN  , displayName: "Selection 15"  , cname: "Brown"   , content: new Set(),  originCol: [] , originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    
    {color: cEnum.OLIVE , displayName: "Selection 14"   , cname: "olive"  , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.RASPBERRY   , displayName: "Selection 13"     , cname: "raspberry"    , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.LAVENDER, displayName: "Selection 12"  , cname: "lavender" , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.GOLD  , displayName: "Selection 11"    , cname: "gold"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.STRAWBERRY  , displayName: "Selection 10"    , cname: "strawberry"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},

    {color: cEnum.JADE , displayName: "Selection 9"   , cname: "jade"  , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.GRAPE   , displayName: "Selection 8"     , cname: "grape"    , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.DUNE, displayName: "Selection 7"  , cname: "dune" , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},
    {color: cEnum.CLEMENTINE  , displayName: "Selection 6"    , cname: "clementine"   , content: new Set(),  originCol: [], originOP: null,   rep: null, class:"", visibility : true, isolate: false},

]

//let selMinMax = [ //{ [cEnum.BLUE] : ""  , [cEnum.GREEN] : ""   , [cEnum.RED] : ""   , [cEnum.ORANGE] : "",  [cEnum.PINK] : "", [cEnum.CIAN] : "" }, 
                    //]

//const obj = {nameAction :"---", callparam:[], data : [], timestamp : Date.now()}

let current_selectionType = 1       ;
let current_color = []//selections[2],];

let provOn = false


let nonDispDims     = null 

let datum           = null
let sampleData      = []
let ranges          = {}
let dimensions      = null
///////////////
let mainviewSvg     = null
let selList         = null
let colpick         = null
let selType_buttons = null
let colorOp_buttons = null
let grpAct_buttons  = null
let tableView_table = null
let splom           = null

let variance    = {}
let mean        = {}

let historySvg3 = null
let historySvg2 = null
let historySvg1 = null

let updateCountdown = 3
///////
//Logging
let userId = "anonymous"
let maxSplomAcc   = { v : 1}

let viewHistory   = []
let savedFavs = []
let savedFavsEntries = []

let dimVisitcount = {}
let totalDimVisitcount = 0

let viewVisitcount = {}

let history = null
let favorites = null
let favIndex = []

let globalLoss = 0

let cache = []
let finalLog  = []


let savedEntries =[]

let onlineLogActive = true

////////////////
//Main container
let c = d3.select(".grid-container")
// 

function extendData (d, i){
    d.color = new Set()
    d.pointSize = 0.5
    d.id = i
    d.visibility = true
    
    return d
}


//Loading the data
d3.csv("static/data/datasmall.csv" , function(d,i) {return extendData (d,i)} )
.then(function(data){
        
        
   

    
    nonDispDims = 4
    datum = data;

    for (const d of datum) {
        selections[0].content.add(d) 
    }
    
    dimensions = Object.keys(datum[0]).slice(0, - nonDispDims);
    //console.lag(dimensions);
    for(d of dimensions){
        dimVisitcount[d] = 0
    }

    ///////////// "main" function ///////////////////////////////////////

    let custDim = c.select(".customInput")
    custDim_input(custDim)

    splom = c.select(".splom")
    sploom.createSplom(datum,splom,dimensions,sampleData,viewVisitcount)
    sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
    updateCountdown = 3 
    //sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount); 

    //console.lag(splom);
    

    let mainview = c.select(".mainView").append("div").attr("id","mainview");
    mainviewSvg = mainview.append("svg").attr("class", "bigView");

    scaterplot.init(mainviewSvg)
    scaterplot.chooseDims(700,700,datum,dimensions[0],dimensions[0], mainviewSvg);
    
    history = c.select(".viewHistory")
    .append("div")
    .attr("height", 170)
    .attr("width", "100 %")
    favorites = c.select(".viewHistory").append("div")
    //resetProv 
    let resetProvbutton = c.select(".saveB").append("img").attr("class","buttonIm")
    .attr("src","static/imgs/resetprov.svg")
    .attr("height", 50) 
    .attr("width", 150)

    .on("click", function(d, i) {
        resetProv()
        setTimeout( ()=>{
            sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
            updateCountdown = 3
        },0 )
        setTimeout( ()=>{
            updateTableView(datum, tableView_table);
        },0 )
        setTimeout( ()=>{
            updateCountTable (datum, countTable);
        },0 )
          
        

     }); 
    
    
    //Save
    let savebutton = c.select(".saveB").append("img").attr("class","buttonIm")
    .attr("src","static/imgs/save_log.svg")
    .attr("height", 50) 
    .attr("width", 150)

    .on("click", function(d, i) {
        download(userId+"_"+Date.now()+".txt" , JSON.stringify(savedEntries,Set_toJSON))
     }); 

     let favoritebutton = c.select(".saveB").append("img").attr("class","buttonIm")
     .attr("src","static/imgs/favorite.svg")
     .attr("height", 50)
     .attr("width", 50)
 
     .on("click", function(d, i) {
        savedFavs.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
        savedFavsEntries.push(saveState("favorite",""))
        updateFavorites(savedFavs)
        
        //LOGGING HISTORY
        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
        setTimeout( ()=>{
            updateViewHistory(viewHistory)
            },0 )


        let log =  {nameAction :"favorite_add", callparam: {}, data : datum, timestamp : Date.now()}
            let svState = saveState("favorite_add","")
            savedEntries.push(svState)
            favIndex.push(savedEntries.length-1)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }



      }); 
   

    addbrush(mainviewSvg); 


    countTable = c.select(".selectionTable").append("table")
    countTable.attr('id',"countTable")
    .style("width","100%")
    .style("height","25%")
    .style("overflow","auto")
    countTable.append("thead").append("tr")
    countTable.append("tbody")

    selListDiv = c.select(".selectionTable").append("div")
        .style("width","100%")
        .style("height","75%")
        .style("overflow","auto");

    selList = selListDiv.append("table")
    selList.attr('id',"selectTable")
        .style("width","100%")

    
    selectionsList(selections, selList);  
    selectionsList(selections, selList);
    /// color picker ///
    colpick = c.select(".selectionTable").append("div").attr('id',"colorpicker").attr('class',"popup")


    //// Buttons //// 
    selType_buttons = c.select(".groupOp").append('div').style("width",300).append('table').attr('id',"selType_buttons")
    .attr("width", 300)
    selectionsTypeChooser(selType_buttons);

    colorOp_buttons = c.select(".colorOp").append('table').attr('id',"colorOp_buttons")
    colorOp(colorOp_buttons);

    grpAct_buttons  = c.select(".groupOp").append('div').style("width",160).append('table').attr('id',"grpAct_buttons")
    .attr("width", 160)
    GroupActionChooser(grpAct_buttons);
   
    c.select(".groupOp").style('display','grid')
    c.select(".groupOp").style('grid-template-columns',"400px  200px" )

    // TABLE VIEW //////////////////////////////////////////////////////////
    let tableView = c.select(".tableView").append("div")
        .style("resize","horizontal")
        .style("width","100%")
        .style("height","100%")
        .style("overflow","auto");

    tableView_table = tableView.append("table").attr('id','tableView_table')
    tableView_table.append("thead").append("tr")
    tableView_table.append("tbody")


  
    updateTableView(datum, tableView_table);
    updateCountTable (datum, countTable);
    ////////////////////////////////////////////////////////////////////////
    initViewHistory(viewHistory)
    // Adding Listeners and interaction //
    //splom
    let canvas = d3.select(".splom").selectAll(".splom-plot");
    
    canvas.on("click", function(d, i) {
        //scaterplot.setup(500,500,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
        //d3.select(this).attr("acc", parseInt(d3.select(this).attr("acc"))+1)
        viewVisitcount[d3.select(this).attr("xDim")+"_"+d3.select(this).attr("yDim") ] += 1   
        scaterplot.chooseDims(700,700,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
        scaterplot.updatePoints(datum, mainviewSvg);


        //LOGGING HISTORY
        //DONE
        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
        setTimeout( ()=>{
            updateViewHistory(viewHistory)
            },0 )


        let log =  {nameAction :"load_history_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
        let svState = saveState("load_history_state","")
        savedEntries.push(svState)
        if(onlineLogActive){
            firebase.save(svState, globalLoss, userId)
        }
        
        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
        cache = []

        
        ///////////
        
        dimVisitcount[ d3.select(this).attr("xDim")] += 1 
        dimVisitcount[ d3.select(this).attr("yDim")] += 1
        totalDimVisitcount    += 1
        updateCountdown -= 1
        
        if (updateCountdown <= 0 ){    
            updateCountdown = 3 

            setTimeout( ()=>{
                minMaxMed(current_color[0].content, dimensions, datum)
                updateTableView(datum, tableView_table);
                updateCountTable (datum, countTable);
              },0 )

            setTimeout( ()=>{
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                //updateCountdown = 3
            },0 )

        }


    });

    canvas.on("mouseover",   function(d, i) {
        let hov = d3.select(this).select("#plot-hover")
        hov.attr("fill", "rgba(255, 255, 0, 0.3)");
      });

      canvas.on("mouseleave",   function(d, i) {
        let hov = d3.select(this).select("#plot-hover")
        hov.attr("fill", "rgba(0, 0, 0, 0)");
      });

      current_color.push(selections[1])
      selList.select("#"+current_color[0].cname).classed("active2",true)


    //   d3.text("static/data/u1_1594048852109.txt" , function(d,i) {return d} )
    // .then(function(data){
    //     console.log( data )
    // })
    userId = identify()

    if(false){
        //console.lag("favs loading ON") 
        loadfavorites(savedFavs,datum,mainviewSvg)
        //console.lag("favs loading done") 
    }

    if(false){
        loadHistory(viewHistory,datum,mainviewSvg) 
    }
})

let loadHistory = (viewHistory,datum,mv) => {
    d3.json("static/data/history.txt")
    .then(function(data){
       savedEntries = cloneDeep(data)
       //console.lag(data[data.length-1])

       loadState(data[data.length-3])
       //console.lag(data[data.length-3].mvY ,"   ", mv.attr("yDim") )
       viewHistory.push({ "xDim": data[data.length-3].mvX ,"yDim": data[data.length-3].mvY, "data": cloneDeep(datum) })
            ////console.lag(viewHistory[viewHistory.length-1].data) 
    
        loadState(data[data.length-2])
        ////console.lag(data[data.length-2].mvY ,"   ", mv.attr("yDim") )
        viewHistory.push({ "xDim": data[data.length-2].mvX ,"yDim": data[data.length-2].mvY, "data": cloneDeep(datum) })
            ////console.lag(viewHistory[viewHistory.length-1].data) 

        loadState(data[data.length-1])
        //console.lag(data[data.length-1].mvY ,"   ", mv.attr("yDim") )
        viewHistory.push({ "xDim": data[data.length-1].mvX ,"yDim": data[data.length-1].mvY, "data": cloneDeep(datum) })
                //console.lag(viewHistory[viewHistory.length-1].data) 
                setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )
    //pdateViewHistory(viewHistory)
    //    console.log(savedEntries) 
    //    console.log('loaded')
    })
}

let loadfavorites = (savedFavs,datum,mv) => {
    d3.json("static/data/favs.txt")
    .then(function(data){
       savedEntries = cloneDeep(data)
       //console.lag(data[data.length-1])

       if (!dimensions.includes(data[data.length-4].mvX)){
        polyparser.addPolyDim(data[data.length-4].mvX,datum)
        dimensions.push(data[data.length-4].mvX)
        dimVisitcount[data[data.length-4].mvX] = 0
        for( d of dimensions){
            viewVisitcount[d+"_"+data[data.length-4].mvX] = 0
        }
   }
   if (!dimensions.includes(data[data.length-4].mvY)){
        polyparser.addPolyDim(data[data.length-4].mvY,datum)
        dimensions.push(data[data.length-4].mvY)
        dimVisitcount[data[data.length-4].mvY] = 0
        for( d of dimensions){
            viewVisitcount[d+"_"+data[data.length-4].mvY] = 0
        }
   }

   loadState(data[data.length-4])
   //console.lag(data[data.length-3].mvY ,"   ", mv.attr("yDim") )
   savedFavs.push({ "xDim": data[data.length-4].mvX ,"yDim": data[data.length-4].mvY, "data": cloneDeep(datum) })
   savedFavsEntries.push(data[data.length-4])


              
       if (!dimensions.includes(data[data.length-3].mvX)){
            polyparser.addPolyDim(data[data.length-3].mvX,datum)
            dimensions.push(data[data.length-3].mvX)
            dimVisitcount[data[data.length-3].mvX] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-3].mvX] = 0
            }
       }
       if (!dimensions.includes(data[data.length-3].mvY)){
            polyparser.addPolyDim(data[data.length-3].mvY,datum)
            dimensions.push(data[data.length-3].mvY)
            dimVisitcount[data[data.length-3].mvY] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-3].mvY] = 0
            }
       }

       loadState(data[data.length-3])
       //console.lag(data[data.length-3].mvY ,"   ", mv.attr("yDim") )
       savedFavs.push({ "xDim": data[data.length-3].mvX ,"yDim": data[data.length-3].mvY, "data": cloneDeep(datum) })
       savedFavsEntries.push(data[data.length-3])

            //console.lag(viewHistory[viewHistory.length-1].data) 

        if (!dimensions.includes(data[data.length-2].mvX)){
            polyparser.addPolyDim(data[data.length-2].mvX,datum)
            dimensions.push(data[data.length-2].mvX)
            dimVisitcount[data[data.length-2].mvX] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-2].mvX] = 0
            }
        }
        if (!dimensions.includes(data[data.length-2].mvY)){
            polyparser.addPolyDim(data[data.length-2].mvY,datum)
            dimensions.push(data[data.length-2].mvY)
            dimVisitcount[data[data.length-2].mvY] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-2].mvY] = 0
            }
        }

        loadState(data[data.length-2])
        //console.lag(data[data.length-2].mvY ,"   ", mv.attr("yDim") )
        savedFavs.push({ "xDim": data[data.length-2].mvX ,"yDim": data[data.length-2].mvY, "data": cloneDeep(datum) })
        savedFavsEntries.push(data[data.length-2])
        

        //console.lag(viewHistory[viewHistory.length-1].data) 
        if (!dimensions.includes(data[data.length-1].mvX)){
            polyparser.addPolyDim(data[data.length-1].mvX,datum)
            dimensions.push(data[data.length-1].mvX)
            dimVisitcount[data[data.length-1].mvX] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-1].mvX] = 0
            }
        }
        if (!dimensions.includes(data[data.length-1].mvY)){
            polyparser.addPolyDim(data[data.length-1].mvY,datum)
            dimensions.push(data[data.length-1].mvY)
            dimVisitcount[data[data.length-1].mvY] = 0
            for( d of dimensions){
                viewVisitcount[d+"_"+data[data.length-1].mvY] = 0
            }
        }

        loadState(data[data.length-1])
        //console.lag(data[data.length-1].mvY ,"   ", mv.attr("yDim") )
        savedFavs.push({ "xDim": data[data.length-1].mvX ,"yDim": data[data.length-1].mvY, "data": cloneDeep(datum) })
        savedFavsEntries.push(data[data.length-1])

                //console.lag(viewHistory[viewHistory.length-1].data) 
                setTimeout( ()=>{
                updateFavorites(savedFavs)
                },0 )
                

            
                sploom.createSplom(datum,splom,dimensions,sampleData, null)
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
    })
}

var idleTimeout
function idled() { idleTimeout = null; }

function addbrush(mv){
    let brush = d3.brush()
    mv.call(
    brush                   // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [700 ,700] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", function(e) {
          if(current_color.length ===1  && current_color[0].visibility === true){
                updateChart(mv)
          }
            
        }) // Each time the brush selection changes, trigger the 'updateChart' function
      .on("end", function(e) {
        if(current_color[0].visibility === true){ 
        //console.log(selections)

        let extent = d3.event.selection
        // If no selection, back to initial coordinate. Otherwise, update X axis domain 
        if(current_selectionType == 4){
            if(!extent){
                //if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                //mainviewSvg.scalex.domain(d3.extent(getcol (datum,mainviewSvg.attr("xDim") )))
                scaterplot.chooseDims(700,700,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
                //console.lag("first")
            }else{
                //mainviewSvg.scalex.domain([ mainviewSvg.scalex.invert(extent[0]), mainviewSvg.scalex.invert(extent[1]) ])
                //mainviewSvg.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
                let x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1];
                scaterplot.chooseDims(700,700,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg,{xrange : [x0,x1],yrange : [y0,y1] });
                //console.lag("second")
            }
        }

          if(current_color.length ===1 ){
            setTimeout( ()=>{   
                selectionsList(selections, selList);
                selectionsList(selections, selList);
             },0 )

             setTimeout( ()=>{
                minMaxMed(current_color[0].content, dimensions, datum)
                updateTableView(datum, tableView_table);
                updateCountTable (datum, countTable);
              },0 )

            setTimeout( ()=>{
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                updateCountdown = 3
            },0 )

            current_color[0].originOp = null 
            current_color[0].originCol = []
            
          
            //LOGGING HISTORY
            //console.lag("=================")
            //console.lag( datum)
            viewHistory.push({ "xDim": mv.attr("xDim") ,"yDim": mv.attr("yDim"), "data": cloneDeep(datum ) })
            //console.lag(viewHistory[viewHistory.length-1].data) 
            setTimeout( ()=>{
            updateViewHistory(viewHistory)
            },0 )

            //console.lag("=================")
            let log =  {nameAction :"brush_selection", callparam: {selectionType: current_selectionType ,color: getValuesOfKey("cname",current_color )  }, data : datum, timestamp : Date.now()} 
            let svState = saveState("brush_selection","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }


            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []
            mv.call(brush.move, null)
            
          }
        }else{ mv.call(brush.move, null)}      
        })
    );
}



function initViewHistory(viewHistory){
    //console.lag(viewHistory)

    history.append("div").text("History")
   
    historySvg3 = history.append("svg").attr("class", "historyView");
    scaterplot.init(historySvg3)
    
    historySvg2 = history.append("svg").attr("class", "historyView");
    scaterplot.init(historySvg2)

    historySvg = history.append("svg").attr("class", "historyView");
    scaterplot.init(historySvg)

    scaterplot.chooseDimsSmall(80,80,[],"","", historySvg3);
    scaterplot.chooseDimsSmall(80,80,[],"","", historySvg2);
    scaterplot.chooseDimsSmall(80,80,[],"","", historySvg);

}


function updateViewHistory(viewHistory){
    // console.log("AFTER CHECK")
    // console.log(viewHistory) 
    // console.log(savedEntries) 
    // console.log("#######################")

    if(viewHistory.length>2){
        scaterplot.chooseDimsSmall(80,80,viewHistory[viewHistory.length-3].data,viewHistory[viewHistory.length-3].xDim,viewHistory[viewHistory.length-3].yDim, historySvg3);
        historySvg3.on("click", function(d, i) {
            loadState(savedEntries[savedEntries.length-3])
        });
    }
    if(viewHistory.length>1){
        scaterplot.chooseDimsSmall(80,80,viewHistory[viewHistory.length-2].data,viewHistory[viewHistory.length-2].xDim,viewHistory[viewHistory.length-2].yDim, historySvg2);
        historySvg2.on("click", function(d, i) {
            loadState(savedEntries[savedEntries.length-2])
        }); 
    }
    if(viewHistory.length>0){
        scaterplot.chooseDimsSmall(80,80,viewHistory[viewHistory.length-1].data,viewHistory[viewHistory.length-1].xDim,viewHistory[viewHistory.length-1].yDim, historySvg);
        historySvg.on("click", function(d, i) {
            loadState(savedEntries[savedEntries.length-1])
        });
    };
        
    

}

function updateFavorites(savedFavs){
    //console.lag(viewHistory)

    favorites.html("")
    favorites.append("div")
    favorites.append("div").text("Favorites")

    if(savedFavs.length>4){
        let favSvg3 = favorites.append("svg").attr("class", "favorites");
        scaterplot.init(favSvg3)
        scaterplot.chooseDimsSmall(80,80,savedFavs[savedFavs.length-5].data,savedFavs[savedFavs.length-5].xDim,savedFavs[savedFavs.length-5].yDim, favSvg3);

        favSvg3.on("click", function(d, i) {
            loadState(savedFavsEntries[savedFavsEntries.length-5])

            //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )

            let log =  {nameAction :"load_favorite_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("load_favorite_state","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
            
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []     
            ///////////


        });
    }

    if(savedFavs.length>3){
        let favSvg3 = favorites.append("svg").attr("class", "favorites");
        scaterplot.init(favSvg3)
        scaterplot.chooseDimsSmall(80,80,savedFavs[savedFavs.length-4].data,savedFavs[savedFavs.length-4].xDim,savedFavs[savedFavs.length-4].yDim, favSvg3);

        favSvg3.on("click", function(d, i) {
            loadState(savedFavsEntries[savedFavsEntries.length-4])

            //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )

            let log =  {nameAction :"load_favorite_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("load_favorite_state","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
            
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []     
            ///////////


        });
    }

    if(savedFavs.length>2){
        let favSvg3 = favorites.append("svg").attr("class", "favorites");
        scaterplot.init(favSvg3)
        scaterplot.chooseDimsSmall(80,80,savedFavs[savedFavs.length-3].data,savedFavs[savedFavs.length-3].xDim,savedFavs[savedFavs.length-3].yDim, favSvg3);

        favSvg3.on("click", function(d, i) {
            loadState(savedFavsEntries[savedFavsEntries.length-3])

            //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )

            let log =  {nameAction :"load_favorite_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("load_favorite_state","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
            
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []     
            ///////////


        });
    }
    if(savedFavs.length>1){
        let favSvg2 = favorites.append("svg").attr("class", "favorites");
        scaterplot.init(favSvg2)
        scaterplot.chooseDimsSmall(80,80,savedFavs[savedFavs.length-2].data,savedFavs[savedFavs.length-2].xDim,savedFavs[savedFavs.length-2].yDim, favSvg2);

        favSvg2.on("click", function(d, i) {
            loadState(savedFavsEntries[savedFavsEntries.length-2])

             //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )

            let log =  {nameAction :"load_favorite_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("load_favorite_state","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
            
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []     
            ///////////

        });
    }
    if(savedFavs.length>0){
        let favSvg = favorites.append("svg").attr("class", "favorites");
        scaterplot.init(favSvg)
        scaterplot.chooseDimsSmall(80,80,savedFavs[savedFavs.length-1].data,savedFavs[savedFavs.length-1].xDim,savedFavs[savedFavs.length-1].yDim, favSvg);

        favSvg.on("click", function(d, i) {
            loadState(savedFavsEntries[savedFavsEntries.length-1])

             //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )

            let log =  {nameAction :"load_favorite_state", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("load_favorite_state","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
            
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []     
            ///////////


        });
    };
        
}




function updateChart(mv) {    
    let x =  mv.scalex
    let y =  mv.scaley

    let extent = d3.event.selection
    let myCircle = mv.selectAll("circle")
    myCircle.classed("selected", function(d){
        let p = d3.select(this)
         let isB = isBrushed(extent, x(d[mv.xcol]), y(d[mv.ycol]), this,d)
          if (isB){
              //p.raise();
                if(current_selectionType === 1 ){

                    d.color.add(current_color[0].color)
                    current_color[0].content.add(d)
                    selections[0].content.delete(d)

                    p.style("fill", current_color[0].color.string)
                    //let allp = d3.selectAll("#"+p.attr("id"))
                    //.style("fill", current_color.color)
                    //console.lag(current_color[0].content)
                    //minMaxMed(current_color[0].content)
                }
                else if(current_selectionType === 2){
                    
                    d.color.add(current_color[0].color)
                    current_color[0].content.add(d)
                    selections[0].content.delete(d)

                    p.style("fill", current_color[0].color.string)
                    //let allp = d3.selectAll("#"+p.attr("id"))
                    //.style("fill", current_color.color)
         
                }
                else if(current_selectionType === 3){
                    
                    d.color.delete(current_color[0].color)
                    current_color[0].content.delete(d)

                    let newC = Array.from(d.color).pop();
                    
                    if (d.color.size === 0 ){
                        selections[0].content.add(d)
                        newC = selections[0].color

                    }

                    p.style("fill", newC.string)
                    //let allp = d3.selectAll("#"+p.attr("id"))
                    //.style("fill",newC)
          

                }
                else if(current_selectionType === 4){
          

                }

          }
          else if ( d.color.has(current_color[0].color) ) {
                if(current_selectionType === 1 ){

                    d.color.delete(current_color[0].color)
                    current_color[0].content.delete(d)

                    let newC = Array.from(d.color).pop();
                    
                    if (d.color.size === 0 ){
                        selections[0].content.add(d)
                        newC = selections[0].color

                    }

                    p.style("fill", newC.string)
                    //let allp = d3.selectAll("#"+p.attr("id"))  
                    //.style("fill",newC)

                }
                //else if(current_selectionType === 2){
                //
                //}
                else if(current_selectionType === 3){
                
                    // d.color.add(current_color.color)
                    // current_color.content.add(d)

                    
                    // let allp = d3.selectAll("#"+p.attr("id"))
                    // .style("fill", current_color.color)

                }
                      
            }     
            return isB  
    } )

  }

  // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy, ele,d) {
    //try {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    //}catch(error){return false;}

  }
  function setpointvisGloabl(data,selections) {
    let iso = false

    for (const s of selections) {
        if (s.isolate === true ){
            iso = true
        }
    }

    for (p of data){
        if(iso){
            p.visibility = false
            for (const s of selections) {
                    if (s.isolate && s.content.has(p) && s != selections[0] ){
                        p.visibility = true
                    }
            }
            
        }else{
            p.visibility = true
            for (const s of selections) {
                if (s.content.has(p) && s != selections[0] ){
                    p.visibility = (p.visibility && s.visibility)
                }
            }
        }

    }
    console.log(p.visibility)
      
}

  function setpointvisLocal(p,selections) {
    p.visibility = true
    
    let iso = false

    for (const s of selections) {
        if (s.isolate === true ){
            iso = true
        }
    }

    if(iso){
        p.visibility = false

        for (const s of selections) {
                if (s.isolate && s.content.has(p) && s != selections[0] ){
                    p.visibility = true
                }
          }
          
    }else{
        for (const s of selections) {
            if (s.content.has(p) && s != selections[0] ){
                p.visibility = (p.visibility && s.visibility)
            }
          }
    }
      

      
}

function hexToRgbA(hex,alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [((c>>16)&255)/255, ((c>>8)&255)/255, (c&255)/255 ,alpha ] ;
    }
    throw new Error('Bad Hex');
}
  

function selectionsList( data, container ){
    let tr= container.selectAll("tr")
        .data(data)
    let enter= tr.join("tr")
        
        enter.html("")
        
        enter.append("td")
        //.text( function (d) { return d.color })
        .append('input').attr('type','color')
        .style("width", "30px").style("height", "30px")
        .style("padding", "0px")
        .attr("value", function (d) {return d.color.string.substr(0, 7); })
        .on('input',async function(d){
            let inputF = d3.select(this)
            let inputValue = inputF.property("value");

            d.color.string = inputValue.concat("80"); 
            d.color.array = hexToRgbA(inputValue,1);

        });

        let line = enter.append("td")
        //.text( function (d) { return d.color })
        line.append("img")
        .attr("height", 30)
        .attr("width", 30)
        .attr("src",(d) => { 
            //console.lag(d.originOp)
            if(d.cname!="Blue"){
                if(d.visibility === true){ 
                    return "static/imgs/visible.svg"
                }
                else{
                    return "static/imgs/notvisible.svg"} 
            }
        })
        .on("click", function(d, i) {
    
            d.visibility = !d.visibility
            for (const p of d.content) {
                setpointvisLocal(p,selections)
            }

            setTimeout( ()=>{
                scaterplot.updatePoints(datum, mainviewSvg)
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                updateCountdown = 3
            },0 )

            selectionsList( data, container )
            selectionsList( data, container )


        });

        //isolate

        line.append("img")
        .attr("height", 30)
        .attr("width", 30)
        .attr("src",(d) => { 
            //console.lag(d.originOp)
            if(d.cname!="Blue"){
                if(d.isolate === true){ 
                    return "static/imgs/target.svg"
                }
                else{
                    return "static/imgs/nottarget.svg"} 
            }
        })
        .on("click", function(d, i) {

            d.isolate = !d.isolate
            setpointvisGloabl(datum,selections)

            setTimeout( ()=>{
                scaterplot.updatePoints(datum, mainviewSvg)
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                updateCountdown = 3
            },0 )

            selectionsList( data, container )
            selectionsList( data, container )


        })

        enter.append("td")
        .text( function (d) { d.rep = d3.select(this.parentNode); return d.displayName  })
        .on("dblclick", function (d) {
            input = d3.select(this)
            input.text("")

            input.append('input').attr('type','text')
            .attr('value', function (d) { return d.displayName  })
            .on('keypress',async function(){
                let inputF = d3.select(this)
                let inputValue = inputF.property("value");
                
                if( d3.event.keyCode == 13 ){
                    d.displayName = inputValue
                    //console.lag(d.displayName)
                    selectionsList( data, container )
                    selectionsList( data, container )

                }else if( d3.event.keyCode == 27){

                }
            })
            .on('blur',async function(){
                let inputF = d3.select(this)
                let inputValue = inputF.property("value");
                
                d.displayName = inputValue
                    //console.lag(d.displayName)
                    selectionsList( data, container )
                    selectionsList( data, container )
            })
        })


        let td = enter.append("td")
        let origin = td.selectAll("svg")
            .data((d) => {return d.originCol })

        let svg = origin.join("svg")
            .attr("width", (d) =>{ return 20}).attr("height", 20)
            .append("rect").attr("width", "20").attr("height", "20").attr("fill", (d) => { return d.color.string });
        
        
        // let td = enter.append("td")
        // tr.call ( (d) => {
        //     console.log(d)
        //     for(e of d.originCol){
        //         td.append("svg").attr("width", (d) =>{console.log("boom") ; return 20}).attr("height", 20)
        //          .append("rect").attr("width", "20").attr("height", "20").attr("fill", (d) => {console.log("ing") ;console.log(d) ; return e.color.string });
        //     }
        //  } )

        enter.append("td")
        .append("img")
        .attr("height", 20)
        .attr("width", 20)
        .attr("src",(d) => { 
            //console.lag(d.originOp)
            if(d.originOp === null || d.originOp === undefined ){ 
                return "static/imgs/blank.svg"
            }
            else{return d.originOp} 
            })

        enter.append("td")
        .text( function (d) { return d.content.size+"/"+datum.length })

        tr.attr("id", function (d) { return d.cname })
        tr.on("click", function(d, i) {
            if(i !== 0){

                if (d3.event.ctrlKey ||  d3.event.metaKey ) {
                    if( current_color.indexOf(d) === -1 ){
                        current_color.push(d)
                        d3.select(this).classed("active2",true)
                    }

                }else{
                    current_color = [d]
                    minMaxMed(current_color[0].content, dimensions, datum)
                    updateTableView(datum, tableView_table)
                    updateCountTable (datum, countTable);
                    tr.classed("active2",false)
                    d3.select(this).classed("active2",true)

                }
            }
        
        });





    //tr = tr.merge(enter)
                
}


// function selectionsTypeChooser(container){
//     let width = 50

//     let panel = container
//         .append("tr")
        
//         let replace = panel.append("td").attr("class","tooltip")

//         replace.append("span").attr("class","tooltiptext")
//         .text("Replace Selection") 

//         let replaceB = replace.append("img")
//             .attr("class","buttonIm")
//             .attr("src","static/imgs/sel_square.svg")
//             .attr("height", width)
//             .attr("width", width)
//             .classed("active",true)
            
//             .on("click", function(d, i) {
//                 replaceB.classed("active",true)
//                 additiveB.classed("active",false)
//                 substractiveB.classed("active",false)

//                 current_selectionType = 1
//              });

//         let additive = panel.append("td").attr("class","tooltip")

//         additive.append("span").attr("class","tooltiptext")
//         .text("Additive Selection") 

//         let additiveB = additive.append("img")
//             .attr("class","buttonIm")
//             .attr("src","static/imgs/sel_additiv.svg")
//             .attr("height", width)
//             .attr("width", width)

//             .on("click", function(d, i) {
//                 replaceB.classed("active",false)
//                 additiveB.classed("active",true)
//                 substractiveB.classed("active",false)
//                 current_selectionType = 2
//              }); 

//         let substractive = panel.append("td").attr("class","tooltip")

//         substractive.append("span").attr("class","tooltiptext")
//         .text("Substractive Selection") 

//         let substractiveB = substractive.append("img")
//             .attr("class","buttonIm")
//             .attr("src","static/imgs/sel_substractiv.svg")
//             .attr("height", width)
//             .attr("width", width)
             
//             .on("click", function(d, i) {

//                 replaceB.classed("active",false)
//                 additiveB.classed("active",false)
//                 substractiveB.classed("active",true)
                
//                 current_selectionType = 3
//                 //console.lag(finalLog)
//                 ///finalLog.push({nameAction :"add_color", callparam: {addedColor: selections[0] , selectionsBefore : selections }} ) //, data : datum, timestamp : Date.now()} )
               
//                 //console.lag(finalLog.join("_"))
               
//                 //download(Date.now()+".txt", finalLog)
//              });

//         let add = panel.append("div").attr("class","tooltip")

//         add.append("span").attr("class","tooltiptext")
//         .text("Add Selection") 

//         add.append("img")
//         .attr("class","buttonIm")
//         .attr("src","static/imgs/add_sel.svg")
//         .attr("height", width)
//         .attr("width", width)
//         .classed("active",false)
         
//         .on("click", function(d, i) {
//             for (s of selections){
//                 s.rep.classed("active2",false)
//             }

//             let newS = sel.add(reserve, selections)
//             if(newS !== undefined){
//                 let log = {nameAction :"add_color", callparam: {addedColor: newS["cname"] }, data : datum, timestamp : Date.now()} 
//                 finalLog.push( JSON.stringify(log,Set_toJSON) ) 
//                 cache = []

//                 current_color = [newS]    
//                 setTimeout( ()=>{
//                     selectionsList(selections, selList) ;
//                     selectionsList(selections, selList) ;
//                     newS.rep.classed("active2",true) 
//                 },0 )
//             }
            
//         });

//         let remove = panel.append("div").attr("class","tooltip")
        
//         remove.append("span").attr("class","tooltiptext")
//         .text("Remove Selection") 

//         remove.append("img")
//         .attr("class","buttonIm")
//         .attr("src","static/imgs/remove_sel.svg")
//         .attr("height", width)
//         .attr("width", width)
//         .classed("active",false)
        
//         .on("click", function(d, i) {
//             let log = {nameAction :"remove_color", callparam: {removedColors: getValuesOfKey("cname",current_color ) }, data : datum, timestamp : Date.now()} 
//             finalLog.push( JSON.stringify(log,Set_toJSON) ) 
//             cache = []

//             if(selections.length > 2){
//                 for( cc of current_color ){
//                     cc.rep.classed("active2",false)
//                     sel.remove(reserve, selections,cc)
//                 }
//                 setTimeout( ()=>{

//                     selectionsList(selections, selList) ;
//                     selectionsList(selections, selList) ;
//                     if(selections.length>1){
//                         current_color = [selections[selections.length-1]]
//                         current_color[0].rep.classed("active2",true)
//                     } 

//                 },0 )              
                
               

//                 setTimeout( ()=>{
//                     scaterplot.updatePoints(datum, mainviewSvg)

//                     //LOGGING HISTORY/
//                     //DONE
//                     viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
//                     updateViewHistory(viewHistory)
//                     ///////////

//                 },0 )
                
//                 setTimeout( ()=>{
//                     sploom.updateSplom(datum, splom, sampleData,maxSplomAcc); 
//                 },0 )

//                 setTimeout( ()=>{
//                     updateTableView(datum, tableView_table)
//                 },0 )
                

//             }
            
//         });

//         let clearAll = panel.append("div").attr("class","tooltip")
        
//         clearAll.append("span").attr("class","tooltiptext")
//         .text("Clear All Selections") 

//         clearAll.append("img")
//         .attr("class","buttonIm")
//         .attr("src","static/imgs/clearAll_sel.svg")
//         .attr("height", width)
//         .attr("width", width)
//         .classed("active",false)
        
//         .on("click", function(d, i) { 
               
//             let log =  {nameAction :"clear_all_selections", callparam: {}, data : datum, timestamp : Date.now()} 
//             finalLog.push( JSON.stringify(log,Set_toJSON) ) 
//             cache = []

//             sel.clearAll(reserve, selections)

//             setTimeout( ()=>{
//                 selectionsList(selections, selList) ;
//                 selectionsList(selections, selList) ;

//                 scaterplot.updatePoints(datum, mainviewSvg)

//                 //LOGGING HISTORY
//                 //DONE
//                 viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
//                 updateViewHistory(viewHistory)
//                 ///////////
                
//             },0 )

//             setTimeout( ()=>{
//                 scaterplot.updatePoints(datum, mainviewSvg)
//             },0 )
            
//             setTimeout( ()=>{
//                 sploom.updateSplom(datum, splom, sampleData,maxSplomAcc); 
//             },0 )

//             setTimeout( ()=>{
//                 updateTableView(datum, tableView_table)
//             },0 )
            

            
            
//         });
//}

        
function selectionsTypeChooser(container){
    let width = 50

    let panel = container
        .append("tr")
        
        let replace = panel.append("td").attr("class","tooltip")

        replace.append("span").attr("class","tooltiptext")
        .text("Replace Selection") 

        let replaceB = replace.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/sel_square.svg")
            .attr("height", width)
            .attr("width", width)
            .classed("active",true)
            
            .on("click", function(d, i) {
                replaceB.classed("active",true)
                additiveB.classed("active",false)
                substractiveB.classed("active",false)
                zoomB.classed("active",false)

                current_selectionType = 1
             });

        let additive = panel.append("td").attr("class","tooltip")

        additive.append("span").attr("class","tooltiptext")
        .text("Additive Selection") 

        let additiveB = additive.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/sel_additiv.svg")
            .attr("height", width)
            .attr("width", width)

            .on("click", function(d, i) {
                replaceB.classed("active",false)
                additiveB.classed("active",true)
                substractiveB.classed("active",false)
                zoomB.classed("active",false)

                current_selectionType = 2
             }); 

        let substractive = panel.append("td").attr("class","tooltip")

        substractive.append("span").attr("class","tooltiptext")
        .text("Substractive Selection") 

        let substractiveB = substractive.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/sel_substractiv.svg")
            .attr("height", width)
            .attr("width", width)
             
            .on("click", function(d, i) {

                replaceB.classed("active",false)
                additiveB.classed("active",false)
                substractiveB.classed("active",true)
                zoomB.classed("active",false)

                current_selectionType = 3
                //console.lag(finalLog)
                ///finalLog.push({nameAction :"add_color", callparam: {addedColor: selections[0] , selectionsBefore : selections }} ) //, data : datum, timestamp : Date.now()} )
               
                //console.lag(finalLog.join("_"))
               
                //download(Date.now()+".txt", finalLog)
             });

        let zoom = panel.append("td").attr("class","tooltip")

        zoom.append("span").attr("class","tooltiptext")
        .text("Zoom") 
        
        let zoomB = zoom.append("img")
        .attr("class","buttonIm")
        .attr("src","static/imgs/sel_zoom.svg")
        .attr("height", width)
        .attr("width", width)
            
        .on("click", function(d, i) {

            replaceB.classed("active",false)
            additiveB.classed("active",false)
            substractiveB.classed("active",false)
            zoomB.classed("active",true)
            
            current_selectionType = 4
            //console.lag(finalLog)
            ///finalLog.push({nameAction :"add_color", callparam: {addedColor: selections[0] , selectionsBefore : selections }} ) //, data : datum, timestamp : Date.now()} )
            
            //console.lag(finalLog.join("_"))
            
            //download(Date.now()+".txt", finalLog)
            });

        
    }

    function colorOp(container){
            let width = 50
        
            let panel = container
                .append("tr")
        
                let add = panel.append("div").attr("class","tooltip")
        
                add.append("span").attr("class","tooltiptext")
                .text("Add Selection") 
        
                add.append("img")
                .attr("class","buttonIm")
                .attr("src","static/imgs/add_sel.svg")
                .attr("height", width)
                .attr("width", width)
                .classed("active",false)
                 
                .on("click", function(d, i) {
                    for (s of selections){
                        s.rep.classed("active2",false)
                    }
        
                    let newS = sel.add(reserve, selections)
                    if(newS !== undefined){
                        let log = {nameAction :"add_color", callparam: {addedColor: newS["cname"] }, data : datum, timestamp : Date.now()} 
                        let svState = saveState("add_color","")
                        savedEntries.push(svState)
                        if(onlineLogActive){
                            firebase.save(svState, globalLoss, userId)
                        }


                        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
                        cache = []
                        
        
                        current_color = [newS]    
                        setTimeout( ()=>{
                            selectionsList(selections, selList) ;
                            selectionsList(selections, selList) ;
                            newS.rep.classed("active2",true) 
                        },0 )
                    }
                    
                });
        
                panel = panel.append("tr")
                
                let remove = panel.append("div").attr("class","tooltip")
                
                remove.append("span").attr("class","tooltiptext")
                .text("Remove Selection") 
        
                remove.append("img")
                .attr("class","buttonIm")
                .attr("src","static/imgs/remove_sel.svg")
                .attr("height", width)
                .attr("width", width)
                .classed("active",false)
                
                .on("click", function(d, i) {
                    
                   



                    
                    if(selections.length > 2){
                        for( cc of current_color ){
                            cc.rep.classed("active2",false)
                            sel.remove(reserve, selections,cc)
                        }
                        setTimeout( ()=>{
        
                            selectionsList(selections, selList) ;
                            selectionsList(selections, selList) ;
                            if(selections.length>1){
                                current_color = [selections[selections.length-1]]
                                current_color[0].rep.classed("active2",true)
                            } 
        
                        },0 )              
                        
                       
        
                        setTimeout( ()=>{
                            scaterplot.updatePoints(datum, mainviewSvg)
                            
                            let log = {nameAction :"remove_color", callparam: {removedColors: getValuesOfKey("cname",current_color ) }, data : datum, timestamp : Date.now()} 
                            let svState = saveState("remove_color","")
                            savedEntries.push(svState)
                            if(onlineLogActive){
                                firebase.save(svState, globalLoss, userId)
                            }
                            
                            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
                            cache = []

                            //LOGGING HISTORY/
                            //DONE
                            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
                            updateViewHistory(viewHistory)
                            
                            ///////////
        
                        },0 )
                        
                        setTimeout( ()=>{
                            
                            sploom.updateSplom(datum, splom, sampleData,maxSplomAcc,viewVisitcount);
                            updateCountdown = 3 
                        },0 )
        
                        setTimeout( ()=>{
                            updateTableView(datum, tableView_table)
                            updateCountTable (datum, countTable);
                        },0 )
                        
        
                    }
                    
                });
        
                panel = panel.append("tr")

                let clearAll = panel.append("div").attr("class","tooltip")
                
                clearAll.append("span").attr("class","tooltiptext")
                .text("Clear All Selections") 
        
                clearAll.append("img")
                .attr("class","buttonIm")
                .attr("src","static/imgs/clearAll_sel.svg")
                .attr("height", width)
                .attr("width", width)
                .classed("active",false)
                
                .on("click", function(d, i) { 
                       
                    
                    
        
                    sel.clearAll(reserve, selections)
        
                    setTimeout( ()=>{
                        selectionsList(selections, selList) ;
                        selectionsList(selections, selList) ;
        
                        scaterplot.updatePoints(datum, mainviewSvg)
                        
                        let log =  {nameAction :"clear_all_selections", callparam: {}, data : datum, timestamp : Date.now()} 
                        let svState = saveState("clear_all_selections","")
                        savedEntries.push(svState)
                        if(onlineLogActive){
                            firebase.save(svState, globalLoss, userId)
                        }
                        
                        
                        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
                        cache = []

                        //LOGGING HISTORY
                        //DONE
                        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
                        updateViewHistory(viewHistory)
                        ///////////
                        
                    },0 )
        
                    setTimeout( ()=>{
                        scaterplot.updatePoints(datum, mainviewSvg)
                    },0 )
                    
                    setTimeout( ()=>{
                        sploom.updateSplom(datum, splom, sampleData,maxSplomAcc,viewVisitcount);
                        updateCountdown = 3 
                    },0 )
        
                    setTimeout( ()=>{
                        updateTableView(datum, tableView_table)
                        updateCountTable (datum, countTable);
                    },0 )       
                    
                });

                panel = panel.append("tr")

                let saveSelection = panel.append("div").attr("class","tooltip")
                
                saveSelection.append("span").attr("class","tooltiptext")
                .text("Save Selection") 
        
                saveSelection.append("img")
                .attr("class","buttonIm")
                .attr("src","static/imgs/save_selection.svg")
                .attr("height", width)
                .attr("width", width)
                .classed("active",false)
                
                .on("click", function(d, i) { 
                       
                    let log =  {nameAction :"saved_selections", callparam: {}, data : datum, timestamp : Date.now()} 
                    
                    let svState = saveState("saved_selections","")
                    savedEntries.push(svState)
                    if(onlineLogActive){
                        firebase.save(svState, globalLoss, userId)
                    }
                    
                    finalLog.push( JSON.stringify(log,Set_toJSON) )  
         
                    for (cc of current_color){
                        sel.save(cc)
                    }
                    
                });

    
}


let custDim_input = (container) => {
    container.append('input').attr('type','text')
        .attr('value', function (d) { return "custom dim"  })
        .on('keypress',async function(){
            let inputF = d3.select(this)
            let inputValue = inputF.property("value");
            
            if( d3.event.keyCode == 13 ){
       
                polyparser.addPolyDim(inputValue,datum)
                dimensions.push(inputValue)
                dimVisitcount[inputValue] = 0
                for( d of dimensions){
                    viewVisitcount[d+"_"+inputValue] = 0
                }
                    
            
                sploom.createSplom(datum,splom,dimensions,sampleData, null)
                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                updateCountdown = 3
                //sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount); 

                setTimeout( ()=>{
                    updateTableView(datum, tableView_table)
                    updateCountTable (datum, countTable);
                },0 )

                
                // Adding Listeners and interaction //
                //splom
                    let canvas = d3.select(".splom").selectAll(".splom-plot");
                    
                    canvas.on("click", function(d, i) {
                        //scaterplot.setup(500,500,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
                        //d3.select(this).attr("acc", parseInt(d3.select(this).attr("acc"))+1)
                        viewVisitcount[d3.select(this).attr("xDim")+"_"+d3.select(this).attr("yDim") ] += 1
                        // console.log( d3.select(this).attr("acc") )
                        scaterplot.chooseDims(700,700,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
                        scaterplot.updatePoints(datum, mainviewSvg);

                        //LOGGING HISTORY
                        //DONE
                        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
                        setTimeout( ()=>{
                            updateViewHistory(viewHistory)
                        },0 )
                

                        let log =  {nameAction :"change_view", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
                        let svState = saveState("change_view","")
                        savedEntries.push(svState)
                        if(onlineLogActive){
                            firebase.save(svState, globalLoss, userId)
                        }
                        

                        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
                        cache = []

                        ///////////
        
                        dimVisitcount[ d3.select(this).attr("xDim")] += 1 
                        dimVisitcount[ d3.select(this).attr("yDim")] += 1
                        totalDimVisitcount    += 1
                        updateCountdown -= 1
                        
                        if (updateCountdown <= 0 ){
                            updateCountdown = 3
                            
                            setTimeout( ()=>{
                                minMaxMed(current_color[0].content, dimensions, datum)
                                updateTableView(datum, tableView_table);
                                updateCountTable (datum, countTable);
                                },0 )

                            setTimeout( ()=>{
                                sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                                //updateCountdown = 3 
                            },0 )

                        }

                        


                    });

                    canvas.on("mouseover",   function(d, i) {
                        let hov = d3.select(this).select("#plot-hover")
                        hov.attr("fill", "rgba(255, 255, 0, 0.3)");
                    });

                    canvas.on("mouseleave",   function(d, i) {
                        let hov = d3.select(this).select("#plot-hover")
                        hov.attr("fill", "rgba(0, 0, 0, 0)");
                    });      
                // console.log("4")
                
            }else if( d3.event.keyCode == 27){

            }
           
        })

    }

function GroupActionChooser(container){
    let width = 50

    let panel = container
        .append("tr")
        
        let union = panel.append("td").attr("class","tooltip")
        
        union.append("span").attr("class","tooltiptext")
        .text("Union") 

        union.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/union.svg")
            .attr("height", width)
            .attr("width", width)

            .on("click", function(d, i) {
                //console.lag(current_color)
          
                let newS = sel.add(reserve, selections)
                if(newS !== undefined){
                    doUnion(current_color,newS)
                }
                
             })
             



            let intersection = panel.append("td").attr("class","tooltip")
        
            intersection.append("span").attr("class","tooltiptext")
            .text("Intersection") 
    
            intersection.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/intersection.svg")
            .attr("height", width)
            .attr("width", width)
            
            .on("click", function(d, i) {
                if(current_color.length>1){
                    let newS = sel.add(reserve, selections)
                    if(newS !== undefined){
                        doIntersection(current_color,newS)
                    }
                }
             });

            let difference = panel.append("td").attr("class","tooltip")
        
            difference.append("span").attr("class","tooltiptext")
            .text("Difference") 
    
            difference.append("img")
            .attr("class","buttonIm")
            .attr("src","static/imgs/difference.svg")
            .attr("height", width)
            .attr("width", width)

            .on("click", function(d, i) {
               
                if(current_color.length>1){
                    let newS = sel.add(reserve, selections)
                    if(newS !== undefined){
                        doDifference(current_color,newS)
                    }
                }
             });

}

function updateTableView(data, container){
    setRanges(data, dimensions)
    //console.lag(ranges)
    //container.append("tr")
    //.append("td").text("hello")
    container.select("thead").html("")
    
    let th = container.select("thead").append("tr")
    .selectAll("th")
    .data( [...dimensions, "color"] )

    let thEnter = th.join("th")
    .text(function(d) {
        return d;
    })

    .on("click", function(d){
        
        if(d3.select(this).text() === "color" ){
            tr.sort(function(a, b){

                let aaa = -1
                let aa  = Array.from(a[d])

                if( aa.length>0 ){ 
                     aaa = aa[0].order
                } 

                let bbb = -1
                let bb  = Array.from(b[d])
                if( bb.length>0 ){ 
                    //console.lag(bb)
                     bbb = bb[0].order
                } 

                return aaa - bbb;
            })
        }else{
            //console.lag(d3.select(this).text())
            tr.sort(function(a, b){
                return b[d] - a[d];
            })
        }
            
    });

    //////

    // let barcolor = d3.scaleLinear()
    // .domain([1, totalDimVisitcount/2, totalDimVisitcount])
    // .range(['#d73027', '#fee08b', '#1a9850'])
    // .interpolate(d3.interpolateHcl);
  

    let barwidth = d3.scaleLinear()
    .domain([0,totalDimVisitcount])
    .range([ 0, 40 ])


    let prov = container.select("thead").append("tr")
    .selectAll("th")
    .data( [...dimensions] )

    let thEnter2 = prov.join("th")
    .append("svg")
    .attr("width", 40).attr("height", 20)
    let bar = thEnter2.append("g")
    bar.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "lightgray")
    bar.append("rect").attr("width", d => { return barwidth(  dimVisitcount[d])} ).attr("height", "100%").attr("fill", "DeepSkyBlue"  ) //d => { return barcolor(  dimVisitcount[d])} 

    //////
    let minMaxDisplay = container.select("thead").append("tr")
    .selectAll("th") 
    .data( [...dimensions] )

    //console.lag([...dimensions] )
    let thEnter3 = minMaxDisplay.join("th")
    .text((d)=>{
       //console.lag(variance[d], mean[d],ranges[d], MinOrMax(variance[d], mean[d],ranges[d]) ); 
       return MinOrMax(variance[d], mean[d],ranges[d])
    })
 




    // let th = container.select("thead").selectAll("tr")
    // .data([[...dimensions, "color"],[...dimensions, "bobo"]])

    // let thEnter = th.join("tr")
    //     .selectAll("th")
    //     .data( d => {return d} )
        
    //     let thEnter2 = thEnter.join("th")
    //     .text(function(d) {
    //         return d;
    //     }) 
        


    

    let nDims = dimensions.length
    let tr= container.select("tbody").selectAll("tr")
        .data(data, function (d){ return d.id})
        
    let enter= tr.join("tr")
        
        let td= enter.selectAll("td")
             .data(function (d) { 
                 let res = []
                 for (di of dimensions ){
                     res.push(d[di])
                 }
                 res.push(d["color"])
                 return res
             })
        let enter2 = td.join("td")
        //     enter2.append("td")
            .text( function (d,i) { if  ( i < nDims ){return Number(Number(d).toFixed(2)) }})
        let svgs = enter2.filter(function(d,i){ return i === nDims ; }).selectAll("svg")                 
            .data(function (d) {
                if(d.size > 0 ){
                    return Array.from(d)
                }else{
                    return [selections[0].color]
                }
            })
                let svg = svgs.join("svg")
                    .attr("width", 20).attr("height", 20)
                    .append("rect").attr("width", "20").attr("height", "20").attr("fill", function (d) { return d.string });
    
    

}


const uni = ( acc , sel) =>{
  
    return [...acc, ...sel.content]
}

const doUnion = ( selectArr , resultSelection) =>{
    
    let res = selectArr.reduce(uni, [] );
    //console.lag(res)

    resultSelection.content = new Set(res);
    resultSelection.originCol = selectArr ;
    resultSelection.originOp = "static/imgs/union.svg" ;
    let unionArr = Array.from(resultSelection.content)
    
    for(const dPoint of datum){
        dPoint.color.delete(resultSelection.color)    
    }

    for(const dPoint of unionArr){
        dPoint.color.add(resultSelection.color)
    }

    scaterplot.updatePoints(datum, mainviewSvg)

    //LOGGING HISTORY
    //DONE
    viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
    setTimeout( ()=>{
        updateViewHistory(viewHistory)
        },0 )


    let log = {nameAction :"groupOp_union", callparam: {colors: getValuesOfKey("cname",current_color ), xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
    let svState = saveState("groupOp_union","")
    savedEntries.push(svState)
    if(onlineLogActive){
        firebase.save(svState, globalLoss, userId)
    }

    

    finalLog.push( JSON.stringify(log,Set_toJSON) ) 
    cache = []
    ///////////
    
    selectionsList(selections, selList) ;
    selectionsList(selections, selList) ;
    updateTableView(datum, tableView_table)
    updateCountTable (datum, countTable);

}

const inter = ( acc , sel) =>{
    return {content : new Set([...acc.content].filter(x => sel.content.has(x)))}
}

const doIntersection = ( selectArr , resultSelection) =>{
    if(selectArr.length > 1 ){
        let res = selectArr.slice(1, selectArr.length).reduce(inter, selectArr[0]);

        resultSelection.content = res.content

        resultSelection.originCol = selectArr ;
        resultSelection.originOp = "static/imgs/intersection.svg" ;

        let intersectionArr = Array.from(resultSelection.content)
        
        for(const dPoint of datum){
            dPoint.color.delete(resultSelection.color)    
        }

        for(const dPoint of intersectionArr){
            dPoint.color.add(resultSelection.color)
        }

        scaterplot.updatePoints(datum, mainviewSvg)

        //LOGGING HISTORY
        //DONE
        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
        setTimeout( ()=>{
            updateViewHistory(viewHistory)
            },0 )


        let log = {nameAction :"groupOp_intersection", callparam: {colors: getValuesOfKey("cname",current_color ) , xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
        let svState = saveState("groupOp_intersection","")
        savedEntries.push(svState)
        if(onlineLogActive){
            firebase.save(svState, globalLoss, userId)
        }
        
        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
        cache = []
        ///////////
        
        selectionsList (selections, selList)
        selectionsList (selections, selList)
        updateTableView(datum, tableView_table)
        updateCountTable (datum, countTable);    
    }

}


const diff = ( acc , sel) =>{
    let oneTow = new Set(  [...acc.content].filter(x => !sel.content.has(x)) );
    let towOne = new Set(  [...sel.content].filter(x => !acc.content.has(x)) );
    
    return {content :  new Set([...oneTow, ...towOne]) }
}


const doDifference = ( selectArr , resultSelection) =>{
    if(selectArr.length > 1 ){
        let res = selectArr.slice(1, selectArr.length).reduce(diff, selectArr[0]);

        resultSelection.content = res.content

        resultSelection.originCol = selectArr ;
        resultSelection.originOp = "static/imgs/difference.svg" ;
 
        let differenceArr = Array.from(resultSelection.content)
        
        for(const dPoint of datum){
            dPoint.color.delete(resultSelection.color)    
        }

        for(const dPoint of differenceArr){
            dPoint.color.add(resultSelection.color)
        }

        scaterplot.updatePoints(datum, mainviewSvg)

        //LOGGING HISTORY
        //DONE
        viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum ) })
        setTimeout( ()=>{
            updateViewHistory(viewHistory)
            },0 )


        let log = {nameAction :"groupOp_difference", callparam: {colors: getValuesOfKey("cname",current_color ) , xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
        let svState = saveState("groupOp_difference","")
        savedEntries.push(svState)
        if(onlineLogActive){
            firebase.save(svState, globalLoss, userId)
        }
       
        finalLog.push( JSON.stringify(log,Set_toJSON) ) 
        cache = []
        ///////////
        
        selectionsList (selections, selList)
        selectionsList (selections, selList)
        updateTableView(datum, tableView_table)
        updateCountTable (datum, countTable);
    }
}


function getcol(arr, column) {
    return arr.map(x => Number(Number(x[column]).toFixed(2)) )
}


const setRanges = (data, dimensions) => {
    for (dim of dimensions){
        let dataDim = getcol (data,dim)
        ranges[dim] = d3.extent(dataDim)
       // console.log( ranges[dim])
    }
}

const minMaxMed = (selcontent, dimensions,data) => {
    
    for(dim of dimensions){
        if(selcontent.size > 0){
            let array = getcol([...selcontent], dim)
            variance[dim] = math.variance(array)/math.variance( getcol([...data], dim))
            mean[dim] = math.mean(array)
            // console.log(variance[dim])
        }else{
            variance[dim] = null
            mean[dim] = null

        } 
                 
    } 

    //console.lag (variance)
    //console.lag (mean)
    
} 

const MinOrMax = (variance, mean, range) => {
    //console.lag(range)
    
    let min=parseFloat(range[0])
    let max=parseFloat(range[1])

    let mid = min + (max - min)/2 
    let midMinus =min + (mid - min)/2   
    let midPlus = mid + (max - mid)/2   

    // console.log("r0   :",min)
    // console.log("minus:",midMinus)
    // console.log("mid  :",mid     )
    // console.log("plus :",midPlus )
    // console.log("r1   :",max )
    
    if(variance !== null && variance<0.1 ){
        if( mean >= min && mean < midMinus ){
            return "Min";
        }
        else if(mean >= midMinus && mean < midPlus){
            return "Mid";
        }
        else if(mean >= midPlus && mean <= max){
            return "Max";
        }
        else{
            //console.lag("min:",min) 
            //console.lag("max:",max) 
            //console.lag("mean:",mean)   
            return "/"
        }
    }else{
        return "---";
    }

} 

function Set_toJSON(key, value) {
    if (typeof value === 'object' && value instanceof Set) {
        return [...value];
    }
    
      return value;
  }

let getValuesOfKey = (key, arr) =>{
    let acc = [] 
    for (e of arr){
        acc.push(e[key]) 
    }
    return acc
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);

  }

  let identify = () => {
    let txt;
    do{
        var person = prompt("Please enter your name:", "");
        txt = person
    }while(person == null || person == "")

    return txt

  }

  let saveState = (aName, parameters) => {
    let curCol = []
    let sels = {}
    let resv = []

    for ( c of current_color){
        curCol.push(c.cname)    
    }

    for ( s of selections ){
       // if(s.cname !== "Blue"){
            sels[s.cname] = {points : loader.pointsAToiArray(s.content), dispName :  s.displayName }
        //}
    }

    for ( r of reserve ){
        resv.push(r.cname)
    }



    
    let entry = {
        actName: aName                                  , 
        param : parameters                              ,
        currentColor: curCol                            ,
        active_selectiontype : current_selectionType    ,  //
        selections: sels                                , 
        reserve: resv                                   , 
        
        mvX: mainviewSvg.attr("xDim")                   , 
        mvY: mainviewSvg.attr("yDim")                   ,
        viewsCount : viewVisitcount                     ,
        favorites : favIndex                            ,
    }

    return entry
    //console.lag(entry)

  }

  
  let loadState = (entry) => {
    let colPool = selections.concat(reserve);
    
    selections = []
    reserve    = []
    current_color = []
    viewVisitcount = entry.viewsCount

    viewToDimCount()

    Object.keys(maxSplomAcc).forEach(function(key) {
        maxSplomAcc[key] = 0
    })
    maxSplomAcc["v"] = 1
    
    for ( d of datum ){
        d.color.clear()
    }

    for ( c of entry.currentColor){

        current_color.push(colPool.find(itm=>itm.cname === c))
   
    }

    Object.keys(entry.selections).forEach(function(s) {
            let temp = colPool.find(itm=>itm.cname === s)
            selections.push(temp) 
            temp.displayName = entry.selections[s].dispName
            temp.content = new Set(loader.indexAToPArray(entry.selections[s].points, datum))

            for(p of entry.selections[s].points ){
                if(temp.color != selections[0].color){
                    datum[p].color.add(temp.color)
                }
                
            }
    });

    for ( r of entry.reserve ){
        let temp = colPool.find(itm=>itm.cname === r)
        reserve.push(temp)
        temp.content.clear()
    }




    setTimeout( ()=>{   
        selectionsList(selections, selList);
        selectionsList(selections, selList);
        
        selList.selectAll("tr").classed("active2",false)
        for ( c of entry.currentColor){  
            selList.select("#"+c).classed("active2",true)
        }
    

        scaterplot.chooseDims(700,700,datum, entry.mvX,entry.mvY, mainviewSvg);
     },0 )

     setTimeout( ()=>{
        //minMaxMed(current_color[0].content, dimensions)
        updateTableView(datum, tableView_table);
        updateCountTable (datum, countTable); 
      },0 )

    setTimeout( ()=>{
        //sploom.createSplom(datum,splom,dimensions,sampleData, null)

        
        sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
        updateCountdown = 3
        //sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
        // Adding Listeners and interaction //
        //splom
        let canvas = d3.select(".splom").selectAll(".splom-plot");
            
        canvas.on("click", function(d, i) {
            //scaterplot.setup(500,500,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
            //d3.select(this).attr("acc", parseInt(d3.select(this).attr("acc"))+1)
            viewVisitcount[d3.select(this).attr("xDim")+"_"+d3.select(this).attr("yDim") ] += 1
            // console.log( d3.select(this).attr("acc") )
            scaterplot.chooseDims(700,700,datum, d3.select(this).attr("xDim"), d3.select(this).attr("yDim"), mainviewSvg);
            scaterplot.updatePoints(datum, mainviewSvg);

            //LOGGING HISTORY
            //DONE
            viewHistory.push({ "xDim": mainviewSvg.attr("xDim") ,"yDim": mainviewSvg.attr("yDim"), "data": cloneDeep(datum) })
            setTimeout( ()=>{
                updateViewHistory(viewHistory)
                },0 )
    

            let log =  {nameAction :"change_view", callparam: {xDim: mainviewSvg.attr("xDim") , yDim: mainviewSvg.attr("yDim")}, data : datum, timestamp : Date.now()} 
            let svState = saveState("change_view","")
            savedEntries.push(svState)
            if(onlineLogActive){
                firebase.save(svState, globalLoss, userId)
            }
           
            finalLog.push( JSON.stringify(log,Set_toJSON) ) 
            cache = []


            ///////////
        
            dimVisitcount[ d3.select(this).attr("xDim")] += 1 
            dimVisitcount[ d3.select(this).attr("yDim")] += 1
            totalDimVisitcount    += 1
            updateCountdown -= 1
            
            if (updateCountdown <= 0 ){
                updateCountdown = 3
                
                setTimeout( ()=>{
                    minMaxMed(current_color[0].content, dimensions, datum)
                    updateTableView(datum, tableView_table);
                    updateCountTable (datum, countTable);
                },0 )

                setTimeout( ()=>{
                    sploom.updateSplom(datum, splom, sampleData, maxSplomAcc,viewVisitcount);
                    //updateCountdown = 3 
                },0 )

            }
        });

        canvas.on("mouseover",   function(d, i) {
            let hov = d3.select(this).select("#plot-hover")
            hov.attr("fill", "rgba(255, 255, 0, 0.3)");
        });

        canvas.on("mouseleave",   function(d, i) {
            let hov = d3.select(this).select("#plot-hover")
            hov.attr("fill", "rgba(0, 0, 0, 0)");
        });     


        //console.lag("updatedS")
    },0 )

  }


  function updateCountTable(data, container){
   
    //console.log(dimVisitcount)
    //console.log(totalDimVisitcount)

    setRanges(data, dimensions)
    container.select("thead").html("")
    
    let th = container.select("thead").append("tr")
    .selectAll("th")
    .data( [...dimensions] )
    let thEnter = th.join("th")
    .text(function(d) {
        return d;
    })

    let barwidth = d3.scaleLinear()
    .domain([0,totalDimVisitcount])
    .range([ 0, 40 ])

    let prov = container.select("thead").append("tr")
    .selectAll("th")
    .data( [...dimensions] )

    let thEnter2 = prov.join("th")
    .append("svg")
    .attr("width", 40).attr("height", 20)
    let bar = thEnter2.append("g")
    bar.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "lightgray")
    bar.append("rect").attr("width", d => { return barwidth(  dimVisitcount[d])} ).attr("height", "100%").attr("fill", "DeepSkyBlue"  ) //d => { return barcolor(  dimVisitcount[d])} 

    //////
    let minMaxDisplay = container.select("thead").append("tr")
    .selectAll("th") 
    .data( [...dimensions] )

    //console.lag([...dimensions] )
    let thEnter3 = minMaxDisplay.join("th")
    .text((d)=>{
       //console.lag(variance[d], mean[d],ranges[d], MinOrMax(variance[d], mean[d],ranges[d]) ); 
       return MinOrMax(variance[d], mean[d],ranges[d])
    })
 

}

let resetProv = () => {
    Object.keys(viewVisitcount).forEach(function(key) {
        viewVisitcount[key] = 0
    })

    Object.keys(dimVisitcount).forEach(function(key) {
        dimVisitcount[key] = 0
    })
    Object.keys(maxSplomAcc).forEach(function(key) {
        maxSplomAcc[key] = 0
    })
    maxSplomAcc["v"] = 1

     
    totalDimVisitcount = 0

}

let viewToDimCount = () => {
    Object.keys(dimVisitcount).forEach(function(key) {
        dimVisitcount[key] = 0
    }) 
    totalDimVisitcount  = 0

    for(ds of Object.keys(viewVisitcount)){
        let d = ds.split('_')
        //console.log(d)
        dimVisitcount[d[0]] += viewVisitcount[ds]
        dimVisitcount[d[1]] += viewVisitcount[ds]
        totalDimVisitcount  += viewVisitcount[ds]
    }

}