import inicioYregistro from "../../controllers/inicioYregistro";
import letras from "../../controllers/letras";

const SignUp = async (req, res) => {
    const {
        nombre,
        apellido,
        nombreDeUsuario,
        correoElectronico,
        contraseña,
        discapacidadVisual,
        temaDeLaApp,
    } = req.body;

    const RegistroDeCuenta = await inicioYregistro.registro(
        nombre,
        apellido,
        nombreDeUsuario,
        correoElectronico,
        contraseña,
        discapacidadVisual,
        temaDeLaApp
    );
    await letras.crearLetra([
        {
            letra: "a",
            letraSiguiente: "e",
            dificultad: "facil",
            tipo: "letra",
            modulo1: [
                {
                    audio: "Link Del Audio",
                    titulo: "titulo",
                    descripcion: "lo que dice el audio",
                },
            ],
            modulo2: [
                {
                    audio: "Link Del Audio",
                    titulo: "titulo",
                    descripcion: "lo que dice el audio",
                },
            ],
            usuario: nombreDeUsuario,
            disponible: true,
        },
        {
            letra: "e",
            letraSiguiente: "i",
            dificultad: "facil",
            tipo: "letra",
            modulo1: {
                audio: "Link Del Audio",
                titulo: "titulo",
                contenido: "contenido",
            },

            modulo2: {
                audio: "Link Del Audio",
                titulo: "titulo",
                contenido: "contenido",
            },

            usuario: nombreDeUsuario,
        },
    ]);
    res.json(RegistroDeCuenta);
};

export default SignUp;
