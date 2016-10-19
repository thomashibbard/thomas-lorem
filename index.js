'use strict'

var writeFile = require('fs-extra').writeFile
	,	parser = require('filesize-parser')
	, argv = require('yargs').argv
	, join = require('path').join
	, string = require('./src-string').string;

const directory = process.cwd();
const stringSize = Buffer.byteLength(string, 'utf8');
const max = 104857600;
const min = stringSize;
var sizeArg = argv.size || argv.s;
var parsedSizeArg = parser(sizeArg);
var desiredFileSize = parsedSizeArg >= max ? max :
											parsedSizeArg <= min ? min : parsedSizeArg;

var repeatAmount = parseInt((desiredFileSize / stringSize), 10);
var stringToPrint = string.repeat(repeatAmount)
var fileName = `${sizeArg}_sample_${+new Date()}.txt`;
var fullPath = join(directory, fileName);
console.log(fullPath);
writeFile(directory + '/' + fileName, stringToPrint, 'utf8', (err) => {
	if(err){
		console.error(`error creating file ${err}`);
	}else{
		console.info(`file written: ${fileName}`)
	}
});
