import {pool} from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getStatistics(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveStatistics(req,res)
    }
    
}

const getStatistics = async(req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM statistics_visit;');
        const scores = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(scores);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const saveStatistics = async (req, res)=>{
    try {
        const client = await pool.connect();
        const {statistics_id, scores_id, total_rem, remates_puer, remates_fue, saques_esq, fuera_juego, total_pases, pases_completados, ataques, faltas, salvadas_portero, saques_banda, saques_puerta, tarjetas_ama, tarjetas_rojas} = req.body
             const result = await client.query(
             'INSERT INTO statistics_visit (statistics_id, scores_id, total_rem, remates_puer, remates_fue, saques_esq, fuera_juego, total_pases, pases_completados, ataques, faltas, salvadas_portero, saques_banda, saques_puerta, tarjetas_ama, tarjetas_rojas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)',
             [statistics_id, scores_id, total_rem, remates_puer, remates_fue, saques_esq, fuera_juego, total_pases, pases_completados, ataques, faltas, salvadas_portero, saques_banda, saques_puerta, tarjetas_ama, tarjetas_rojas]
             );
            //console.log("req.body")
            return res.status(200).json({statistics_id, scores_id, total_rem, remates_puer, remates_fue, saques_esq, fuera_juego, total_pases, pases_completados, ataques, faltas, salvadas_portero, saques_banda, saques_puerta, tarjetas_ama, tarjetas_rojas, id: result.insertId})
        } catch (error) {
        console.log("ERROR" + error)
        return res.status(500).json({message: error.message})
    }
}