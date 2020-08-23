const  math  = require('mathjs');

let evaluateExp = (str, d) => {
    return math.evaluate(str,d)
}

exports.addPolyDim = (str, data) => {
    for( d of data){
        d[str] = +(Number(Number(evaluateExp(str,d)).toFixed(2)))
    }
}
