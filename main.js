var writer = require('./write.js');
var loader = require('./load.js');
var wiper = require('./wipe.js');
// var x = (writer.write('./dictionary.json','output.txt',1000));
var rl = require("readline");
var fs = require('fs');
var sources = [];
var s = 0;
fs.readdirSync('./sources').forEach(function(file) {
  sources.push(s+": "+String(file));
  s++;
});
var seeds = [];
var sd = 0;
fs.readdirSync('./seeds').forEach(function(file) {
  seeds.push(sd+": "+String(file));
  sd++;
});
var texts = loadText();
var prompts = rl.createInterface(process.stdin, process.stdout);
var source = "dictionary.json";
var state = 0;
function run(state){
  var txt = texts[state];
  var nextstate = state;
  prompts.question(txt, function (input) {
    var message = "";
    input = input.toLowerCase();
    switch(state){
      case 0: //Main
        if(input == 'manage'){
          nextstate = 1;
        }else if(input == 'write'){
          nextstate = 4;
        }
        break;
      case 1: // manage
        if(input == 'return'){
          nextstate = 0;
        }else if(input > sources.length-1){
          nextstate = 1;
        }else if(!isNaN(parseInt(input))){
          nextstate = 3;
          source = sources[input].split(" ")[1];
        }
        break;
      case 2: //write
        if(input == 'return'){
          nextstate = 4;
        }else if(isNaN(parseInt(input))){
          message = "Not a Number";
        }else{
          message = "\n"+writer.write('./sources/'+source,'output.txt',input-1)+"\n";
        }
        break;
      case 3: //load or wipe
        if(input == 'return'){
          nextstate = 1;
        }else if(input == 'load'){
          nextstate = 5;
        }else if(input == 'wipe'){
          nextstate = 0;
          wiper.wipe('./sources/'+source);
        }
        break;
      case 4: // manage
        if(input == 'return'){
          nextstate = 0;
        }else if(input > sources.length-1){
          nextstate = 4;
        }else{
          source = sources[input].split(" ")[1];
          nextstate = 2;
        }
        break;
      case 5:
        if(input == 'return'){
          nextstate = 3;
        }else if(input > seeds.length-1 || isNaN(parseInt(input)) ){
          nextstate = 5;
        }else{
          nextstate = 0;
          seed = seeds[input].split(" ")[1];
          loader.load('./sources/'+source,'./seeds/'+seed);
        }
        break;
    }

    state = nextstate;
    console.log(message);
    if(input!= "exit"){run(nextstate);}else{process.exit();}
  });
}
console.log("Welcome to Smartkov. Type exit at any time to terminate!");
run(0);

function loadText(){
  var ret = "(RETURN to previous)\n";
  return [
    "MANAGE or WRITE: \n",
    "Select a source #"+ret+sources.join("\n"),
    "How many words would you like to write?"+"\n",
    "LOAD or WIPE: "+ret,
    "Select a source #"+ret+sources.join("\n")+"\n",
    "Select a seed #"+ret+seeds.join("\n")+"\n"
  ];
}
