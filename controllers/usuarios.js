const {response, request} = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {validationResult} = require("express-validator");

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = "No name", apikey, page = 1, limit} = req.query;
    res.json({
        msg: "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async (req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encrypt the password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Save in DB
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} =req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "put API - controllers",
        usuario
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - controllers"
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch API"
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}