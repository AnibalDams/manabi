import mongoose from "mongoose";
import { Schema } from "mongoose";

// cada cuenta de usuario tendra las siguientes caracteristicas
const esquemaDeUsuario = new Schema({
    nombre: {type:String,required:true},
    apellido: {type:String,required:true},
    nombreDeUsuario: {type:String,required:true},
    correoElectronico: {type:String,required:true},
    contraseña: {type:String,required:true},
    fotoDeUsuario: {
        type: String,
        default: "http://localhost:3000/img/avatar.jpg",
    },
    codigoDeActivacion:{type:String,required:true},
    codigoDeInicioSeguro:{type:String,default:0},
    activada:{type:Boolean, default:false},
    inicioSeguroActivado:{type:Boolean,default:false},
    discapacidadVisual: Boolean, // Si o No
    cuentaCreadaHace: { type: Date, default: Date.now }, // por ejemplo: Cuenta creada hace 2 dias
    temaDeLaApp:{type:String, default:'light'}
});

export default mongoose.model("usuario", esquemaDeUsuario);
