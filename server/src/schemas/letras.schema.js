import mongoose from "mongoose";
import { Schema } from "mongoose";

const esquemasDeLetras = new Schema({
    letra: String,
    letraSiguiente: String,
    tipo: String,
    dificultad:String,
    modulo1: 
        {
            audio: String,
            titulo: String,
            contenido: String,
        },
    
    modulo2: 
        {
            audio: String,
            titulo: String,
            contenido: String,
        },
    
    usuario: String,
    leccionesCompletadas: {
        type: Number,
        max: 4,
        default: 0,
    },
    completado: {
        type: Boolean,
        default: false,
    },
    disponible: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("letras", esquemasDeLetras);
