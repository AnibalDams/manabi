import discusiones from "../../controllers/discusiones";

const mostrarDiscusion = async (req, res) => {
    const {discussionId} = req.params
  const mostrar = await discusiones.mostrarUnaDiscusion(discussionId)

  res.json(mostrar);
};

export default mostrarDiscusion;
