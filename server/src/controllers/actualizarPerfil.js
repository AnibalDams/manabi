import usuario from "../schemas/usuario.schema";
import usuarioDioLike from "../schemas/usuarioDioLike.schema";
import likeDiscusion from "../schemas/discusionLeDioLike.schema";
import bcrypt from "bcrypt";

const actualizarPerfil = async (
    nombreDeUsuarioAnterior,
    nombreDeUsuarioNuevo,
    nombreNuevo,
    apellidoNuevo,
    contraseña,
    contraseñaNueva
) => {
    const existeNombreDeUsuario = await usuario.findOne({
        nombreDeUsuario: nombreDeUsuarioNuevo,
    });
    if (existeNombreDeUsuario) {
        return {
            mensaje: "Este nombre de usuario ya está en uso",
        };
    } else {
        const contraseñaEncriptada = await bcrypt.hash(contraseñaNueva,10);
        await usuario.findOneAndUpdate(
            {
                nombreDeUsuario: nombreDeUsuarioAnterior,
            },
            {
                nombreDeUsuario: nombreDeUsuarioNuevo,
                nombre: nombreNuevo,
                apellido: apellidoNuevo,
                contraseña: contraseñaEncriptada,
            }
        );
        const likesDelUsuario = await usuarioDioLike.find({
            usuarioQueLeDioLike: nombreDeUsuarioAnterior,
        });
        const discusionesALasQueLeDioLike = await likeDiscusion.find({
            nombreDeUsuario: nombreDeUsuarioAnterior,
        });
        discusionesALasQueLeDioLike.forEach(async (el) => {
            await likeDiscusion.findByIdAndUpdate(el._id, {
                nombreDeUsuario: nombreDeUsuarioNuevo,
            });
        });
        likesDelUsuario.forEach(async (el) => {
            await usuarioDioLike.findByIdAndUpdate(el._id, {
                usuarioQueLeDioLike: nombreDeUsuarioNuevo,
            });
        });

        return {
            mensaje: "Usuario actualizado satisfactoriamente",
            
        };
    }
};

export default actualizarPerfil;
