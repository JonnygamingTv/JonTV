const fs = require('fs');
let JonDB={};
if(fs.existsSync('./src/s.json')) try {JonDB=JSON.parse(fs.readFileSync('./src/s.json'));}catch(err){console.log(err);JonDB={};}
let JonTimeout=null;
if(!JonDB['convo']) JonDB['convo']={};
if(!JonDB['followups']) JonDB['followups']={};
async function net() {
	return console.log("https://JonTV.me");
}
net.train = function(data, callback) {
	let result="";
	if(!data) data = {input:null,output:null,typ:"content"};
	if(!data.typ) data.typ='content';
	if(data.input) {
		if(!JonDB[data.typ]) JonDB[data.typ]={};
		JonDB[data.typ][data.input] = data.output;
		result = JonDB[data.typ][data.input];
	}
	if(callback) callback(result);
	net.saveAll();
	return result;
}
net.run = function(data, callback) {
	let result="";
	if(!data) data = {input:null,output:null,typ:"content"};
	if(!data.typ) data.typ='content';
	if(data.input) {
		if(!JonDB[data.typ]) JonDB[data.typ]={};
		data.output=JonDB[data.typ][data.input];
		if(!data.output && data.typ == 'content') {
			data.eachandevery = data.input.split(' ');
			data.newinput = "";
			data.eachandevery.forEach(elem => {
				if(JonDB['alte'][elem]) elem = JonDB['alte'][elem];
				data.newinput += elem;
			});
			if(data.newinput) {
				data.input=data.newinput;
				data.output=JonDB[data.typ][data.input];
			}
		}
		if(data.id) {
		if(JonDB['convo'][data.id]){
			JonDB['convo'][data.id].push(data.input);
			if(JonDB['followups'][JonDB['convo'][data.id][JonDB['convo'][data.id].length -1]]){
				if(JonDB['followups'][JonDB['convo'][data.id][JonDB['convo'][data.id].length -1]][data.input]){
					data.output=JonDB['followups'][JonDB['convo'][data.id][JonDB['convo'][data.id].length -1]][data.input];
				}
			}
			/* else {
				JonDB['followups'][JonDB['convo'][data.id][JonDB['convo'][data.id].length -1]]={};
			}
			 [JonDB['convo'][data.id][JonDB['convo'][data.id].length]]*/
		}else{
			JonDB['convo'][data.id] = [data.input];
		}
		}
	}
	result = data.output;
	if(callback) callback(result);
	return result;
}
net.saveAll = function(){
	if(!JonTimeout) {
	JonTimeout=setTimeout(function(){
	if(!fs.existsSync('./src/')) fs.mkdirSync('./src/');
	fs.writeFile("./src/s.json", JSON.stringify(JonDB),(err) => {if(err) throw err;});
	JonTimeout=null;
	},5000);
	}
}
module.exports = net;
