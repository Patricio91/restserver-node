const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarjwt, 
    validarCampos, 
    esAdmin
} = require("../middlewares");

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require("../controllers/productos")

const {
    existeProductoPorId, 
    existeCategoriaPorId
} = require("../helpers/db-validators");

const router = Router();

// api/productos  -  api/productos/:id
// GET - Obtener todos los productos
router.get("/", obtenerProductos);

// GET - Obtener un producto por ID
router.get("/:id", [
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],obtenerProducto);

// POST - Crear producto
router.post("/", [
    validarjwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

// PUT - Actualizar registro
router.put("/:id", [
    validarjwt,
    //check("categoria", "No es un ID de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],actualizarProducto);

// DELETE - Borrar producto (admin unicamente)
router.delete("/:id", [
    validarjwt,
    esAdmin,
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],borrarProducto);

module.exports = router;