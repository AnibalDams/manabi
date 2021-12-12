import discusiones from "../../controllers/discusiones";

const mostrarDiscusiones = async (req, res) => {
  const mostrar = await discusiones.mostrarDiscusiones()

  res.json(mostrar);
};

export default mostrarDiscusiones;
