import inicioYregistro from '../../controllers/inicioYregistro'


const login = async (req,res)=>{
    const {nombreDeUsuario,contraseña} = req.body;

    const inicioEnLaCuenta = await inicioYregistro.login(nombreDeUsuario, contraseña)
    res.json(inicioEnLaCuenta)
}


export default login 