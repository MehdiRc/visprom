const  d3  = require('d3');


exports.indexAToPArray = ( iArray, datum ) => {
    let pArray = []
    for (i of iArray) {
        pArray.push(datum[Number(i)])
    }
    //console.log("endL")
    return pArray;
}
exports.pointsAToiArray = (pArray) => {
    let iArray = []
    for (p of pArray) {
        iArray.push(Number(p.id))
    }

    return iArray;
}