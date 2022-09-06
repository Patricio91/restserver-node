const {Router} = require("express");
const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch} = require("../controllers/usuarios");
const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/:id', [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;