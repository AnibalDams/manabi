import usuario from "../schemas/usuario.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import enviarEmail from "./mandarEmail";
//objeto que qdentro tiene dos funciones que son las encargadas de registrar a los usuarios y logearlos
const inicioDeSesionYregistro = {
    async registro(
        nombre,
        apellido,
        nombreDeUsuario,
        correoElectronico,
        contraseña,
        discapacidadVisual,
        temaDeLaApp
        
    ) {
        const contraseñaEncriptada = await bcrypt.hash(contraseña,10);
        let codigoDeActivacionNumero = Math.floor(100000 + Math.random() * 900000)
        let codigoDeActivacion = codigoDeActivacionNumero.toString()
        const Usuario = new usuario({
            nombre: nombre,
            apellido: apellido,
            nombreDeUsuario: nombreDeUsuario,
            correoElectronico: correoElectronico,
            contraseña: contraseñaEncriptada,
            codigoDeActivacion:codigoDeActivacion,
            discapacidadVisual: discapacidadVisual,
            temaDeLaApp:temaDeLaApp
        });
        const existeNombreDeUsuario = await usuario.findOne({
            nombreDeUsuario: nombreDeUsuario,
        });
        const existeCorreoElectronico = await usuario.findOne({
            correoElectronico: correoElectronico,
        });

        if (existeNombreDeUsuario) {
            if (existeCorreoElectronico) {
                return { mensaje: "correo y usuario ya en uso" };
            } else {
                return {
                    mensaje:
                        "El nombre de usuario que ingresaste ya esta en uso",
                };
            }
        } else {
            if (existeCorreoElectronico) {
                return {
                    mensaje: "Ya existe una cuenta con este correo electronico",
                };
            } else {
                await Usuario.save();
                enviarEmail(correoElectronico,codigoDeActivacion,'activacion',nombre,apellido)
                return Usuario;
            }
        }
    },
    async login(nombreDeUsuario, contraseña) {
        const hayUsuario = await usuario.findOne({ nombreDeUsuario });
        if (hayUsuario) {
            const contraseñaConcuerdan = await bcrypt.compare(
                contraseña,
                hayUsuario.contraseña
            );
            if (contraseñaConcuerdan) {
                const token = jwt.sign(
                    {
                        _id: hayUsuario._id,
                        nombre: hayUsuario.nombre,
                        apellido: hayUsuario.apellido,
                        fotoDeUsuario: hayUsuario.fotoDeUsuario,
                        nombreDeUsuario: hayUsuario.nombreDeUsuario,
                        activa:hayUsuario.activa,
                        correoElectronico: hayUsuario.correoElectronico,
                    },
                    process.env.JWTKEY
                );
                return {
                    mensaje: `Bienvenido ${hayUsuario.nombre} ${hayUsuario.apellido}`,
                    token: token,
                };
            } else {
                return { mensaje: "contraseña incorrecta" };
            }
        } else {
            return { mensaje: "usuario incorrecto" };
        }
    },
};

export default inicioDeSesionYregistro;
