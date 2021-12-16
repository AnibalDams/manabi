import {dataUri} from '../../config/multer'
import {uploader} from '../../config/cloudinary'

const cambiarFotoDePerfil = async (req,res) =>{
    const result = await uploader.upload(req.file.path)
    res.send(result)
}


export default cambiarFotoDePerfil