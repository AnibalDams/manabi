import actualizarPerfil from "../../controllers/actualizarPerfil"



const cambiarDatos = async (req,res) => {
 const {nombre,apellido,nombreDeUsuario,contraseña} = req.body 
    const cambiar = await actualizarPerfil(req.user.nombreDeUsuario,nombreDeUsuario,nombre,apellido, req.user.contraseña,contraseña)
    res.json(cambiar)
}


export default cambiarDatos