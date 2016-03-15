var fs = require('fs');
 //Write JSON
 fs.writeFile('dictionary.json', JSON.stringify({}, null, 4), function (err) {
   if (err) return console.log(err);
   console.log('Dictionary Cleared');
 });
