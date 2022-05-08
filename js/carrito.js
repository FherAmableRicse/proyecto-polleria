"use strict";
import { Plato } from "./plato.js";
import { itemsMenu } from "./itemsMenu.js";

const documentReady = () => {
  let platos = [];
  itemsMenu.forEach((element) => {
    const plato = new Plato(element.nombre, element.precio, element.imagen);
    platos.push(plato);
  });
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");
  const buscadorInput = document.getElementById("buscadorInput");
  const buscadorResultados = document.getElementById("buscadorResultados");
  let carrito = [];
  const divisa = "S/.";

  function sumarRest(...itemsSumar) {
    let total = 0;
    for (const num of itemsSumar) {
      total += num;
    }
    return total;
  }

  const mostrarPlatos = (platosMostrar) => {
    for (let i = 0; i < platosMostrar.length; i++) {
      buscadorResultados.innerHTML += `
            <div class="buscador__plato">
            <figure class="buscador__plato-image-container">
            <img src="${platosMostrar[i].imagen}" alt="${platosMostrar[i].nombre}"
                class="buscador__plato-image" />
            </figure>
            <h3 class="buscador__plato-title" id="platoTitle">${platosMostrar[i].nombre}</h3>
            <h3 class="buscador__plato-precio">${platosMostrar[i].precio.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 })}</h3>
            <button type="button" class="buscador__plato-boton" id="${i}">Agregar</button>
            </div>
            `;
    }
  };

  const asignarBotones = (botones, platosBuscados) => {
    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", () => {
        carrito.push(platosBuscados[i]);
        renderizarCarrito();
      });
    }
  };

  function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = "";
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
        return itemId === item ? (total += 1) : total;
      }, 0);
      // Creamos el nodo del item del carrito
      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-right", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} ${miItem[0].precio.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 })}`;
      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-1");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item.id;
      miBoton.addEventListener("click", borrarItemCarrito);
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
    let precios=[];
    carrito.forEach((item)=>{
      precios.push(item.precio);
    });

    return sumarRest(...precios);
  }

  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
  }

  // Eventos
  DOMbotonVaciar.addEventListener("click", vaciarCarrito);

  mostrarPlatos(platos);
  let botones = document.getElementsByClassName("buscador__plato-boton");
  asignarBotones(botones, platos);

  const buscarPlato = (e) => {
    buscadorResultados.innerHTML = "";

    const platosBuscados = platos.filter((element) => {
      if (e.target.value.toLowerCase() === "") {
        return platos;
      } else {
        return element.nombre
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });

    mostrarPlatos(platosBuscados);
    botones = document.getElementsByClassName("buscador__plato-boton");
    asignarBotones(botones, platosBuscados);
  };

  buscadorInput.addEventListener("keyup", buscarPlato);
};

document.addEventListener("DOMContentLoaded", documentReady);
