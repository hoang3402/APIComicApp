const express = require('express')
const app = express()
const port = 3000
const axios = require("axios");
const cheerio = require("cheerio");


app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get('/hot', (req, res) => {
    getData()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function getData() {
    const urlNettruyen = "http://www.nettruyenme.com/"
    const data = []
    await axios.get(urlNettruyen).then((response) => {
        const htmlRaw = response.data
        const $ = cheerio.load(htmlRaw)

        console.log(htmlRaw)
    })
}