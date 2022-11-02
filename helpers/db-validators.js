const Role = require('../models/role');
const {Usuario, Categoria} = require('../models');
const mongoose = require("mongoose");

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {

    //verificar email
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id del usuario no existe ${id}`);
    }
}

// Validadores de categoria
const existeCategoriaPorId = async(id) => {
    // Verificar si es un Mongo ID Valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No es un id de Mongo válido`);
    }
    
    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}

