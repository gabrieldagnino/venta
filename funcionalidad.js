function mostrarCarrito() {
    // 1. Obtenemos el carrito del almacenamiento local (localStorage) o iniciamos vacío
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var lista = document.getElementById("lista-carrito");
    var totalTexto = document.getElementById("total");
    var total = 0;

    lista.innerHTML = "";

    // 2. Si el carrito está vacío mostramos mensaje informativo
    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío.</p>";
        totalTexto.innerHTML = "Total a pagar: S/ 0";
        return;
    }

    // 3. Recorremos cada producto del carrito usando bucle for
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var cantidad = producto.cantidad || 1;
        var subtotal = producto.precio * cantidad;
        total = total + subtotal;

        // 4. Inyectamos el HTML dinámico con plantillas literales
        lista.innerHTML += `
            <div class="item-carrito">
                <span>${producto.nombre} - S/ ${producto.precio} x ${cantidad}</span>
                <div>
                    <button onclick="cambiarCantidad(${i}, -1)">-</button>
                    <span style="margin: 0 10px;">${cantidad}</span>
                    <button onclick="cambiarCantidad(${i}, 1)">+</button>
                    <button onclick="eliminarProducto(${i})" class="btn-eliminar">Eliminar</button>
                </div>
            </div>
        `;
    }

    totalTexto.innerHTML = "Total a pagar: S/ " + total;
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var encontrado = false;

    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            carrito[i].cantidad = (carrito[i].cantidad || 1) + 1;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para cambiar la cantidad (+ o -)
function cambiarCantidad(indice, cambio) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito[indice]) {
        carrito[indice].cantidad = (carrito[indice].cantidad || 1) + cambio;
        if (carrito[indice].cantidad <= 0) {
            carrito.splice(indice, 1);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para eliminar un producto completo
function eliminarProducto(indice) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Ejecutar al cargar la página para mostrar el carrito guardado
document.addEventListener("DOMContentLoaded", function() {
    mostrarCarrito();
});