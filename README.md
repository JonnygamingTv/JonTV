# JonTV
Easily use JonTV's API


Using the [npm package](https://npmjs.org/package/jontv) will make you able to easily use the [website](https://JonTV.me) to get info etc.

### Usage:
using the ?v= input from the url
and it will either return error or it will return a json
```javascript
let JonTV = require('jontv');
JonTV('cm45gT2v', test);
function test(thing) {
	console.log(thing);
	try {
		let JSONobj = JSON.parse(thing);
		console.log(JSONobj.n);
	} catch(error) {
		console.log(error);
	}
}
JonTV.getuser('rK9JTIdB2eqsEkWQ', test);
JonTV.search('Creeper', search);
function search(thing) {
console.log(thing);
}
```

You can also try it out in the bot I made (Discord) [Invite](https://discordapp.com/api/oauth2/authorize?client_id=621320606343888896&permissions=0&redirect_uri=https%3A%2F%2Fwww.JonTube.com&scope=bot)
