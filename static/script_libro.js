const tobalapi = "/api/libros"
let actu_libro = null
const tbody = document.getElementById("tbodys")

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("boton_editar").addEventListener("click",()=>{
        EventActuali()
    })
    document.getElementById("boton_cancelar_edita").addEventListener("click",()=>{
        document.getElementById("fondo").classList.add("oculto")
    })

    document.getElementById("boton_nuevo_li").addEventListener("click",()=>{
        document.getElementById("superior").classList.remove("oculto")
    })

    document.getElementById("boton_nuevo_libro").addEventListener("click",()=>{
        añadirlibro()
    })
    
    document.getElementById("boton_cancelar_libro").addEventListener("click",()=>{
        document.getElementById("superior").classList.add("oculto")
    })
})

function nuevatabla(lista){
    tbody.innerHTML = ""
    if(lista.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">No hay libros</td></tr>`
        return
    }

    lista.forEach(l=>{
        const tr = document.createElement("tr")

        const td_Nombre = document.createElement("td")
        td_Nombre.textContent = l.Nombre_li

        const td_genero = document.createElement("td")
        td_genero.textContent = l.Genero

        const td_autor = document.createElement("td")
        td_autor.textContent = l.Autor

        const td_Estado = document.createElement("td")
        td_Estado.textContent = l.Estado

        const accion = document.createElement("td")

        const bot_editar = document.createElement("button")
        bot_editar.textContent = "Editar"
        bot_editar.addEventListener("click",()=>{abrir_actu(l._id)})

        const bot_borrar = document.createElement("button")
        bot_borrar.textContent = "Eliminar"
        bot_borrar.addEventListener("click",()=>{seguro_elim(l._id,l.Nombre_li)})

        accion.appendChild(bot_editar)
        accion.appendChild(bot_borrar)

        tr.appendChild(td_Nombre)
        tr.appendChild(td_genero)
        tr.appendChild(td_autor)
        tr.appendChild(td_Estado)
        tr.appendChild(accion)
        
        tbody.appendChild(tr)

    })
}

async function abrir_actu(id) {
    actu_libro = id
    const form = document.getElementById("fondo")

    fetch(`/api/libros/${id}`)
    .then(r=>r.json())
    .then(l=>{
        document.getElementById("nombre_editado").value = l.Nombre_li
        document.getElementById("autor_editado").value = l.Autor
        document.getElementById("editada_fecha").value = l.Fecha_publicacion
        document.getElementById("editada_estado").value =l.Estado
        document.getElementById("editada_editorial").value = l.Editoriales
        document.getElementById("editado_ISBN").value = l.ISBN
        document.getElementById("pagina_editada").value = l.Num_paginas
        document.getElementById("Ubi_biblio").value = l.Ubicacion_biblio
        document.getElementById("editado_genero").value = l.Genero
        form.classList.remove("oculto")
    })
    
}

async function EventActuali() {
    const datos ={
        Nombre_li : document.getElementById("nombre_editado").value,
        Fecha_publicacion : document.getAnimations("editada_fecha").value,
        Autor : document.getElementById("autor_editado").value,
        Editoriales : document.getElementById("editada_editorial").value,
        Estado : document.getElementById("editada_estado").value,
        ISBN : document.getElementById("editado_ISBN"),
        Num_paginas : document.getElementById("pagina_editada").value,
        Genero : document.getElementById("editado_genero").value,
        Ubicacion_biblio : document.getElementById("Ubi_biblio").value

    }
    fetch(`/api/libros/${actu_libro}`,{
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)

    })
    .then(r=> r.json())
    .then(()=>{
        cargarlibros()
        document.getElementById("fondo").classList.add("oculto")
    })
}

async function seguro_elim (id,nombre) {
    const seguro = confirm(`Esta seguro de querer borrar el libro ${nombre}`)
    if(seguro){
        eliminarLi(id)
    }
}

async function eliminarLi(id) {
    fetch(`/api/libros/${id}`,{
      method: "DELETE"
    })
    .then(()=>{
        cargarlibros()
    })

}

async function añadirlibro() {
    const estruc = document.getElementById("superior")
    const datos = {
        Nombre_li: document.getElementById("nuevo_nombre_li").value,
        Fecha_publicacion: document.getElementById("nueva_fecha").value,
        Autor : document.getElementById("nuevo_autor").value,
        Editoriales : document.getElementById("nueva_editorial").value,
        Estado: document.getElementById("nuevo_estado").value,
        ISBN: document.getElementById("nuevo_ISBN").value,
        Num_paginas : document.getElementById("pagina_nuevo").value,
        Genero : document.getElementById("Nuevo_genero").value,
        Ubicacion_biblio: document.getElementById("Ubi_biblio").value
    }

    if(!datos.Nombre_li|| !datos.Autor || !datos.Estado || !datos.Genero){
        alert("SE NECESITAN LLENAR LOS CAMPOS NECESARIOS")
        return
    }
    fetch(tobalapi,{
        method : "POST",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify(datos)
    })
    .then(r=> r.json())
    .then(()=>{
        cargarlibros()
        estruc.classList.add("oculto")
    })
}

async function cargarlibros() {
    fetch(tobalapi)
    .then(r=> r.json())
    .then(data => nuevatabla(data))
    .catch(error => console.error("error en la tabla", error) )
    
}

cargarlibros()
