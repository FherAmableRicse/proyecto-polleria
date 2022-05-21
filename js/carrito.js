"use strict";
import { Plato } from "./plato.js";
import { itemsMenu } from "../utils/itemsMenu.js";
import { fetchApi } from "../utils/apiUtils.js";

const documentReady = () => {
  const apiCarrito = async () => {
    let platos = [];
    const fetchResultado = await fetchApi(
      "https://fheramablericse.github.io/api-test/db.json"
    );
    platos = fetchResultado;

    const DOMcarrito = document.querySelector("#carrito");
    const DOMtotal = document.querySelector("#total");
    const DOMbotonVaciar = document.querySelector("#boton-vaciar");
    const buscadorInput = document.getElementById("buscadorInput");
    const buscadorResultados = document.getElementById("buscadorResultados");
    let carritoCompra = [];

    function sumarRest(...itemsSumar) {
      let total = 0;
      for (const num of itemsSumar) {
        total += num;
      }
      return total;
    }

    const mostrarPlatos = (platosMostrar) => {
      for (let i = 0; i < platosMostrar.length; i++) {
        const { imagen, nombre, precio, id } = platosMostrar[i];
        buscadorResultados.innerHTML += `
            <div class="buscador__plato">
            <figure class="buscador__plato-image-container">
            <img src="${imagen}" alt="${nombre}"
                class="buscador__plato-image" />
            </figure>
            <h3 class="buscador__plato-title" id="platoTitle">${nombre}</h3>
            <h3 class="buscador__plato-precio">${precio.toLocaleString(
              "es-PE",
              {
                style: "currency",
                currency: "PEN",
                minimumFractionDigits: 2,
              }
            )}</h3>
            <button type="button" class="buscador__plato-boton" id="${i}">Agregar</button>
            </div>
            `;
      }
    };

    const asignarBotones = (botones, platosBuscados) => {
      for (let i = 0; i < botones.length; i++) {
        //Poner items en el carrito
        botones[i].addEventListener("click", () => {
          carritoCompra.push(platosBuscados[i]);
          renderizarCarrito();
          localStorage.setItem("itemsCarrito", JSON.stringify(carritoCompra));
        });
      }
    };

    function renderizarCarrito() {
      let carritoRender = JSON.parse(localStorage.getItem("itemsCarrito"));
      carritoRender = carritoRender.map((element) => {
        const itemCarrito = new Plato({ element });
        return itemCarrito;
      });
      console.log(carritoRender);
      console.log(carritoCompra);
      // Vaciamos todo el html
      DOMcarrito.textContent = "";
      // Quitamos los duplicados
      const carritoSinDuplicados = [...new Set(carritoRender)];
      // Generamos los Nodos a partir de carrito
      carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = platos.filter((itemBaseDatos) => {
          // ¿Coincide las id? Solo puede existir un caso
          return itemBaseDatos.id === parseInt(item.id);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carritoCompra.reduce((total, itemId) => {
          // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
          return itemId === item ? (total += 1) : total;
        }, 0);
        // Creamos el nodo del item del carritoCompra
        const miNodo = document.createElement("li");
        miNodo.classList.add("list-group-item", "text-right", "mx-2");
        miNodo.textContent = `${numeroUnidadesItem} x ${
          miItem[0].nombre
        } ${miItem[0].precio.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
        })}`;
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
      carritoCompra = carritoCompra.filter((carritoId) => {
        return carritoId.id !== parseInt(id);
      });
      renderizarCarrito();
      //Actualizar local/sesion storage
    }

    function calcularTotal() {
      let precios = [];
      carritoCompra.forEach((item) => {
        precios.push(item.precio);
      });

      return sumarRest(...precios);
    }

    function vaciarCarrito() {
      // Limpiamos los productos guardados
      carritoCompra = [];
      // Renderizamos los cambios
      renderizarCarrito();
      //Actualizar local/sesion storage
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
  apiCarrito();
};

document.addEventListener("DOMContentLoaded", documentReady);
