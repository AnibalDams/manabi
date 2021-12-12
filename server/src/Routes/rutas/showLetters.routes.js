import letras from "../../controllers/letras";

const mostrarLetras = async (req, res) => {
  const mostrar = await letras.mostrarLetras(req.user.nombreDeUsuario);

  res.json({letras:mostrar});
};

export default mostrarLetras;
