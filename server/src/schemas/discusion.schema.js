import mongoose from "mongoose";
import { Schema } from "mongoose";

// cada cuenta de usuario tendra las siguientes caracteristicas
const esquemaDeDiscusiones = new Schema({
    titulo: String,
    contenido: String,
    usuarioQueLaCreo: String,
    creadaHace:{type:Date,default:Date.now},
    likes: {
        type: Number,
        default: 0,
    }
});

export default mongoose.model("discusion", esquemaDeDiscusiones);
