const APITOBAL = "/api/usuarios"
const tabla_body = document.getElementById("tbody")
let actulizarUsu = null
document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("boton_guardar").addEventListener("click", () => {
    EventoActualizar()
  })
  document.getElementById("boton_cancelar").addEventListener("click", () => {
    document.getElementById("base_fondo").classList.add("oculto")
  })

  document.getElementById("boton_insertar").addEventListener("click",()=>{
    añadir_usuario()
  })

  document.getElementById("Nuevo_boton_cancelar").addEventListener("click",()=>{
    document.getElementById("superior").classList.add("oculto")
  })

  document.getElementById("añadir").addEventListener("click",()=>{
    document.getElementById("superior").classList.remove("oculto")
  })

  cargarUsusarios()
})


function Actua_tabla(lista) {
    tabla_body.innerHTML = ""
    if (lista.length === 0) {
        tabla_body.innerHTML = `<tr><td colspan="5">No hay usuarios</td></tr>`
        return
    }

    lista.forEach(u => {
        const tr = document.createElement("tr")

        const td_nombre = document.createElement("td")
        td_nombre.textContent = u.Nombre_Usu

        const td_tipo = document.createElement("td")
        td_tipo.textContent = u.Tipo_usu

        const td_correo = document.createElement("td")
        td_correo.textContent = u.Email

        const td_estado = document.createElement("td")
        td_estado.textContent = u.Estado_cuenta

        const td_accion = document.createElement("td")

        const boton_editar = document.createElement("button")
        boton_editar.textContent = "editar"
        boton_editar.addEventListener("click", () => abrirEditar(u._id))


        const boton_eliminar = document.createElement("button")
        boton_eliminar.textContent = "eliminar"
        boton_eliminar.addEventListener("click", () => Seguridad_elim(u._id,u.Nombre_Usu))

        td_accion.appendChild(boton_editar)
        td_accion.appendChild(boton_eliminar)

        tr.appendChild(td_nombre)
        tr.appendChild(td_tipo)
        tr.appendChild(td_correo)
        tr.appendChild(td_estado)
        tr.appendChild(td_accion)

        tabla_body.appendChild(tr)
    })
}

async function abrirEditar(id) {

  actulizarUsu = id  
  const forma = document.getElementById("base_fondo")  

  fetch(`/api/usuarios/${id}`)
      .then(r => r.json())
      .then(u => {
          document.getElementById("campo_nombre").value = u.Nombre_Usu
          document.getElementById("campo_email").value  = u.Email
          document.getElementById("campo_tipo").value   = u.Tipo_usu
          document.getElementById("campo_estado").value = u.Estado_cuenta
          forma.classList.remove("oculto")
      })
}

async function EventoActualizar() { 
  const datos = {
      Nombre_Usu: document.getElementById("campo_nombre").value,
      Tipo_usu:   document.getElementById("campo_tipo").value,
      Email:  document.getElementById("campo_email").value,
      Estado_cuenta: document.getElementById("campo_estado").value
  }

  fetch(`/api/usuarios/${actulizarUsu}`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
  })
  .then(r => r.json())
  .then(() => {
      cargarUsusarios()
      document.getElementById("base_fondo").classList.add("oculto")
  })
}

async function Seguridad_elim(id,nombre) {
  const seguridad = confirm(`Se esta seguro de querer borrar a ${nombre}`)
  if(seguridad){
    Eliminar_usuario(id)

  }
}

async function Eliminar_usuario(id) {
  fetch(`/api/usuarios/${id}`,{
    method: "DELETE"
  })
  .then(()=>{
    cargarUsusarios()
  }) 
}

async function añadir_usuario() {
  const forma = document.getElementById("superior")
  const datos = {
    Nombre_Usu : document.getElementById("nuevo_nombre").value,
    Tipo_usu : document.getElementById("tipo").value,
    Email : document.getElementById("nuevo_email").value,
    Estado_cuenta : document.getElementById("Estado_tipo").value,
    Telefono: [{ Numero: document.getElementById("NumeroTelefono").value }]
  }
  if (!datos.Nombre_Usu|| !datos.Email){
    alert("El nombre y email deben ser obligatorios")
    return
  }

  fetch(APITOBAL,{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(datos)

  })
  .then(r=>r.json())
  .then(()=>{
    cargarUsusarios()
    forma.classList.add("oculto")
  })
}

async function cargarUsusarios() {
    fetch(APITOBAL)
        .then(r => r.json())
        .then(data => Actua_tabla(data))
        .catch(error => console.error("Error al cargar usuarios:", error))
}
