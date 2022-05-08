export class Plato {
  static idProducto = 0;
  _id;
  _nombre;
  _precio;
  _imagen;

  constructor(nombre, precio, imagen) {
    this._id = ++Plato.idProducto;
    this._nombre = nombre;
    this._precio = precio;
    this._imagen = imagen;
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get precio() {
    return this._precio;
  }

  set precio(precio) {
    this._precio = precio;
  }

  get imagen() {
    return this._imagen;
  }

  set imagen(imagen) {
    this._imagen = imagen;
  }
}
