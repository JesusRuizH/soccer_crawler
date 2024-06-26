import puppeteer from "puppeteer";

export default async function home(req, res) {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 1000,
    })
    
    const page = await browser.newPage()
    await page.goto('https://www.365scores.com/es-mx/football/team/germany-2372/matches#results',{
        waitUntil: 'networkidle2',
    });
    
    await page.setViewport({
        width: 1200,
        height: 800
    });
    
    await autoScroll(page);

    const result = await page.evaluate(() => {
        const statistics = document.querySelectorAll('a[class="game-card_game_card_link__L3moj game-card_game_card__RpinR game-card_clickable__-fXXf game-card_support_hover__ES-mS link_link__Zkmqt"]')
        
        const data = [...statistics].map(stat =>{
            const nameLocal_ = [...stat.querySelectorAll('div[class="ellipsis_container__ciMmU game-card-competitor_container__hBbeu game-card-competitor_name__J3qH7 undefined"]')].map((name_local) => name_local.innerText);
            const nameLocal = [...stat.querySelectorAll('div[class="ellipsis_container__ciMmU game-card-competitor_container__hBbeu game-card-competitor_name__J3qH7 undefined game-card-competitor_qualified_name_winner__AkgiM"]')].map((name_local) => name_local.innerText);

            //const scoresLocal = [...stat.querySelectorAll(".game-score_competitor_score_container__HZgTq")].map((scores_local) => scores_local.innerText);
            //const nameVisit = [...stat.querySelectorAll(".ellipsis_container__ciMmU game-card-competitor_container__hBbeu game-card-competitor_name__J3qH7 game-card-competitor_container_away__pMdfP undefined")].map((name_visit) => name_visit.innerText);             
            return {
                    nameLocal_,
                    nameLocal,
                    //scoresLocal,
                    //nameVisit
                   }
        })
        return data
    })
    console.log(result)
    
    await browser.close()
    return res.status(200).send("result")
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}