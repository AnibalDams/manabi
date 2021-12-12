import discusion from "../../controllers/discusiones";

const eliminarDiscusion = async (req, res) => {
    const { discussionId } = req.params;
    const eliminar = await discusion.eliminarDiscusion(discussionId);
    res.json(eliminar);
};

export default eliminarDiscusion;
