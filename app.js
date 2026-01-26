// --- CLASE TAREA (POO) Representa el objeto individual.punto e.1 ---  
class Tarea {
    constructor(nombre) {
        this.id = Date.now(); 
        this.nombre = nombre;
        this.completada = false;
    }
}

// --- CLASE GESTOR DE TAREAS (POO)  Maneja la lógica y la lista. punto e.3 ---
class GestorDeTareas {
    constructor() {
        // Inicializa cargando de LocalStorage punto g.1
        const tareasGuardadas = localStorage.getItem('misTareasNike');
        this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
        this.renderizar();
    }

    agregarTarea(nombre) {
        // Validación básica punto f.2
        if (nombre.trim() === '') {
            document.getElementById('mensaje-error').style.display = 'block';
            document.getElementById('mensaje-error').textContent = 'Por favor, escribe un nombre para el artículo.';
            return;
        }
        
        document.getElementById('mensaje-error').style.display = 'none';
        
        // Creación de instancia de clase (POO)
        const nuevaTarea = new Tarea(nombre);
        
        // Uso de métodos de array ES6 
        this.tareas.push(nuevaTarea);
        this.guardarEnLocalStorage();
        this.renderizar();
    }

    eliminarTarea(id) {
        // Uso de filter (ES6) para crear un nuevo array sin la tarea eliminada
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        this.guardarEnLocalStorage();
        this.renderizar();
    }

    editarTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            const nuevoNombre = prompt("Editar nombre del artículo:", tarea.nombre);
            if (nuevoNombre && nuevoNombre.trim() !== "") {
                tarea.nombre = nuevoNombre;
                this.guardarEnLocalStorage();
                this.renderizar();
            }
        }
    }

    toggleCompletada(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.guardarEnLocalStorage();
            this.renderizar();
        }
    }

    guardarEnLocalStorage() {
        // Persistencia de datos punto g.1
        localStorage.setItem('misTareasNike', JSON.stringify(this.tareas));
    }

    // Manipulación del DOM punto c y d 
    renderizar() {
        const lista = document.getElementById('lista-tareas');
        lista.innerHTML = ''; 

        // Uso de forEach (ES6) para recorrer tareas
        this.tareas.forEach(tarea => {
            const item = document.createElement('li');
            item.className = 'tarea-item';
            
            // Template Literals (ES6) para generar HTML dinámico punto d.1
            item.innerHTML = `
                <span class="tarea-texto ${tarea.completada ? 'tarea-completada' : ''}">
                    ${tarea.nombre}
                </span>
                <div class="acciones">
                    <button class="btn-check" onclick="gestor.toggleCompletada(${tarea.id})">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="btn-editar" onclick="gestor.editarTarea(${tarea.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-eliminar" onclick="gestor.eliminarTarea(${tarea.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            lista.appendChild(item);
        });
    }
}

// --- INICIALIZACIÓN ---
// Instanciamos el gestor
const gestor = new GestorDeTareas();

// Event Listener para el botón (Manipulación del DOM)
document.getElementById('btn-agregar').addEventListener('click', () => {
    const input = document.getElementById('input-tarea');
    gestor.agregarTarea(input.value);
    input.value = ''; // Limpiar input
});

// Permitir agregar con la tecla Enter
document.getElementById('input-tarea').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        gestor.agregarTarea(e.target.value);
        e.target.value = '';
    }
});