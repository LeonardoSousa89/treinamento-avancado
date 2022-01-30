let data = []

data.push({ email: 'mendesdev@aws.com' ,password:'254as65d6a' })
data.push({ email: 'leonardsolutis@aws.com' ,password:'54as64dasd' })
data.push({ email: 'killgrave@marvel.com.org' ,password:'1234' })
data.push({ email: 'tyrel@hbo.com.org' ,password:'12345' })

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



