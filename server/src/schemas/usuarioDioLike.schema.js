import mongoose from "mongoose";
import { Schema } from "mongoose";

// cada cuenta de usuario tendra las siguientes caracteristicas
const esquemaDeQueLeDioLikeElUsuario = new Schema({
    tituloDeLaDiscusion: String,
    UsuarioQueLaCreo: String,
    avatarDelCreador:String,
    idDeLaDiscusion: String,
    usuarioQueLeDioLike:String
  
    
});

export default mongoose.model("usuarioLike", esquemaDeQueLeDioLikeElUsuario);
