const database = require('./firebase.js')
function save(log, globalLoss, username)
{
    const obj = {
        log : log,
        globalLoss: globalLoss
    }
    database.db.collection("prov_"+username).doc(""+Date.now()).set(obj)
                                        .then(ev=>console.log("success"))
                                        .catch(err=>globalLoss++)
}

module.exports = {
    save: save
}