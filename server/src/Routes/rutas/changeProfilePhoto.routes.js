import cambiarFoto from "../../controllers/cambiarFotodePerfil"


const cambiarFotoDePerfil = async (req,res) =>{
    if (req.file) {
        const cambiar = await cambiarFoto(req.file.path,req.user.nombreDeUsuario)
        res.json(cambiar)
    } else {
        res.json({mensaje:'introduzca una foto por favor '})
    }
    
}


export default cambiarFotoDePerfil