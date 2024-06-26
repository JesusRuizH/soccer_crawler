import {pool} from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getScores(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveScores(req,res)
    }
    
}

const getScores = async(req,res) =>{
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM scores;');
        const scores = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(scores);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}


const saveScores = async (req, res)=>{
    try {
        const client = await pool.connect();
        const {scores_id, local_name, local_goals, visit_name, visit_goals} = req.body
        
            const result = await client.query(
            'INSERT INTO scores (scores_id, local_name, local_goals, visit_name, visit_goals) VALUES ($1, $2, $3, $4, $5)',
            [scores_id, local_name, local_goals, visit_name, visit_goals]
            );
            return res.status(200).json({scores_id, local_name, local_goals, visit_name, visit_goals, id: result.insertId})
        } catch (error) {
        return res.status(500).json({message: error.message})
    }
}