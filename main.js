var writer = require('./write.js');
var loader = require('./load.js');
var wiper = require('./wipe.js');
// var x = (writer.write('./dictionary.json','output.txt',1000));
var rl = require("readline");
var fs = require('fs');
sources = [];
var s = 0;
fs.readdirSync('./sources').forEach(function(file) {
  sources.push(s+": "+String(file));
});
var prompts = rl.createInterface(process.stdin, process.stdout);
var text = "MANAGE or WRITE: \n";
var source = "dictionary.json";
var state = 0;
function run(txt,state){
  var nextstate = state;
  prompts.question(txt, function (input) {
    var message = "";
    input = input.toLowerCase();
    switch(state){
      case 0: //Main
        if(input == 'manage'){
          nextstate = 1;
          txt = "Select a source #\n";
          txt += sources.join("\n");
          txt += "\n";
          //loader.load();
        }else if(input == 'write'){
          nextstate = 4;
          txt = "Select a source #\n";
          txt += sources.join("\n");
          txt += "\n";
        }
        break;
      case 1: // manage
        if(input > sources.length-1){
          nextstate = 1;
          txt = "Select a source #\n";
          txt += sources.join("\n");
          txt += "\n";
        }else if(!isNaN(parseInt(input))){
          nextstate = 3;
          txt = "LOAD or WIPE: \n";
        }
        break;
      case 2: //write
        if(input == 'return'){
          nextstate = 4;
          txt = "Select a source #\n";
          txt += sources.join("\n");
          txt += "\n";
        }else if(isNaN(parseInt(input))){
          message = "Not a Number";
        }else{
          message = "\n"+writer.write('./sources/dictionary.json','output.txt',input-1)+"\n";
        }
        break;
      case 3: //load or wipe
        if(input == 'load'){
          nextstate = 0;
          txt = "MANAGE or WRITE: \n";
          loader.load();
        }else if(input == 'wipe'){
          nextstate = 0;
          txt = "MANAGE or WRITE: \n";
          wiper.wipe();
        }
        break;
      case 4: // manage
        if(input > sources.length-1){
          nextstate = 4;
          txt = "Select a source #\n";
          txt += sources.join("\n");
          txt += "\n";
        }else{
          nextstate = 2;
          txt = "How many words would you like to write? (RETURN to previous)\n";
        }
        break;
    }
    state = nextstate;
    console.log(message);
    if(input!= "exit"){run(txt,nextstate);}else{process.exit();}
  });
}
console.log("Welcome to Smartkov. Type exit at any time to terminate!");
run(text, 0);
