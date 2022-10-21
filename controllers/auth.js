const {response} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generar-jwt");
const {googleVerify} = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const {correo, password} = req.body;

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

const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});

        if (!usuario){
            //Crear user
            const data = {
                nombre,
                correo,
                password: ":)",
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // Verificar el user en la DB
        if(!usuario.estado) {
            return res.status(401).json({
                msg: "Hable con el administrador. Usuario bloqueado"
            });
        }

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: "El token no se pudo verificar"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}

//Recordar tener un solo res.json en todo el controllador o flujo