import puppeteer from "puppeteer";

export default async function home(req, res) {
    const browser = await puppeteer.launch({
        //headless: false,
        slowMo: 200,
    })

    const page = await browser.newPage()
    await page.goto('https://www.365scores.com/es-mx/football/match/friendly-international-570/slovakia-wales-5039-5043-570#id=4054580',{
        waitUntil: 'networkidle2',
    })

    await page.click('span[id="navigation-tabs_game-center_stats"]')
    
    const result = await page.evaluate(() =>{
        const statistics = document.querySelectorAll(".bar-chart-container")

        const data = [...statistics].map(stat =>{
            const scores = [...stat.querySelectorAll(".bar-chart-label")].map((tag) => tag.innerText);
            const scoresNames = [...stat.querySelectorAll(".bar-chart-name-label")].map((tag) => tag.innerText);
            
            return {scoresNames,
                    scores
                   }
                   
        })
        return data
    })
    //console.log(result.scoresNames[0])
    let arrayStats = []
    let i = 0

    while(i < result.length){
        //console.log(result[i].scoresNames[0])
        if(result[i].scoresNames[0] === "Total Remates"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Remates a Puerta"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Remates Fuera"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Saques de Esquina"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Fueras de Juego"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Total de pases"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Pases completados"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Ataques"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Faltas"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Salvadas de Portero"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Saques de banda"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Saques de puerta"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Tarjetas Amarillas"){
            arrayStats.push(result[i].scores)
        }else if(result[i].scoresNames[0] === "Tarjetas Rojas"){
            arrayStats.push(result[i].scores)
        }
        
        i++
    }
    i = 0
    //console.log(arrayStats)
    await browser.close()
    return res.status(200).json({arrayStats})
}