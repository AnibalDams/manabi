import aspectosTeoricos from '../../schemas/aspectosTeoricos.schema'


const crearAspectosTeoricos = async (req,res)=>{
     await aspectosTeoricos.insertMany([{titulo:"Que es?",contenido:"el braille es tal",audio:"audio"},{titulo:"caracteristicas",contenido:"el braille es tal",audio:"audio"}])
    res.json({mensaje:"aspectorTeoricos creados"}) 
}

const mostrarAspectosTeoricos = async  (req,res)=>{
    const teoria = await aspectosTeoricos.find()
    res.json({aspectosTeoricos:teoria})
}

const mostrarUnSoloAspectoTeorico = async (req,res)=> {
    const {id} = req.params
    const aspecto = await aspectosTeoricos.findById(id)
    if(!aspecto){ 
        res.json({mensaje:"no se encontro ningun aspecto teorico"})
    }else{
        res.json({aspectoTeorico:aspecto})
    }

}


export {crearAspectosTeoricos,mostrarAspectosTeoricos,mostrarUnSoloAspectoTeorico}