import letras from "../../controllers/letras";

const nuevaLetra = async (req, res) => {
  const crearLetra = await letras.crearLetra(req.body);

  res.json(crearLetra);
};

export default nuevaLetra;
