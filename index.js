const express = require('express')
const app = express()
const port = 3000
const axios = require("axios");
const cheerio = require("cheerio");


app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get('/hot', (req, res) => {
    res.json(getData())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

 function getData() {
    const urlNettruyen = "http://www.nettruyenme.com/"
    const data = []
     axios.get(urlNettruyen).then((response) => {
        const htmlRaw = response.data
        const $ = cheerio.load(htmlRaw)

        const selectList = "figure > div > a > img"

        $(selectList).each((index, element) => {
            const img = "http:" + $(element).attr("data-original")
            const title = $(element).attr("alt")
            data.push({
                title,
                img
            })
        })

        console.log(data)
        return data
    })
}