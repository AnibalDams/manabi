import mongoose from "mongoose";
import { Schema } from "mongoose";

// cada cuenta de usuario tendra las siguientes caracteristicas
const esquemaDeQuienLeDioLikeALaDiscusion = new Schema({
    nombreDeUsuario: String,
    avatar: String,
    discusion: String,
  
    
});

export default mongoose.model("likeDiscusion", esquemaDeQuienLeDioLikeALaDiscusion);
