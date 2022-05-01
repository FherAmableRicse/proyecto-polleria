'use strict';
import {platos} from "../js/platos.js"

const documentReady = () => {
    const buscadorInput=document.getElementById('buscadorInput');
    const buscadorResultados=document.getElementById('buscadorResultados');
    const platosCarrito=[];

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
                platosCarrito.push(platosBuscados[i]);
                console.log(platosCarrito);
            });
        }
    }

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