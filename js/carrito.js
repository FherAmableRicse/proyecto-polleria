'use strict';
import {platos} from "../js/platos.js"

const documentReady = () => {

    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const buscadorInput=document.getElementById('buscadorInput');
    const buscadorResultados=document.getElementById('buscadorResultados');
    let carrito=[];
    const divisa = 'S/.';

    const mostrarPlatos=(platosMostrar)=>{
        for(let i=0;i<platosMostrar.length;i++){
            buscadorResultados.innerHTML+=`
            <div class="buscador__plato">
            <figure class="buscador__plato-image-container">
            <img src="${platosMostrar[i].imagen}" alt="${platosMostrar[i].nombre}"
                class="buscador__plato-image" />
            </figure>
            <h3 class="buscador__plato-title" id="platoTitle">${platosMostrar[i].nombre}</h3>
            <h3 class="buscador__plato-precio">S/. ${platosMostrar[i].precio}</h3>
            <button type="button" class="buscador__plato-boton" id="${i}">Agregar</button>
            </div>
            `;
        }
    }

    const asignarBotones=(botones,platosBuscados)=>{
        for(let i=0;i<botones.length;i++){
            botones[i].addEventListener('click',()=>{
                carrito.push(platosBuscados[i]);
                renderizarCarrito();
            });
        }
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = platos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item.id);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} ${divisa} ${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item.id;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    function borrarItemCarrito(e) {
        const id = e.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId.id !== parseInt(id);
            
        });
        renderizarCarrito();
    }

    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = platos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item.id);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }
    
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    

    mostrarPlatos(platos);
    let botones=document.getElementsByClassName('buscador__plato-boton');   
    asignarBotones(botones,platos);

    const buscarPlato=(e)=>{
        buscadorResultados.innerHTML='';

        const platosBuscados=platos.filter((element)=>{
            if(e.target.value.toLowerCase()===''){
                return platos;
            }else{
                return (element.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
            }
        });

        mostrarPlatos(platosBuscados);
        botones=document.getElementsByClassName('buscador__plato-boton');
        asignarBotones(botones,platosBuscados);

    };



    buscadorInput.addEventListener('keyup',buscarPlato);

}
        
document.addEventListener('DOMContentLoaded', documentReady);
