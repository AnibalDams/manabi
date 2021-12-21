import letra from "../schemas/letras.schema";

//objeto que dentro de el conterndra todas las funciones relacionadas a las letras
const letras = {
    async crearLetra(objetoDeLetra) {
        await letra.insertMany(objetoDeLetra);

        return {
            mensaje: "letra creada",
        };
    },
    async mostrarLetras(nombreDeUsuario) {
        const letras = await letra.find({
            usuario: nombreDeUsuario,
        });
        return letras;
    },
    async mostrarLetra(nombreDeUsuario, Letra) {
        const letraU = await letra.findOne({
            usuario: nombreDeUsuario,
            letra: Letra,
        });
        return letraU;
    },
    //en esta funcion es donde se gestiona la progresion de la aplicacion por ejemplo que cuando complete la letra A se desbloquee la letra B y asi sucesivamente
    async actualizarEstadoDeLasLetras(nombreDeUsuario, Letra) {
        const letraU = await letra.findOne({
            usuario: nombreDeUsuario,
            letra: Letra,
        });
        if (letraU.completado == false) {
            if (letraU.leccionesCompletadas === 2) {
                await letra.findOneAndUpdate(
                    {
                        usuario: nombreDeUsuario,
                        letra: Letra,
                    },
                    {
                        completado: true,
                    }
                );
                await letra.findOneAndUpdate(
                    {
                        usuario: nombreDeUsuario,
                        letra: letraU.letraSiguiente,
                    },
                    {
                        disponible: true,
                    }
                );
                return {
                    mensaje:
                        "letra actualizada y se ha desbloquedo la siguientes",
                };
            } else {
                await letra.findByIdAndUpdate(letraU._id, {
                    $inc: {
                        leccionesCompletadas: 1,
                    },
                });
                return {
                    mensaje: "letra actualizada",
                };
            }
        } else {
            return {
                mensaje:
                    "esta letra/unidad ya ha sido completada una vez por ende la letra siguiente ya esta disponible",
            };
        }
    },
};

export default letras;
