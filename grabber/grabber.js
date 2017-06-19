'use strict';

const https = require("https");
const cheerio = require('cheerio');
const fs = require('fs');

let jQuery, jsonArr, data;

let grabber = function(){
    new Promise((resolve, reject) => {

		https.get("https://tsn.ua/", (res) => {
			if(res.statusCode == 200){
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
                    jsonArr = [];
					jQuery = cheerio.load(data);
					jQuery('.h-feed article').each(function(i, element){
						jsonArr.push({
							'title' : jQuery(this).find('h4').text(),
							'link' : jQuery(this).find('h4 a').attr('href'), 
							'category' : jQuery(this).find('.p-category').text(), 
							'time' : jQuery(this).find('time').text(), 
						})
					});
					resolve(jsonArr);
				});
			}else{
	               console.log(`Пизданулось :(`);
			}
		}).on("error", (error) => {
			console.log(`Пизданулось :(  ${error.message}`);
		})

	}).then(
		result => {
		  // первая функция-обработчик - запустится при вызове resolve
		    fs.writeFile(
			    "news.json",
			    JSON.stringify(result),
			    (error) => {
			        if (error) {
			            console.log(error);
			        }
			        setTimeout(grabber, 10000);
			    }
			);
		},
		error => {
		  // вторая функция - запустится при вызове reject
		  console.log(`Пизданулось :(  ${error}`); // error - аргумент reject
		}
	);
};

grabber();