let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://kumparan.com/channel/news')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
                const $ = cheerio.load(html);
                let kumparanList = [];
                $('#trending-section').each(function(i, elem){
                    kumparanList[i] ={
                        judul: $(this).find('span').text().trim(),
                        url: $(this).find('a').attr('href'),
                        published: $(this).find('#author-name').text().trim()
                    }
                });
                const kumparanListTrim = kumparanList.filter(n => n != undefined);
                fs.writeFile('data/kumparanList.json',
                    JSON.stringify(kumparanListTrim, null, 4), (err)=>{
                        console.log('Scrapping Success')
                    });
        }
    }), (error) => console.log(err);