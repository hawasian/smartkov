var fs = require('fs');

var source = './source.txt';
var array = fs.readFileSync(source).toString().toLowerCase().replace(/[^\w\s^’^']|_|\r\n/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
var jsonOut = require('./dictionary.json');

for(var i = 0; i<array.length; i++){
  var first = String(array[i]);
  var second = String(array[i+1]);
  var third = String(array[i+2]);
  if(first == "\r\n" || second == "\r\n" || third == "\r\n" ){continue;}

  if(!jsonOut[first]){
    jsonOut[first] = [];
    jsonOut[first][0] = 1;
  }else{
    jsonOut[first][0] += 1;
  }
  var hasSecond = false;
  var hasThird = false;
  for(var j = 0; j<jsonOut[first].length; j++){
    if(jsonOut[first][j][1] == second){
      hasSecond = true;
      jsonOut[first][j][0] += 1;
      hasThird = false;
      for(var k = 0; k<jsonOut[first][j].length; k++){
        if(jsonOut[first][j][k][1] == third){
          hasThird = true;
          jsonOut[first][j][k][0] += 1;
        }
      }
      if(!hasThird){
        jsonOut[first][j].push([1,third]);
      }
    }
  }
  if(!hasSecond){
    jsonOut[first].push([1,second,[1,third]]);
  }
}

fs.writeFile('dictionary.json', JSON.stringify(jsonOut, null, 4), function (err) {
   if (err) return console.log(err);
   console.log('Dictionary Updated: '+source+" Added");
 });
