// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Biblioteca');

// Create a new document in the collection.
db.getCollection('Libros').insertOne({
    _id:1,
    Nombre_li: "El quijote de la mancha",
    Fecha_publicacion: ISODate('1615-01-16'),
    Autor: "Miguel de Cervantes",
    Editoriales:[
        {Nombre_edi:"Alfaguara",Fecha_Adaptacion:ISODate('2015-04-01')},
        {Nombre_edi:"Instituto Cervantes", Fecha_Adaptacion: ISODate('1998-01-16')},
        {Nombre_edi:"Pinguin clasico", Fecha_Adaptacion:ISODate('2015-09-16')}
    ],
    Estado: "No disponible",
    ISBN: 9788420412146,
    Num_paginas: 1128,
    Genero: "Novela",
    Ubicacion_biblio: "No disponible"
});



use()