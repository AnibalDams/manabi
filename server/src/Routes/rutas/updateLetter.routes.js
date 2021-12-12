import letras from "../../controllers/letras";

const actualizarLetra = async (req, res) => {
  
  
  const actualizar = await letras.actualizarEstadoDeLasLetras(req.user.nombreDeUsuario, req.params.letra);

  res.json(actualizar);
};

export default actualizarLetra;
