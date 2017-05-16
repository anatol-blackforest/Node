"use strict";

const fs = require('fs');
const messages = ["======================================","Количество сыграных партий:", "Выиграно:", "Проиграно:"]

let wins, notWins, dataArr;
let file = process.argv[2] || 'log.txt';

fs.readFile(file, (err, data)=>{
	data = data.toString();
	dataArr = data.split("\n");
	dataArr.pop();
	
	//number of parties
	console.log(messages[0]);
	console.log(`${messages[1]} ${dataArr.length}`);
	console.log(messages[0]);
	
	//wins
	wins = dataArr.filter(item => {
		return item.indexOf("НЕ") == -1; 
	}).length;
	console.log(`${messages[2]} ${wins}`);
	console.log(`${Math.round(100/dataArr.length*wins)}%`);
	console.log(messages[0]);
	
	//not wins
	notWins = dataArr.filter(item => {
		return item.indexOf("НЕ") !== -1; 
	}).length;
	console.log(`${messages[3]} ${notWins}`);
	console.log(`${Math.round(100/dataArr.length*notWins)}%`);
	console.log(messages[0]);
	
	//all data
	console.log(data);
	
});