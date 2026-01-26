// --- CLASE TAREA (POO) ---
// Representa el objeto individual. Cumple el punto e.1
class Tarea {
    constructor(nombre) {
        this.id = Date.now(); // ID único basado en el tiempo
        this.nombre = nombre;
        this.completada = false;
    }
}

// --- CLASE GESTOR DE TAREAS (POO) ---
// Maneja la lógica y la lista. Cumple el punto e.3
class GestorDeTareas {
    constructor() {
        // Inicializa cargando de LocalStorage (Punto g.1 - Desafío)
        const tareasGuardadas = localStorage.getItem('misTareasNike');
        this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
        this.renderizar();
    }

    agregarTarea(nombre) {
        // Validación básica (Punto f.2)
        if (nombre.trim() === '') {
            document.getElementById('mensaje-error').style.display = 'block';
            document.getElementById('mensaje-error').textContent = 'Por favor, escribe un nombre para el artículo.';
            return;
        }
        
        document.getElementById('mensaje-error').style.display = 'none';
        
        // Creación de instancia de clase (POO)
        const nuevaTarea = new Tarea(nombre);
        
        // Uso de métodos de array ES6 (push)
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
        // Encontrar la tarea
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            // Prompt sencillo para editar
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
        // Persistencia de datos (Desafío g.1)
        localStorage.setItem('misTareasNike', JSON.stringify(this.tareas));
    }

    // Manipulación del DOM (Punto c y d)
    renderizar() {
        const lista = document.getElementById('lista-tareas');
        lista.innerHTML = ''; // Limpiar lista antes de renderizar

        // Uso de forEach (ES6) para recorrer tareas
        this.tareas.forEach(tarea => {
            const item = document.createElement('li');
            item.className = 'tarea-item';
            
            // Template Literals (ES6) para generar HTML dinámico (Punto d.1)
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