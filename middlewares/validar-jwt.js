const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarjwt = async(req = request, res = response, next) => {
    const token = req.header("x-apikey");
    if (!token) {
        return res.status(401).json({
            msg: "No existe token en la peticion"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido / usuario no existente"
            })
        }
        //Verificar si uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no válido / uid false"
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validarjwt
}