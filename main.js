var fs = require('fs');
//Load JSON
var jsonObj = require('./dictionary.json');
var length = 100;
var start = "so"; // zero word
var output = [start];
var lenfirst = jsonObj[start][0];
var randfirst = Math.floor(Math.random() * (lenfirst))+1;
var indexfirst = 0;
while(randfirst > 0){
  indexfirst ++;
  randfirst -= jsonObj[start][indexfirst][0];
}
var first = jsonObj[start][indexfirst][1];
output.push(first); // first word

for(var i=1; i<length; i++){
  first = jsonObj[start][indexfirst][1];
  var lensecond = jsonObj[start][indexfirst][0];
  var randsecond = Math.floor(Math.random() * (lensecond))+1;
  var indexsecond = 1;
  while(randsecond > 0){
    indexsecond ++;
    randsecond -= jsonObj[start][indexfirst][indexsecond][0];
  }
  var second = jsonObj[start][indexfirst][indexsecond][1];
  output.push(second); //second word

  for(var j = 1; j < jsonObj[first].length;j++){
    if(jsonObj[first][j][1] == second){
      indexfirst = j;
      break;
    }
  }
  start = first;
}
output = output.join(" ");
//output = JSON.stringify(output, null, 4);
fs.writeFile('output.txt', output, function (err) {
  if (err) return console.log(err);
  console.log(length+' words written to output.txt');
});

function objLength(obj){
  var i=0;
  for (var x in obj){
    if(obj.hasOwnProperty(x)){
      i++;
    }
  }
  return i;
}
