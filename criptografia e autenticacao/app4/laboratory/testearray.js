let data = []

data.push({ id: 0, email: 'mendesdev@aws.com' ,password:'254as65d6a' })
data.push({ id: 1, email: 'leonardsolutis@aws.com' ,password:'54as64dasd' })
data.push({ id: 2, email: 'killgrave@marvel.com.org' ,password:'1234' })
data.push({ id: 3, email: 'tyrel@hbo.com.org' ,password:'12345' })

let user = 'killgrave@marvel.com.org'

const find = data.find(e =>{
        if(e.email === user ) return e
    })

console.log(find)

/** ============================================================================ */

function search(user) {
    const find = data.find(e =>{
        if(e.email === user ) return e
    })

    if(find) return 'User founded.'

    if(!find) return 'User not found.'
} 

console.log(search('killgrave@marvelas.com.org'))


/** ============================================================================ */
data.splice(3,1)
console.log(data)
