import {uploader} from '../config/cloudinary'
import usuario from '../schemas/usuario.schema'
import likesEnDiscusiones from '../schemas/discusionLeDioLike.schema'
import respuestas from '../schemas/respuestasEnUnaDiscusion.schema'

const cambiarFoto = async (direccion,nombreDeUsuario) => {
    try {
        const subir = await uploader.upload(direccion)
        await usuario.findOneAndUpdate({nombreDeUsuario},{fotoDeUsuario:subir.url})
        const likesEnLasDiscusiones = await likesEnDiscusiones.find({nombreDeUsuario})
        const respuestasDelUsuario = await respuestas.find({usuarioQueLaHizo:nombreDeUsuario})
        likesEnLasDiscusiones.forEach(async(el)=>{
            await likesEnDiscusiones.findByIdAndUpdate(el._id,{avatar:subir.url})
        })
        respuestasDelUsuario.forEach(async(el)=>{
            await respuestas.findByIdAndUpdate(el._id,{avatarDelUsuarioQueLaHizo:subir.url})

        })
		return {mensaje:'la foto de perfil fue actualizada satisfatoriamente'}
    } catch (error) {
        console.error(error)
        return error
    }
}

export default cambiarFoto
