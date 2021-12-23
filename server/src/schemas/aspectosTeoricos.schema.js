import mongoose from "mongoose";
import { Schema } from "mongoose";


const esquemaDeLosAspectosTeoricos = new Schema({
    titulo: String,
    contenido: String,
    audio: String,
  
    
});

export default mongoose.model("aspectosTeoricos", esquemaDeLosAspectosTeoricos);
