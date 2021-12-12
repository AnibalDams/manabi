import discusion from "../../controllers/discusiones";

const editarUnaRespuesta = async (req, res) => {
    const { replyId } = req.params;
    const { contenido } = req.body;
    const editar = await discusion.editarRespuesta(contenido, replyId);
    res.json(editar);
};

export default editarUnaRespuesta;
