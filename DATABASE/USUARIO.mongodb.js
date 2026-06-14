// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Biblioteca');

// Create a new document in the collection.
db.getCollection('Usuarios').insertOne({
    _id:1,
    Nombre_Usu: "Yazmin acosta",
    Tipo_usu: "Publico general",
    Email: "Yasma_Champ@gmail.com",
    Estado_cuenta: "Activa",
    Telefono:[
        {Numero: "+56 961245151"},
        {Numero: "+56 961331122"}
    ],
    Fecha_regis:ISODate('2015-11-01')
});
