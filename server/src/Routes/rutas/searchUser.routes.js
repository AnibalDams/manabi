import usuarios from "../../schemas/usuario.schema";
import letras from "../../schemas/letras.schema";
import discusiones from '../../schemas/discusion.schema'

const buscarUsuario = async (req, res) => {
    const { username } = req.params;
    const usuario = await usuarios.findOne({ nombreDeUsuario: username });

    if (usuario) {
        const letrasDelUsuario = await letras.find({ usuario: username });
        const discusionesDelUsuario = await discusiones.find({usuarioQueLaCreo:username})
        res.json({ usuario: usuario, letras: letrasDelUsuario,discusiones:discusionesDelUsuario });
    } else {
        res.json({ mensaje: "este usuario no existe" });
    }
};

export default buscarUsuario;
