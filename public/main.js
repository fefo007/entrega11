const {denormalize,schema}= require('normalizr')

let socket = io.connect();

socket.on('messages', data=> { 
    console.log(data)
    // DENSORMALIZA
    const author = new schema.Entity('author')
    const date = new schema.Entity('date')
    const post = new schema.Entity('post')
    const normalizrStructure = new schema.Entity('normalizrStructure',{
        author:author, 
        text:post,
        date:date,
        })
    const denormalizrData = denormalize(data.result,normalizrStructure,data.entities)
    render(denormalizrData);
});

socket.on('products', dataProd=> {
    renderProd(dataProd)
});

function render(data) { 
    let html = data.map(elem=>{ 
        return(`<div class="chat">
            <p  class="chat__email">Usuario : ${elem.author}</p>
            <p  class="chat__fecha">(${elem.date})</p>
            <p  class="chat__texto"> : ${elem.text}</p>
            </div>`) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}
function renderProd(dataProd) {
    let htmlProd = dataProd.map(prod=>{
        return (
                `<tr>
                    <td>${prod.nombre}</td>
                    <td>${prod.precio}</td>
                    <td>
                        <img src= "${prod.url}" width="100px" alt= "${prod.nombre}">
                    </td>
                </tr>`
                )
    }).join(" ");
    document.getElementById('products').innerHTML = htmlProd;
}

function addMessage() { 
    let mensaje = { 
        author:{
            id: document.getElementById('username').value,
            name:document.getElementById('name').value,
            surname:document.getElementById('surname').value,
            age:document.getElementById('age').value,
            nickname:document.getElementById('nickname').value,
            img:document.getElementById('img').value, 
            },
        text: document.getElementById('texto').value,
        date:new Date().toLocaleString()
    }; 
    socket.emit('new-message', mensaje); 
    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()
    return false;
}

function addProduc() {
    let producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        url: document.getElementById('url').value
    }
    socket.emit('new-product',producto);
    console.log(producto)
    return false
}