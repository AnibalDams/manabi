import { Router } from "express";
import autenticacionConJwt from "../controllers/autenticacion";
import rutaDeRegistro from "./rutas/signUp.routes";
import rutaDeLogeo from "./rutas/login.routes";
import rutaDePerfil from "./rutas/profile.routes";
import rutaParaCrearLetra from "./rutas/newLetter.routes";
import rutaParaMostrarLetras from "./rutas/showLetters.routes";
import rutaParaMostrarLetra from "./rutas/showLetter.routes";
import rutaParaActualizarLetra from "./rutas/updateLetter.routes";
import rutaParaCrearDiscusiones from "./rutas/newDiscuss.routes";
import rutaParaDaleLikeADiscusiones from "./rutas/likeDiscuss.routes";
import rutaParaMostrarLasDiscusiones from "./rutas/findDiscussion.routes";
import rutaParaMostrarUnaDiscusion from "./rutas/findOneDiscussion.routes";
import rutaparaEditarUnaDiscusion from "./rutas/editDiscussion.routes";
import rutaParaEliminarUnaDiscusion from "./rutas/deleteDiscussion.routes";
import rutaParaResponderUnaDiscusion from "./rutas/replyDiscussion.routes";
import rutaParaEditarUnaRespuesta from "./rutas/editReply.routes";
import rutaParaEliminarUnaRespuesta from "./rutas/deleteReply.routes";
import rutaParaBuscarUsuarios from "./rutas/searchUser.routes";
import rutaParaActualizarElPerfil from './rutas/updateProfile.routes'

//importaciones para las rutas de pruebas
import letras from "../schemas/letras.schema";
import discusion from "../schemas/discusion.schema";
import quienLeDioLikeALaDiscusion from "../schemas/discusionLeDioLike.schema";
import usuarioDioLike from "../schemas/usuarioDioLike.schema";

const router = Router();

// Rutas GET
router.get("/", autenticacionConJwt, (req, res) => {
    res.send(`Hola ${req.user.nombre} ${req.user.apellido}`);
});
router.get("/letras/todas", autenticacionConJwt, rutaParaMostrarLetras);
router.get("/letras/:letra", autenticacionConJwt, rutaParaMostrarLetra);
router.get(
    "/discusion/mostrar",
    autenticacionConJwt,
    rutaParaMostrarLasDiscusiones
);

router.get(
    "/discusion/:discussionId",
    autenticacionConJwt,
    rutaParaMostrarUnaDiscusion
);
router.get("/usuario/perfil", autenticacionConJwt, rutaDePerfil);
router.get("/:username", autenticacionConJwt, rutaParaBuscarUsuarios);

// Rutas POST

router.post("/signup", rutaDeRegistro);
router.post("/login", rutaDeLogeo);
router.post("/letras/nueva", autenticacionConJwt, rutaParaCrearLetra);
router.post("/discusion/nueva", autenticacionConJwt, rutaParaCrearDiscusiones);
router.post(
    "/discusion/:discussionId/responder",
    autenticacionConJwt,
    rutaParaResponderUnaDiscusion
);

// Rutas PUT
router.put(
    "/letras/:letra/actualizar",
    autenticacionConJwt,
    rutaParaActualizarLetra
);

router.put(
    "/discusion/:discussionId/like",
    autenticacionConJwt,
    rutaParaDaleLikeADiscusiones
);
router.put(
    "/discusion/:discussionId/editar",
    autenticacionConJwt,
    rutaparaEditarUnaDiscusion
);
router.put(
    "/discusion/respuestas/:replyId",
    autenticacionConJwt,
    rutaParaEditarUnaRespuesta
);
router.put('/usuario/perfil/actualizar',autenticacionConJwt,rutaParaActualizarElPerfil)

// Rutas DELETE

router.delete(
    "/discusion/:discussionId/eliminar",
    autenticacionConJwt,
    rutaParaEliminarUnaDiscusion
);
router.delete(
    "/discusion/respuesta/:replyId",
    autenticacionConJwt,
    rutaParaEliminarUnaRespuesta
);

// rutas de pruebas
router.post("/prueba", (req, res) => {
    res.json(req.file);
});
router.post("/prueba2", async (req, res) => {
    let letra = await letras.findOne({ letra: "B", usuario: "anibalDams" });

    letra.modulo1.push({
        audio: "audopaf",
        titulo: "fhdsihg",
        descripcion: "fjfjaofhs",
    });
    await letra.save();
    res.send("hola");
});
router.get("/prueba3", async (req, res) => {
    const Discusion = await discusion.findById("619aa941165bae155d2e8382");
    res.json(Discusion);
});
router.get("/prueba4", async (req, res) => {
    const likes = await quienLeDioLikeALaDiscusion.find();
    const usuarioLike = await usuarioDioLike.find();
    res.json({ likes: likes, usuario: usuarioLike });
});

export default router;
