import mongoose from "mongoose";
import { Schema } from "mongoose";


const esquemaDeQueLeDioLikeElUsuario = new Schema({
    tituloDeLaDiscusion: String,
    idDeLaDiscusion: String,
    usuarioQueLeDioLike:String,
    cuandoLeDioLike:{type:Date,default:Date.now}
  
    
});

export default mongoose.model("usuarioLike", esquemaDeQueLeDioLikeElUsuario);
