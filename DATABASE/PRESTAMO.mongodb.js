// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Biblioteca');

// Create a new document in the collection.
db.getCollection('Prestamo').insertOne({
    _id: 1,
    libro: {
        id_libro: 1,
        titulo: "El Quijote de la Mancha"
    },
    usuario: {
        id_usuario: 1,
        nombre: "Yazmin Acosta"
    },
    estado: "Activo",

    fechaPrestamo: ISODate("2026-03-21"),
    fechaDevolucion: ISODate("2026-06-21")
});
