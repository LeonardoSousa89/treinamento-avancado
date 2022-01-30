var db = [] 

function method(opt,data,email) {
    
    if (opt === 'insert'){
        if(data === '' || data === null || !data) {
            db = db
            return db
        }

        const insert = db.push(data)
        return insert
     }

     if(opt === 'delete'){
         if(email === '' || email === null || !email){
            db = db
            return db
         }

         const remove = db.splice(email,1)
         return remove
     }

}

module.exports = { method, db }