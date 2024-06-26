import '../../app/globals.css'
import axios from "axios";
import { Inter } from 'next/font/google'
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })


export default function Post({ results, stats}) {
  const scores = {scores_id: results.arrayInfoGame[0], local_name: results.arrayInfoGame[1], local_goals: results.arrayInfoGame[2], visit_name: results.arrayInfoGame[3], visit_goals: results.arrayInfoGame[4]}
  
  
  const stats_local = {
    statistics_id: results.arrayInfoGame[0], 
    scores_id: results.arrayInfoGame[0], 
    total_rem: Number(stats.arrayStats[0][0]),
    remates_puer: Number(stats.arrayStats[1][0]), 
    remates_fue: Number(stats.arrayStats[2][0]), 
    saques_esq: Number(stats.arrayStats[3][0]),
    fuera_juego: Number(stats.arrayStats[4][0]), 
    total_pases: Number(stats.arrayStats[5][0]),
    pases_completados: Number(stats.arrayStats[6][0]),
    ataques: Number(stats.arrayStats[7][0]),  
    faltas: Number(stats.arrayStats[8][0]), 
    salvadas_portero: Number(stats.arrayStats[9][0]), 
    saques_banda: Number(stats.arrayStats[10][0]), 
    saques_puerta: Number(stats.arrayStats[11][0]), 
    tarjetas_ama: Number(stats.arrayStats[12][0]), 
    tarjetas_rojas: Number(stats.arrayStats[13][0])
  }
  
  const stats_visit = {
    statistics_id: results.arrayInfoGame[0], 
    scores_id: results.arrayInfoGame[0], 
    total_rem: Number(stats.arrayStats[0][1]),
    remates_puer: Number(stats.arrayStats[1][1]), 
    remates_fue: Number(stats.arrayStats[2][1]), 
    saques_esq: Number(stats.arrayStats[3][1]),
    fuera_juego: Number(stats.arrayStats[4][1]), 
    total_pases: Number(stats.arrayStats[5][1]),
    pases_completados: Number(stats.arrayStats[6][1]),
    ataques: Number(stats.arrayStats[7][1]),  
    faltas: Number(stats.arrayStats[8][1]), 
    salvadas_portero: Number(stats.arrayStats[9][1]), 
    saques_banda: Number(stats.arrayStats[10][1]), 
    saques_puerta: Number(stats.arrayStats[11][1]), 
    tarjetas_ama: Number(stats.arrayStats[12][1]), 
    tarjetas_rojas: Number(stats.arrayStats[13][1])
  }

  //console.log(stats_visit)
  //console.log(stats) 
  const router = useRouter()

  const handleSubmitScores = async() => {
      try {
          await axios.post('/api/scores_db', scores)
          toast.success('PARTIDO CARGADO')
          
          router.push('/aplicacion')
      } catch (error) {
          toast.error(error.response.data.message)
      }
  };
  //console.log(stats_local)
  const handleSubmitStats = async() => {
    try {
        await axios.post('/api/statistics_local_db', stats_local)
        await axios.post('/api/statistics_visit_db', stats_visit)
        toast.success('ESTADISTICAS CARGADAS CORRECTAMENTE')
        router.push('/aplicacion')
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
  };

  return (
  

  <>
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
            <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300"></p>
            <p className="italic text-7xl flex content-center justify-items-center mt-40 text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Soccer Crawler</p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">Recordatorio: ingresa URL y datos de partido en los respectivos archivos</p>
            <button onClick={handleSubmitScores} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150" title="Return Home">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                    <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"></path>
                </svg>
                <span>Soccer scores</span>
            </button>
            <button onClick={handleSubmitStats} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 mt-1 px-4 py-2 rounded transition duration-150" title="Return Home">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                    <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"></path>
                </svg>
                <span>Soccer stats</span>
            </button>
        </div>
        <div className="absolute inset-x-0 top-0 h-16">
          <img src="https://cdn-icons-png.flaticon.com/256/8149/8149271.png" />
        </div>
    </div>
  </>
    );
}

export  const getServerSideProps = async (context)  =>{
const {data: results} = await axios.get(
    "http://localhost:3000/api/games_json"
    ); 
const {data: stats} = await axios.get(
    "http://localhost:3000/api/puppeteer_stats"
  ); 
return {
    props: {
      results,
      stats,
    }, // will be passed to the page component as props
};
};
