import discusion from "../../controllers/discusiones";

const crearRespuesta = async (req, res) => {
    const { discussionId } = req.params;
    const { contenido } = req.body;
    const respuesta = await discusion.responder(
        contenido,
        req.user.nombreDeUsuario,
        req.user.fotoDeUsuario,
        discussionId
    );
    res.json(respuesta);
};

export default crearRespuesta;
