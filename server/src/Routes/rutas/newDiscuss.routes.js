import discusiones from '../../controllers/discusiones'


const nuevaDiscusion = async (req,res) => {
    const {titulo,contenido } = req.body

    const crearDiscusion  = await discusiones.crear(titulo,contenido,req.user.nombreDeUsuario)
    res.json(crearDiscusion)
}

export default nuevaDiscusion