function call(){
    console.log('called him!')
}

function call2(numb){
    while(numb > 0){
        let count = numb-- 
        console.log(count)
    }
}

module.exports = { call, call2 }