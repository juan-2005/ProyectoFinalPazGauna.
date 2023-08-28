let articulosCarrito = []; 

const listaProductos = document.querySelector('#lista-productos');

const carrito = document.querySelector('#carrito');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const contenedorCarrito = document.querySelector('#lista-carrito tbody')


const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {
 Swal.fire({
  title:'Genial',
  Text:'LLenaste el Formulario',
  icon:'success',
  confirmButtonText:'cool',
 })

})

document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("dni").value;
    const aldeas = document.getElementById("aldeas").value;

    
    function hacerSolicitud() {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('edad', edad);
        formData.append('email', email);
        formData.append('dni',dni);
        formData.append('aldeas', aldeas);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            localStorage.JSON('Respuesta recibida:', data);
        })
        .catch(error => {
            localStorage.JSON('Hubo un error:', error);
        });
    }

   
    setTimeout(hacerSolicitud, 3000); 
});

$(document).ready(function() {
    $("#submit").click(function() {
      $.ajax({
        url: "datos.json",
        dataType: "json",
        success: function(result) {
            $("#lista-productos").html("Nombre: " + result.nombre + "<br>Productos:" + result.producto); 
        
            localStorage.setItem("recivo", JSON.stringify(datos));
        }
      });
    });
  });

document.addEventListener("DOMContentLoaded", function(){
    const formulario = document.getElementById("miFormulario");

    formulario.addEventListener("submit", function(event){
        event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("dni").value;
    const aldeas = document.getElementById("aldeas").value;

        const datos = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            email: email,
            telefono: telefono,
            aldeas: aldeas,
        };
            localStorage.setItem("formulario", JSON.stringify(datos));

                 formulario.reset();
});
});



document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
       
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
        
    }
    carritoHTML();
})

listaProductos.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto)

function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
        
        leerDatosProducto(producto)
        
    }
}

function eliminarProducto(evt){
    evt.preventDefault();
    
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h4').textContent,
        precio: item.querySelector('.precio').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
   
    if(articulosCarrito.some( item => item.id === infoProducto.id)){ 
        
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto;
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice();
    }else {
        articulosCarrito.push(infoProducto)
    }

    carritoHTML()
}

function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}"  width="100"/></td>
            <td>${producto.titulo}</td>
             <td>${producto.precio}</td>
             <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> ❌ </a>
            </td>
        `;
        contenedorCarrito.appendChild(fila)
    })

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}
