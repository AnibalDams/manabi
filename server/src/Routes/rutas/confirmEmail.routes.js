import usuario from "../../schemas/usuario.schema";

const confirmarCorreo = async (req, res) => {
    const cuenta = await usuario.findOne({
        nombreDeUsuario: req.user.nombreDeUsuario,
    });
    const { codigo } = req.body;
    if (cuenta.activada) {
        res.json({ mensaje: "Su correo electrónico ya fue confirmado" });
    } else {
        if (cuenta.codigoDeActivacion === codigo) {
            await usuario.findByIdAndUpdate(cuenta._id, { activada: true });
            res.json({
                mensaje: "correo electrónico confirmado satisfactoriamente!",
            });
        } else {
            res.json({ codigo: "Codigo incorrecto" });
        }
    }
};

export default confirmarCorreo;
