import discusion from "../schemas/discusion.schema";
import usuario from "../schemas/usuario.schema";
import discusionLikeadaPor from "../schemas/discusionLeDioLike.schema";
import usuarioDioLikeA from "../schemas/usuarioDioLike.schema";
import respuestas from "../schemas/respuestasEnUnaDiscusion.schema";

const discusionesFuncs = {
    async crear(titulo, contenido, usuarioQueLaCreo) {
        const discusionNueva = new discusion({
            titulo,
            contenido,
            usuarioQueLaCreo,
        });
        await discusionNueva.save();
        return {
            discusion: discusionNueva,
        };
    },
    async darleLike(nombreDeUsuario, avatar, idDeLaDiscusion) {
        const discusionEntera = await discusion.findById(idDeLaDiscusion);
        const elUsuarioLeDioLike = await usuarioDioLikeA.findOne({
            idDeLaDiscusion,
            usuarioQueLeDioLike: nombreDeUsuario,
        });

        if (!elUsuarioLeDioLike) {
            const creadorDeLaDiscusion = await usuario.findOne({
                nombreDeUsuario: discusionEntera.usuarioQueLaCreo,
            });
            const discusioLikedaPorElUsuario = new discusionLikeadaPor({
                nombreDeUsuario,
                avatar,
                discusion: idDeLaDiscusion,
            });
            const usuarioLeDioLike = new usuarioDioLikeA({
                tituloDeLaDiscusion: discusionEntera.titulo,
                UsuarioQueLaCreo: discusionEntera.usuarioQueLaCreo,
                avatarDelCreador: creadorDeLaDiscusion.fotoDeUsuario,
                idDeLaDiscusion,
                usuarioQueLeDioLike: nombreDeUsuario,
            });

            await discusion.findByIdAndUpdate(idDeLaDiscusion, {
                $inc: {
                    likes: 1,
                },
            });
            await discusioLikedaPorElUsuario.save();
            await usuarioLeDioLike.save();

            return {
                mensaje: "liked",
            };
        } else {
            await discusion.findByIdAndUpdate(idDeLaDiscusion, {
                $inc: {
                    likes: -1,
                },
            });
            await discusionLikeadaPor.findOneAndRemove({
                nombreDeUsuario,
                discusion: idDeLaDiscusion,
            });
            await usuarioDioLikeA.findOneAndRemove({
                idDeLaDiscusion,
                usuarioQueLeDioLike: nombreDeUsuario,
            });
            return {
                mensaje: "se quito el like satisfactoriamente",
            };
        }
    },
    async mostrarDiscusiones() {
        const discusiones = await discusion.find();
        if (discusiones) {
            return {
                discusiones: discusiones,
            };            
        }else{
            return{
                mensaje:'No se han creado discusiones aun'
            }
        }

    },
    async mostrarUnaDiscusion(id) {
        const unaDiscusion = await discusion.findById(id);
        const likesDeLaDiscusion = await discusionLikeadaPor.find({
            discusion: id,
        });
        const respuestasDeLaDiscusion = await respuestas.find({
            discusion: id,
        });
        if(unaDiscusion){
            return {
                discusion: unaDiscusion,
                likeadaPor: likesDeLaDiscusion,
                respuestas: respuestasDeLaDiscusion,
            };
        }else{
            return {mensaje:'esta discusion no existe o fue eliminada'}
        }
        
    },

    async editarDiscusion(titulo, contenido, idDeLaDiscusion) {
        await discusion.findByIdAndUpdate(idDeLaDiscusion, {
            titulo,
            contenido,
        });
        return {
            mensaje: "actualizado satisfactoriamente",
        };
    },

    async eliminarDiscusion(idDeLaDiscusion) {


        await discusion.findByIdAndRemove(idDeLaDiscusion);

        return {
            mensaje: `La discusión se elimino completamente`,
        };
    },
    async responder(contenido, usuario, avatarDelUsuario, discusion) {
        const respuesta = new respuestas({
            contenido,
            usuarioQueLaHizo: usuario,
            avatarDelUsuarioQueLaHizo: avatarDelUsuario,
            discusion,
        });
        await respuesta.save();
        return {
            mensaje: "respuesta creada satisfactoriamente",
            respuesta: respuesta,
        };
    },
    async editarRespuesta(contenido, idDeLaRespuesta) {
        await respuestas.findByIdAndUpdate(idDeLaRespuesta, {
            contenido,
        });
        return {
            mensaje: "Respuesta editada satisfactoriamente",
        };
    },
    async eliminarRespuesta(idDeLaRespuesta) {
        await respuestas.findByIdAndRemove(idDeLaRespuesta);
        return {
            mensaje: "Respuesta eliminada satifactoriamente",
        };
    },
};

export default discusionesFuncs;
