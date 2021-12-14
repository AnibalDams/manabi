import usuario from "../../schemas/usuario.schema";
import likesQueDioElUsuario from "../../schemas/usuarioDioLike.schema";
import letras from "../../schemas/letras.schema";
import discusion from "../../schemas/discusion.schema";
import respuestas from "../../schemas/respuestasEnUnaDiscusion.schema";
const perfil = async (req, res) => {
    const Usuario = await usuario.findOne({
        nombreDeUsuario: req.user.nombreDeUsuario,
    });
    if (Usuario) {
        const Likes = await likesQueDioElUsuario.find({
            usuarioQueLeDioLike: req.user.nombreDeUsuario,
        });
        const letrasDelUsuario = await letras.find({
            usuario: req.user.nombreDeUsuario,
        });
        const discusionesQueCreoElUsuario = await discusion.find({
            usuarioQueLaCreo: req.user.nombreDeUsuario,
        });
        const respuestasQueHizoElUsuario = await respuestas.find({
            usuarioQueLaHizo: req.user.nombreDeUsuario,
        });
        res.json({
            usuario: Usuario,
            likes: Likes,
            letras: letrasDelUsuario,
            discusiones: discusionesQueCreoElUsuario,
            respuestas: respuestasQueHizoElUsuario,
        });
    } else {
        res.json({ mensaje: "el usuario no existe" });
    }
};

export default perfil;
