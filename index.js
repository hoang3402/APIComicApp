const express = require('express')
const app = express()
const port = 3000
const axios = require("axios");
const cheerio = require("cheerio");
const PAGE_URL = "http://www.nettruyenme.com/hot"

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hot', async (req, res) => {
    var data = await scraper();
    res.send(data)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

const scraper = async () => {
    const response = await axios.get(PAGE_URL);
    const $ = cheerio.load(response.data);

    const data = []
    const selectList = "figure > div > a > img"

    $(selectList).each((index, element) => {
        const link = $(element).parent().attr("href")
        const img = "http:" + $(element).attr("data-original")
        const title = $(element).attr("alt")
        data.push({
            title,
            thumbnail: img,
            link
        })
    })

    return data
};