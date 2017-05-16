"use strict";

const readline = require('readline');
const fs = require('fs');
const messages = ["Вы угадали!", "Вы НЕ угадали!", "Введите орел или решка:", "------------------Орел или решка?------------------"];

let result, date, number, back;
let logFile = process.argv[2] || "log.txt";

let rl = readline.createInterface({
	input: process.stdin, // ввод из стандартного потока
	output: process.stdout // вывод в стандартный поток
});

let orelReshka = function(enteredBack){
	date = new Date();
    number = Math.round(Math.random()+1);
    enteredBack = enteredBack.toLowerCase();

    if(number == 1){
    	back = "орел"
    }else if(number == 2){
    	back = "решка"
    }

	if(back == enteredBack){
		result = messages[0];
		console.log(result);
		rl.close();
	}else if(back !== enteredBack && (enteredBack == "орел" || enteredBack == "решка")){
		result = messages[1];
		console.log(result);
		rl.question(messages[2], orelReshka);
	}else{
		console.log("Введите орла или решку!");
		rl.question(messages[2], orelReshka);
	};

    if(result){
        fs.appendFile(logFile, (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${result} [Загадано ${back} - выбрали ${enteredBack}] \n`));
    }
	
}

console.log(messages[3]);

rl.question(messages[2], orelReshka);