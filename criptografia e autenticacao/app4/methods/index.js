var db = [] 

function method(opt,data) {
    
    if (opt === 'insert'){
        if(data === '' || data === null || !data) {
            db = db
            return db
        }

        const insert = db.push(data)
        return insert
     }

}

module.exports = { method, db }