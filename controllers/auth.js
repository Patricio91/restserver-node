const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        //Verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            });
        }

        //Verificar si el usuario está activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            });
        }

        //Verificar contraseña
        const validPassw = bcryptjs.compareSync(password, usuario.password);
        if(!validPassw){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Algo salió mal, hable con el administrador"
        })
    }
}

module.exports = {
    login
}

//Recordar tener un solo res.json en todo el controllador o flujo