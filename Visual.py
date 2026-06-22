from flask import Flask, render_template, request,jsonify
from datetime import datetime
from pymongo import MongoClient


cliente = MongoClient("mongodb://localhost:27017/")

app = Flask(__name__)

db = cliente["Biblioteca"]
coleccion_user = db["Usuarios"]
coleccion_libro = db["Libros"]
coleccion_prestamos = db["Prestamo"]


def Deserie(user):
    user["_id"] = str(user["_id"])
    return user

@app.route('/')

def inicio():

    return render_template('index.html')


@app.route('/api/usuarios')

def get_usuarios():
    usuarios = list(coleccion_user.find())
    return jsonify([Deserie(u) for u in usuarios])

@app.route("/api/usuarios/<id>", methods =["GET"])

def get_UN_usuario(id):
    usuario= coleccion_user.find_one({
        "_id":int(id)})
    return jsonify(Deserie(usuario))

@app.route("/api/usuarios/<id>", methods=["PUT"])

def actuali_usuarios(id):
    datos = request.get_json()

    coleccion_user.update_one(
        {"_id":int(id)},
        {"$set":datos}
    )
    return jsonify({"mensaje":"actualizado"})

@app.route('/api/usuarios/<id>', methods = ["DELETE"])

def eliminar_usuario(id):

    coleccion_user.delete_one({"_id":int(id)})

    return jsonify({"mensaje":"eliminado"})

@app.route('/api/usuarios', methods =["POST"])

def añadir_usuario():
    datos = request.get_json()
    ultimo = coleccion_user.find_one(sort=[("_id", -1)])
    nuevo_id = (ultimo["_id"]+1) if ultimo else 1

    datos["_id"] = nuevo_id
    datos["Fecha_regis"] = datetime.now()
    coleccion_user.insert_one(datos)

    return jsonify({"mensaje":"creado","id":nuevo_id})

@app.route('/usuarios')

def usuarios():
    return render_template('Usuarios.html')

@app.route('/api/libros')

def get_libros():
    libros = list(coleccion_libro.find())
    return jsonify([Deserie(l) for l in libros])

@app.route('/api/libros/<id>', methods=["GET"])

def get_UN_libro(id):
    libro = coleccion_libro.find_one({
        "_id":int(id)})
    return jsonify(Deserie(libro))

@app.route('/api/libros/<id>', methods = ["PUT"])

def actual_libro(id):
    datos = request.get_json()
    coleccion_libro.update_one(
        {"_id":int(id)},
        {"$set":datos}
    )
    return jsonify({"mensaje":"actualizado"})

@app.route('/api/libros/<id>', methods = ["DELETE"])

def borrarLibro(id):
    coleccion_libro.delete_one({"_id":int(id)})
    return jsonify({"mensaje":"Eliminado"})

@app.route('/api/libros', methods = ["POST"])

def añadirLibro():
    datos = request.get_json()
    ultimo = coleccion_libro.find_one(sort=[("_id", -1)])
    nuevo_id = (ultimo["_id"]+1) if ultimo else 1

    datos["_id"] = nuevo_id

    coleccion_libro.insert_one(datos)
    return jsonify({"mensaje":"registrado","id":nuevo_id})

@app.route('/libros')

def libros():
    return render_template("Libros.html")



@app.route('/prestamos')

def prestamos():
    return render_template("prestamos.html")


@app.route("/api/prestamos")

def cargarPrestamos():
    prestamos = list(coleccion_prestamos.find())
    return jsonify([Deserie(p) for p in prestamos])

@app.route("/api/prestamos", methods = ["POST"])

def añadirPrestamo():
    datos = request.get_json()


    ultimo = coleccion_prestamos.find_one(sort =[("_id",-1)])
    nuevo_id = (ultimo["_id"]+1) if ultimo else 1

    datos["_id"] = nuevo_id

    coleccion_prestamos.insert_one(datos)
    return jsonify({"mensaje":"prestamo añadido","id":nuevo_id})


@app.route("/api/prestamos/<id>", methods = ["DELETE"])

def borrarPrestamo(id):
    coleccion_prestamos.delete_one({"_id":int(id)})
    return jsonify({"mensaje":"Eliminado"})

@app.route("/api/prestamos/<id>", methods = ["GET"])

def get_UN_prestamo(id):
    prestamo = coleccion_prestamos.find_one({
        "_id":int(id)})
    return jsonify(Deserie(prestamo))

@app.route("/api/prestamos/<id>", methods = ["PUT"])

def Actuali_presta(id):
    datos = request.get_json()

    coleccion_prestamos.update_one(
        {"_id":int(id)},
        {"$set":datos}
    )
    return jsonify({"mensaje":"actualizado"})
app.run(debug=True)