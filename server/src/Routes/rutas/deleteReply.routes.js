import discusion from "../../controllers/discusiones";

const eliminarRespuesta = async (req, res) => {
    const { replyId } = req.params;
    const eliminar = await discusion.eliminarRespuesta(replyId);

    res.json(eliminar);
};

export default eliminarRespuesta;
