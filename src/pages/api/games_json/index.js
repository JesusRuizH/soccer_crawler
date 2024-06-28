export default async function home(req, res) {
    let arrayInfoGame = []
    //ANALIZANDO SUIZA

    /**
     * El arreglo esta conformado por 
     *  ID de partido
     *  Equipo local
     *  Goles equipo local
     *  Equipo visitante
     *  Goles equipo visitante
     */

    arrayInfoGame = [
        20,
        "Inglaterra",
        3,
        "Italia",
        1
    ]
    return res.status(200).json({arrayInfoGame})
}