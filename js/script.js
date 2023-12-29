const products = [
    {
        id: 1,
        name: 'GeForce RTX 4090 GAMING',
        pricebefore: '$2.299.990',
        priceafter: '$2.099.990',
        image: 'img/producto1.jpg',
        description: 'La mejor grafica NVIDIA',
    },
    {
        id: 2,
        name: 'Gigabyte Radeon RX6900XT Gaming',
        pricebefore: '$2.399.990',
        priceafter: '$2.099.990',
        image: 'img/producto2.jpg',
        description: 'La mejor grafica AMD',
    },
    {
        id: 3,
        name: 'AMD Ryzen 9 7900X',
        pricebefore: '$522.495',
        priceafter: '$499.990',
        image: 'img/producto 3.jpg',
        description: 'El Mejor Procesador AMD',
    },
    {
        id: 4,
        name: 'Intel Core i9-14900K',
        pricebefore: '$959.999',
        priceafter: '$890.000',
        image: 'img/producto7.jpg',
        description: 'El mejor procesador INTEL',
    },
    {
        id: 5,
        name: 'Consola Playstation 5 (PS5)',
        pricebefore: '$579.000',
        priceafter: '$399.000',
        image: 'img/producto5.jpg',
        description: 'Consola Playstation 5 (PS5) - Versión Con Lector',
    },
    {
        id: 6,
        name: 'Consola Nintendo Switch Neon + Mario Kart 8',
        pricebefore: '$459.000',
        priceafter: '$339.990',
        image: 'img/producto6.jpg',
        description: 'Nintendo',
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('productos');

    products.forEach((product, index) => {
        if (index % 3 === 0) {
            const row = document.createElement('div');
            row.classList.add('product-row');
            app.appendChild(row);
        }

        const rows = app.getElementsByClassName('product-row');
        const lastRow = rows[rows.length - 1];

        const card = createProductCard(product);
        lastRow.appendChild(card);
    });

    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    dibujarCarritoHTML();
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.classList.add('product-img');

    const name = document.createElement('h2');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('preciobefore');
    price.textContent = product.pricebefore;

    const price2 = document.createElement('p');
    price2.classList.add('precioafter');
    price2.textContent = product.priceafter;

    const description = document.createElement('p');
    description.classList.add('descripcion');
    description.textContent = product.description;

    const id = document.createElement('p');
    id.classList.add('id-producto');
    id.textContent = product.id;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('agregar-carrito');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.addEventListener('click', agregarProducto);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(price2);
    card.appendChild(id);
    card.appendChild(description);
    card.appendChild(addToCartBtn);

    return card;
}

function addToCart(product) {
    console.log(`Producto agregado al carrito: ${product.name}`);
}

let articulosCarrito = [];

const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaProductos = document.querySelector("#productos");
const productos = document.querySelectorAll(".agregar-carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carrito = document.querySelector("#carrito");
const finalizarCompra = document.querySelector("#finalizar-compra");


finalizarCompra.addEventListener('click', () => {
  
    alert('Compra Realizada con Exito!!');
    limpiarCarrito();
    articulosCarrito = [];
});


vaciarCarrito.addEventListener("click", limpiarCarrito);
carrito.addEventListener("click", eliminarProducto);
window.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  dibujarCarritoHTML();
});
function agregarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("agregar-carrito")) {
      const producto = evt.target.parentElement;
      leerDatosProducto(producto);
      alert('Agregado al carrito');
    }
  }

  function leerDatosProducto(item) {
    
    const inforProducto = {
      imagen: item.querySelector("img").src,
      titulo: item.querySelector("h2").textContent,
      precio: item.querySelector(".precioafter").textContent,
      id: item.querySelector(".id-producto").textContent,
      cantidad: 1,
    };
  
    if (articulosCarrito.some((prod) => prod.id === inforProducto.id)) {
      const productos = articulosCarrito.map((producto) => {
        if (producto.id === inforProducto.id) {
          let cantidad = parseInt(producto.cantidad);
          cantidad += 1;
          producto.cantidad = cantidad;
          
          return producto;
        } else {
          return producto;
        }
      });
      articulosCarrito = [...productos];
      
    } else {
      //articulosCarrito.push(inforProducto);
      articulosCarrito = [...articulosCarrito, inforProducto];
    }
    console.log(articulosCarrito);
    
  
    dibujarCarritoHTML();
  }
  
  function dibujarCarritoHTML() {
    limpiarCarrito();

    let total = 0; // 

    articulosCarrito.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
          <td class="tde"><img src="${producto.imagen}" width="100" /></td>
          <td class="tde">${producto.titulo}</td>
          <td class="tde">${producto.precio}</td>
          <td class="tde">${producto.cantidad}</td>
          <td class="tde"><a href="#" class="borrar-producto sacar-decoration" data-id="${producto.id}">❌</a></td>
          `;
      contenedorCarrito.appendChild(fila);
      total += parseInt(producto.precio.replace(/[^\d]/g, '')) * producto.cantidad;
    });

    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td colspan="2"></td>
        <td colspan="2" class="tdee"><strong>Total:</strong></td>
        <td class="tdee">$${total.toLocaleString()}</td>
    `;
    contenedorCarrito.appendChild(filaTotal);

    sincronizarStorage();
  }
  function limpiarCarrito() {
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      
    }
    localStorage.clear();
    
  }

  function eliminarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("borrar-producto")) {
      const producto = evt.target.parentElement.parentElement;
      const productoId = producto.querySelector("a").getAttribute("data-id");
      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== productoId
      );
      dibujarCarritoHTML();
    }
  }
  function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
  }

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    // Mostrar la notificación durante 3 segundos
    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 3000);
}