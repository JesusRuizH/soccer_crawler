import {pool} from '../../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        case 'GET': 
            return await getScores(req, res);
    }
    
}

const getScores = async(req,res) =>{
    try {
        const EQUIPO_1 = req.query.key1;
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM statistics_local INNER JOIN scores ON statistics_local.scores_id = scores.scores_id  WHERE local_name = '${EQUIPO_1}';`);
        const scores = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        
        return res.status(200).json(scores);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}
