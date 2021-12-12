import discusiones from '../../controllers/discusiones'


const darleLikeALadiscusion = async (req,res) => {
    

    const like = await discusiones.darleLike(req.user.nombreDeUsuario,req.user.fotoDeUsuario,req.params.discussionId)
    res.send(like)
}

export default darleLikeALadiscusion