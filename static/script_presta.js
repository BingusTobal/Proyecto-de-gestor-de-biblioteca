const apitobalin = "/api/prestamos"
const tbody = document.getElementById("cuerpo")
let actulizarPre = null

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("nuevo_boton_prestamo").addEventListener("click",()=>{
        document.getElementById("top").classList.remove("oculto")
        añadir_select()
    })
    document.getElementById("crea_presta").addEventListener("click",()=>{
        añadir_prestamo()
    })

    document.getElementById("cancelar_presta").addEventListener("click",()=>{
        document.getElementById("top").classList.add("oculto")
    })

    document.getElementById("Editar_presta").addEventListener("click",()=>{
        editarPrestamo()
    })

    document.getElementById("Cancelar_presta").addEventListener("click",()=>{
        document.getElementById("Top_edi").classList.add("oculto")
    })

    cargarPrestamos()
})

function nuevatabla(lista){
    tbody.innerHTML = ""
    if(lista.length===0){
        tbody.innerHTML=`<tr><td colspan="6">No hay libros</td></tr>`
        return
    }
    lista.forEach(p=>{
        const tr = document.createElement("tr")

        const td_id = document.createElement("td")
        td_id.textContent = p._id

        const td_usu = document.createElement("td")
        td_usu.textContent = p.usuario.nombre

        const td_li = document.createElement("td")
        td_li.textContent = p.libro.titulo

        const td_estado = document.createElement("td")
        td_estado.textContent = p.estado

        const td_fecha_ini = document.createElement("td")
        const fecha = new Date(p.fechaPrestamo)
        td_fecha_ini.textContent = fecha.toLocaleDateString("es-CL")

        const td_fecha_fin = document.createElement("td")
        const fecha_fin = new Date(p.fechaDevolucion)
        td_fecha_fin.textContent = fecha_fin.toLocaleDateString("es-CL")

        const td_accion = document.createElement("td")

        const boton_edi = document.createElement("button")
        boton_edi.textContent = "Editar"
        boton_edi.addEventListener("click",()=> abrirEditar(p._id))

        const boton_cancelar = document.createElement("button")
        boton_cancelar.textContent = "Eliminar"
        boton_cancelar.addEventListener("click", ()=> seguroeliminar(p._id,p.usuario.nombre))

        td_accion.appendChild(boton_edi)
        td_accion.appendChild(boton_cancelar)

        tr.appendChild(td_id)
        tr.appendChild(td_li)
        tr.appendChild(td_usu)
        tr.appendChild(td_estado)
        tr.appendChild(td_fecha_ini)
        tr.appendChild(td_fecha_fin)
        tr.appendChild(td_accion)

        tbody.appendChild(tr)
    })
}

async function añadir_select () {

    const select_usu = document.getElementById("elegi_usua")
    select_usu.innerHTML = `<option value="">Selecciona un usuario</option>`

    const select_li = document.getElementById("elegi_li")
    select_li.innerHTML = `<option value="">Selecciona un libro</option>`

    const usuarios = await fetch("/api/usuarios").then(r => r.json())

    usuarios.forEach(u=>{
        if (u.Estado_cuenta !== "activo")
            return

        const option = document.createElement("option")
        option.value = u._id
        option.textContent = u.Nombre_Usu
        option.dataset.nombreusu = u.Nombre_Usu
        select_usu.appendChild(option)
    })

    const libro = await fetch("/api/libros").then(r => r.json())

    libro.forEach(l=>{
        if (l.Estado !== "Disponible")
            return

        const option_li = document.createElement("option")
        option_li.value = l._id
        option_li.textContent = l.Nombre_li
        option_li.dataset.nombreli = l.Nombre_li
        select_li.appendChild(option_li)
    })
}


async function añadir_prestamo() {
    const forma = document.getElementById("top")

    const select_usuarios = document.getElementById("elegi_usua")
    const opcion_usu = select_usuarios.options[select_usuarios.selectedIndex]

    const select_libros = document.getElementById("elegi_li")
    const opcionLibro = select_libros.options[select_libros.selectedIndex]


    const datos = {
        libro:{
            id_libro : opcionLibro.value,
            titulo : opcionLibro.dataset.nombreli
        },

        usuario:{
            id_usuario : opcion_usu.value,
            nombre : opcion_usu.dataset.nombreusu
        },

        estado : document.getElementById("Presta_esta").value,

        fechaPrestamo : document.getElementById("fecha_pres").value,

        fechaDevolucion : document.getElementById("fecha_term").value
    }

    if(!datos.libro.titulo || !datos.usuario.nombre){
        alert("NO SE DEBEN DEJAR ELEMENTOS VACIOS")
        return
    }
    fetch(apitobalin,{

        method : "POST",

        headers: {"Content-Type":"application/json"},

        body : JSON.stringify(datos)
    })
    .then(r => r.json())
    .then(()=>{
        cargarPrestamos()
        forma.classList.add("oculto")
    })
}

async function seguroeliminar(id, nombre) {
    const seguridad = confirm(`Esta seguro de elimnar el prestamo de codigo ${id} perteneciente a ${nombre}`)
    if(seguridad){
        borrarPresta(id)
    }
}

async function borrarPresta (id) {
    fetch(`/api/prestamos/${id}`,{
       method : "DELETE"
    })
    .then(()=>{
        cargarPrestamos()
    })
}

async function abrirEditar(id) {
    actulizarPre = id
    const forma = document.getElementById("Top_edi")

    const prestamo = await fetch(`/api/prestamos/${id}`).then(r => r.json())

    await llenarSelectsEdicion(prestamo)

    document.getElementById("Editar_estado").value = prestamo.estado
    document.getElementById("Nueva_fecha_presta").value = prestamo.fechaPrestamo
    document.getElementById("Nueva_fecha_termi").value = prestamo.fechaDevolucion
    forma.classList.remove("oculto")

}

async function llenarSelectsEdicion(prestamo) {
    const select_usu = document.getElementById("editar_usua")
    select_usu.innerHTML = `<option value="">Selecciona un usuario</option>`

    const select_li = document.getElementById("editar_li")
    select_li.innerHTML = `<option value="">Selecciona un libro</option>`

  
    const usuarios = await fetch("/api/usuarios").then(r => r.json())
    usuarios.forEach(u => {
        if (u.Estado_cuenta !== "activo") return   

        const option = document.createElement("option")
        option.value = u._id
        option.textContent = u.Nombre_Usu
        option.dataset.nombreusu = u.Nombre_Usu

        if (String(u._id) === String(prestamo.usuario.id_usuario)) {
            option.selected = true
        }

        select_usu.appendChild(option)
    })

    const libros = await fetch("/api/libros").then(r => r.json())
    libros.forEach(l => {
        const esElLibroActual = String(l._id) === String(prestamo.libro.id_libro)

        if (l.Estado !== "Disponible" && !esElLibroActual) return

        const option_li = document.createElement("option")
        option_li.value = l._id
        option_li.textContent = l.Nombre_li
        option_li.dataset.nombreli = l.Nombre_li

        if (esElLibroActual) {
            option_li.selected = true
        }

        select_li.appendChild(option_li)
    })
}

async function editarPrestamo() {
    const select_usuarios = document.getElementById("editar_usua")
    const opcion_usu = select_usuarios.options[select_usuarios.selectedIndex]

    const select_libros = document.getElementById("editar_li")
    const opcionLibro = select_libros.options[select_libros.selectedIndex]

    const datos = {
        libro: {
            id_libro: opcionLibro.value,
            titulo: opcionLibro.dataset.nombreli
        },
        usuario: {
            id_usuario: opcion_usu.value,
            nombre: opcion_usu.dataset.nombreusu
        },
        estado: document.getElementById("Editar_estado").value,
        fechaPrestamo: document.getElementById("Nueva_fecha_presta").value,
        fechaDevolucion: document.getElementById("Nueva_fecha_termi").value
    }

    if (!datos.libro.titulo || !datos.usuario.nombre) {
        alert("NO SE DEBEN DEJAR ELEMENTOS VACIOS")
        return
    }

    fetch(`/api/prestamos/${actulizarPre}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(r => r.json())
    .then(() => {
        cargarPrestamos()
        document.getElementById("Top_edi").classList.add("oculto")
    })
}


async function cargarPrestamos() {
    fetch(apitobalin)
    .then(r=>r.json())
    .then(data => nuevatabla(data))
    .catch(error=> console.error("Error al cargar los prestamos", error))
}
