export const fetchApi = async (url) => {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  } 
};

export const mostrarPlatos = (platosMostrar, buscadorResultados) => {
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
