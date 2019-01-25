const request = require ('request-promise')
const cheerio = require('cheerio')

const page = 10
const postCode = 4000
var url = `https://www.realestate.com.au/sold/in-${postCode}/list-${page}`
const scrapeResults = []

async function scrapeRealEstate() {
    try{
    const htmlResult = await request.get(url)
    const $ = await cheerio.load(htmlResult)

    $(".residential-card__content").each((index,element) => {
        const resultAddress = $(element).children(".residential-card__info").children(".residential-card__info-text").children(".residential-card__address-heading")
        const address = resultAddress.text()
        const resultPrice = $(element).children(".residential-card__price.rui-truncate").children(".property-price")
        const price = resultPrice.text()
        const scrapeResult = {address, price, postCode}
        scrapeResults.push(scrapeResult)
    })
    console.log (scrapeResults)
    } catch(err){
        console.error(err)
    }
}

for (let i = 1; i <= page; i++) {
    scrapeRealEstate()
}