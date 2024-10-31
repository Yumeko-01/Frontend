
// Mostrar bicicletas en la tabla
function mostrarBicicletas() {
    let request = sendRequest('bicicletas', 'GET', '');
    let table = document.getElementById('bicicletas-table');
    table.innerHTML = "";
    request.onload = function() {
        let data = request.response;
        data.forEach(element => {
            table.innerHTML += `
            <tr>
                <td>${element.marca}</td>
                <td>${element.modelo}</td>
                <td>${element.precio}</td>
                <td>${element.tipo}</td>
                <td>${element.color || 'N/A'}</td>
                <td>${element.año || 'N/A'}</td>
                <td>
                    <button class="btn btn-primary" onclick='window.location = "formBicicletas.html?id=${element._id}"'>Editar</button>
                    <button class="btn btn-danger" onclick='deleteBicicleta("${element._id}")'>Eliminar</button>
                </td>
            </tr>
            `;
        });
    }
}

// Guardar bicicleta
function guardarBicicleta() {
    const data = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        precio: document.getElementById('precio').value,
        tipo: document.getElementById('tipo').value,
        color: document.getElementById('color').value,
        año: document.getElementById('año').value
    };
    let request = sendRequest('bicicletas', 'POST', data);
    request.onload = function() {
        window.location = 'bicicletas.html';
    }
}

// Cargar datos de bicicleta para editar
function cargarDatos(id) {
    let request = sendRequest(`bicicletas/${id}`, 'GET', '');
    request.onload = function() {
        const data = request.response;
        document.getElementById('marca').value = data.marca;
        document.getElementById('modelo').value = data.modelo;
        document.getElementById('precio').value = data.precio;
        document.getElementById('tipo').value = data.tipo;
        document.getElementById('color').value = data.color;
        document.getElementById('año').value = data.año;
    }
}

// Modificar bicicleta
function modificarBicicleta(id) {
    const data = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        precio: document.getElementById('precio').value,
        tipo: document.getElementById('tipo').value,
        color: document.getElementById('color').value,
        año: document.getElementById('año').value
    };
    let request = sendRequest(`bicicletas/${id}`, 'PUT', data);
    request.onload = function() {
        window.location = 'bicicletas.html';
    }
}

// Eliminar bicicleta
function deleteBicicleta(id) {
    let request = sendRequest(`bicicletas/${id}`, 'DELETE', '');
    request.onload = function() {
        mostrarBicicletas();
    }
}

