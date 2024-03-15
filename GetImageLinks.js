const keyword = 'Iran';
const numberOfImages = 5;
let GetUrlNumber = 0;

const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

async function searchGoogle(keyword) {
    const query = querystring.stringify({ q: keyword });
    try {
        const response = await axios.get(`https://www.google.com/search?tbm=isch&${query}`);
        const $ = cheerio.load(response.data);
        const imageLinks = [];
        $('img').each((index, element) => {
            const imageUrl = $(element).attr('src');
            if (GetUrlNumber != numberOfImages && imageUrl && imageUrl.startsWith('http')) {
                imageLinks.push(imageUrl);
                GetUrlNumber++;
            }
        });
        return imageLinks;
    } catch (error) {
        console.error('Error searching Google:', error);
        return [];
    }
}

async function main() {
    const imageLinks = await searchGoogle(keyword);
    for (let i = 0; i < imageLinks.length; i++) {
        console.log(imageLinks[i]);
    }
}

main();