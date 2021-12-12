import mongoose from "mongoose";
import { Schema } from "mongoose";

// cada cuenta de usuario tendra las siguientes caracteristicas
const esquemaDeUsuario = new Schema({
    nombre: String,
    apellido: String,
    nombreDeUsuario: String,
    correoElectronico: String,
    contraseña: String,
    fotoDeUsuario: {
        type: String,
        default: "http://localhost:3000/img/avatar.jpg",
    },
    discapacidadVisual: Boolean, // Si o No
    cuentaCreadaHace: { type: Date, default: Date.now }, // por ejemplo: Cuenta creada hace 2 dias
    temaDeLaApp:{type:String, default:'light'}
});

export default mongoose.model("usuario", esquemaDeUsuario);
