async function cargarContadores() {
    const usuarios = await fetch("/api/usuarios").then(r => r.json())
    document.getElementById("contador_usuarios").textContent = usuarios.length

    const libros = await fetch("/api/libros").then(r => r.json())
    document.getElementById("contador_libros").textContent = libros.length

    const prestamos = await fetch("/api/prestamos").then(r => r.json())
    document.getElementById("contador_prestamos").textContent = prestamos.length
}

document.addEventListener("DOMContentLoaded", cargarContadores)