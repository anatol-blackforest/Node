'use strict';

const http = require("http");
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let jQuery, jsonArr;

let grabber = function(){
    new Promise((resolve, reject) => {
	request.get('http://www.tsn.ua/', function (error, response, data) {

			if (!error && response.statusCode == 200) {
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
			}else{
	               console.log(`Пизданулось :(  ${error}`);
			}

		});

	}).then(
		result => {
		  // первая функция-обработчик - запустится при вызове resolve
		  fs.writeFile("news.json", JSON.stringify(result), setTimeout(grabber, 10000));
		},
		error => {
		  // вторая функция - запустится при вызове reject
		  console.log(`Пизданулось :(  ${error}`); // error - аргумент reject
		}
	);
};

grabber();