'use strict';

const http = require("http");
const fs = require("fs");

let json, DOM;

try{

	http.createServer(function(request, response) {

	    if(request){

	    	console.log("GO!");

	    	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

	        fs.readFile("./news.json", function (err, data) {

				if (err) throw err;

				json = JSON.parse(data.toString());
	            DOM = "";
				json.forEach(function(item, i, arr){
				    DOM += `
				    <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
				    <p class="category">${item.category}</p>
				    <p class="time">${item.time}</p> 
				    <hr />
				    `
				})

	            response.write(`

					<style>
					*{
						font-family: 'Comic Sans MS'
					}
					a{
						color:black;
						text-decoration:none;
					}
					.category{
			            font-size:14px;
			            color:black
					}
					.time{
			            font-size:13px;
			            color:darkgrey;
			            padding-bottom:12px
					}
					</style>

					<h1 style="font-family: 'Comic Sans MS'; font-size:72px; color:red; text-align:center">ТСН ВРАЖАЭ!</h1> 
			        <hr />

					${DOM}

				`);

		        response.end();

			});

	    }
	    

	}).listen(8080);

} catch (error){
	console.log(`Пизданулось :(  ${error}`);
}