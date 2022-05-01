'use strict';
import {platos} from "../js/platos.js"

const documentReady = () => {
    const buscadorInput=document.getElementById('buscadorInput');
    const buscadorResultados=document.getElementById('buscadorResultados');
    const templateCarrito = document.getElementById('template-carrito').content
    const platosCarrito=[];

    const buscarPlato=(e)=>{
        if(e.target.value.toLowerCase()===''){
            buscadorResultados.innerHTML='';
            return;
        }

        buscadorResultados.innerHTML='';

        const platosBuscados=platos.filter((element)=>{
            return (element.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
        });

        for(let i=0;i<platosBuscados.length;i++){
            buscadorResultados.innerHTML+=`
            <div class="buscador__plato">
            <figure class="buscador__plato-image-container">
              <img src="${platosBuscados[i].imagen}" alt="${platosBuscados[i].nombre}"
                class="buscador__plato-image" />
            </figure>
            <h3 class="buscador__plato-title" id="platoTitle">${platosBuscados[i].nombre}</h3>
            <h3 class="buscador__plato-precio">S/. ${platosBuscados[i].precio}</h3>
            <button type="button" class="buscador__plato-boton" id="${i}">Agregar</button>
            </div>
            `;

            // document.getElementById(`${i}`).addEventListener('click',()=>{
            //     platosCarrito.push(platosBuscados[i]);
            //     console.log(platosCarrito);
            // });
        }

        const botones=document.getElementsByClassName('buscador__plato-boton');
        
        for(let i=0;i<botones.length;i++){
            botones[i].addEventListener('click',()=>{
                platosCarrito.push(platosBuscados[i]);
                console.log(platosCarrito);
            });
        }

        const items = document.getElementById('items');
        items.innerHTML = ''
	Object.values(carrito).forEach(producto => {
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.title
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})

    };

    buscadorInput.addEventListener('keyup',buscarPlato);
}
        
document.addEventListener('DOMContentLoaded', documentReady);