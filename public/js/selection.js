const  d3  = require('d3');

const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');

exports.add = (reserve, selections) => {
    let newS = reserve.pop()
    if(newS !== undefined && newS !== null ){
        selections.push(newS)
        return newS
    }
}

exports.remove = (reserve, selections,current_color) => {

    let i = selections.indexOf(current_color)
    if(i>0){
        current_color.originOp = null
        current_color.originCol = []

        for (let e of current_color.content){
            e.color.delete(current_color.color)
            if (e.color.size === 0 ){
                selections[0].content.add(e)
            }
        }
        
        current_color.content = new Set()

        reserve.push(current_color)
        selections.splice(i, 1)
    }

}

exports.clearAll = (reserve, selections) => {
    let l = selections.length
    for (let i = 1; i < selections.length ; i++){
        
   // console.log(selections[i].originOp)
    
        selections[i].originOp = null
        selections[i].originCol = []

        for (let e of selections[i].content){
            e.color.delete(selections[i].color)
            if (e.color.size === 0 ){
                selections[0].content.add(e)
            }
        }
        
        selections[i].content = new Set()

        
    } 
}

exports.save = (current_color) => {
    const csvFromArrayOfObjects = convertArrayToCSV([...current_color.content],{
        separator: ';'
      });
    download(current_color.displayName+"_"+Date.now()+".csv" , csvFromArrayOfObjects)
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