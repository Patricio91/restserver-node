const {response} = require("express");
const {Usuario, Categoria, Producto} = require("../models");
const {ObjectId} = require("mongoose").Types;

const coleccionesPermitidas = [
    "usuarios",
    "categorias",
    "productos",
    "roles"
];

const buscarUsuarios = async(termino = "", res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }
}

const buscar = (req, res = response) => {
    const {coleccion, termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(404).json({
            msg: `Las colecciones permitidas para utilizar son: ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case "usuarios":
            buscarUsuarios(termino, res);
        break;

        case "categorias":
        break;

        case "productos":
        break;

        default:
            res.status(500).json({
                msg: "Busqueda pendiente de hacer (500 Server Error)"
            })
    }
}

module.exports = {
    buscar
}