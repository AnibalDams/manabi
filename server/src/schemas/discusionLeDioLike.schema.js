import mongoose from "mongoose";
import { Schema } from "mongoose";



const esquemaDeQuienLeDioLikeALaDiscusion = new Schema({
    nombreDeUsuario: String,
    avatar: String,
    discusion: String,
  
    
});

export default mongoose.model("likeDiscusion", esquemaDeQuienLeDioLikeALaDiscusion);
