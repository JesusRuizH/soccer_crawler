export default async function home(req, res) {
    let arrayInfoGame = []

    arrayInfoGame = [
        2,
        "Eslovaquia",
        4,
        "Gales",
        0
    ]
    return res.status(200).json({arrayInfoGame})
}