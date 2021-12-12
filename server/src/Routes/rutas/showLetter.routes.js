import letras from "../../controllers/letras";

const mostrarLetra = async (req, res) => {
  const mostrar = await letras.mostrarLetra(req.user.nombreDeUsuario, req.params.letra);

  res.json({letra:mostrar});
};

export default mostrarLetra;
