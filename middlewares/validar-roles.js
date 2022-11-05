const { response } = require("express");

const esAdmin = (req, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol != "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No se puede hacer esto`
        });
    }
    next();
}

const poseeRol = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }
        console.log(req.usuario.roles);
        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdmin,
    poseeRol
}