const { Router } = require('express');
const { check } = require('express-validator');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');

const { 
    validarjwt, 
    validarCampos, 
    esAdmin
} = require("../middlewares");
const {existeCategoriaPorId} = require("../helpers/db-validators");

const router = Router();

// api/categorias
// GET - Obtener todas las categorias
router.get("/", 
    obtenerCategorias
);

// GET - Obtener una categoria por ID
router.get("/:id",[
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// POST - Crear categoria
router.post("/", [
    validarjwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria);

// PUT - Actualizar registro
router.put("/:id", [
    validarjwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// DELETE - Borrar categoria (admin unicamente)
router.delete("/:id", [
    validarjwt,
    esAdmin,
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;