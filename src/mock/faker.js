const faker = require('faker')

function testProducts(){

let products=[]

for (let i=0;i<5;i++){
let randomProduct={
    id:faker.datatype.uuid(),
    name:faker.name.fullName(),
    price:faker.commerce.price(1000,150000,0,'$'),
    img:faker.image.business(300)}
    products.push(randomProduct)
}
return products

}

module.exports={testProducts}