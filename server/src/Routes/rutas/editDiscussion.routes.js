import discusion from "../../controllers/discusiones";

const editarUnaDiscusion = async (req, res) => {
    const { discussionId } = req.params;
    const { titulo, contenido } = req.body;
    const editar = await discusion.editarDiscusion(
        titulo,
        contenido,
        discussionId
    );
    res.json(editar);
};

export default editarUnaDiscusion;
