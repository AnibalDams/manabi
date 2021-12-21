import usuario from "../schemas/usuario.schema";
import usuarioDioLike from "../schemas/usuarioDioLike.schema";
import likeDiscusion from "../schemas/discusionLeDioLike.schema";
import respuestas from "../schemas/respuestasEnUnaDiscusion.schema";
import discusiones from "../schemas/discusion.schema";
import letras from "../schemas/letras.schema";
import bcrypt from "bcrypt";

const actualizarPerfil = async (
    nombreDeUsuarioAnterior,
    nombreDeUsuarioNuevo,
    nombreNuevo,
    apellidoNuevo,
    contraseña,
    contraseñaNueva
) => {
    try {
        const correoConfirmado = await usuario.findOne({
            nombreDeUsuario: nombreDeUsuarioAnterior,
        });
        if (!correoConfirmado.activada) {
            return {
                mensaje:
                    "Para actualizar los datos de la cuenta, necesitas primero confirmar el correo electronico",
            };
        } else {
            const existeNombreDeUsuario = await usuario.findOne({
                nombreDeUsuario: nombreDeUsuarioNuevo,
            });
            if (existeNombreDeUsuario) {
                return {
                    mensaje: "Este nombre de usuario ya está en uso",
                };
            } else {
                const contraseñaEncriptada = await bcrypt.hash(contraseñaNueva, 10);
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
                // actualizo todos los registros de la actividad que haya hecho el usuario
    
                const likesDelUsuario = await usuarioDioLike.find({
                    usuarioQueLeDioLike: nombreDeUsuarioAnterior,
                });
                const discusionesALasQueLeDioLike = await likeDiscusion.find({
                    nombreDeUsuario: nombreDeUsuarioAnterior,
                });
                const respuestasQueHizo = await respuestas.find({
                    usuarioQueLaHizo: nombreDeUsuarioAnterior,
                });
                const discusionesQueCreo = await discusiones.find({
                    usuarioQueLaCreo: nombreDeUsuarioAnterior,
                });
                const letrasDelUsuario = await letras.find({
                    usuario: nombreDeUsuarioAnterior,
                });
                letrasDelUsuario.forEach(async (el) => {
                    await letras.findByIdAndUpdate(el._id, {
                        usuario: nombreDeUsuarioNuevo,
                    });
                });
                discusionesQueCreo.forEach(async (el) => {
                    await discusiones.findByIdAndUpdate(el._id, {
                        usuarioQueLaCreo: nombreDeUsuarioNuevo,
                    });
                });
                respuestasQueHizo.forEach(async (el) => {
                    await respuestas.findByIdAndUpdate(el._id, {
                        usuarioQueLaHizo: nombreDeUsuarioNuevo,
                    });
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
        }
    } catch (error) {
        console.error(error)
        return error
    }
};

export default actualizarPerfil;
