import {model, Schema} from 'mongoose'


const respuestaEsquema = new Schema({
    contenido: String,
    usuarioQueLaHizo: String,
    haceCuantoFueCreada: {
        type: Date,
        default: Date.now,
    },
    avatarDelUsuarioQueLaHizo: String,
    discusion:String
})


export default model('respuesta', respuestaEsquema)