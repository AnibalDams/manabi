import usuario from '../../schemas/usuario.schema'
import likesQueDioElUsuario from '../../schemas/usuarioDioLike.schema'

const perfil = async (req,res) => {
    const Usuario = await usuario.findOne({nombreDeUsuario:req.user.nombreDeUsuario})
    const Likes = await likesQueDioElUsuario.find({usuarioQueLeDioLike:req.user.nombreDeUsuario})
    res.json({usuario:Usuario, likes:Likes}) 
}


export default perfil