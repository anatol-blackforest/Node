'use strict';

const http = require("http");

let json, DOM;

http.createServer(function(request, response) {

    if(request){

    	console.log("GO!");

    	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

        json = require("./news.json");

		DOM = "";

		json.forEach(function(item, i, arr){
		    DOM += `
		    <h2>${item.title}</h2>
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

    }
    

}).listen(80);

    