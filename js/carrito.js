'use strict';
import {platos} from "../js/platos.js"

const documentReady = () => {
    const buscadorInput=document.getElementById('buscadorInput');
    const buscadorResultados=document.getElementById('buscadorResultados');
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
    };

    buscadorInput.addEventListener('keyup',buscarPlato);
}
        
document.addEventListener('DOMContentLoaded', documentReady);