var writer = require('./write.js');
// var x = (writer.write('./dictionary.json','output.txt',1000));
var rl = require("readline");

var prompts = rl.createInterface(process.stdin, process.stdout);
var text = "LOAD or WRITE: \n";
var state = 0;
function run(txt,state){
  var nextstate = state;
  prompts.question(txt, function (input) {
    var message = "";
    input = input.toLowerCase();
    switch(state){
      case 0: //Main
        if(input == 'load'){
          nextstate = 1;
          txt = "FUNCTIONALITY COMING SOON\n";
        }else if(input == 'write'){
          nextstate = 2;
          txt = "How many words would you like to write? (RETURN to previous)\n";
        }
        break;
      case 1:
        nextstate = 0;
        txt = "LOAD or WRITE: \n";
        break;
      case 2:
        if(input == 'return'){
          nextstate = 0;
          txt = "LOAD or WRITE: \n";
        }else if(isNaN(parseInt(input))){
          message = "Not a Number";
        }else{
          message = "\n"+writer.write('./dictionary.json','output.txt',input-1)+"\n";
        }
        break;
    }
    state = nextstate;
    console.log(message);
    if(input!= "exit"){run(txt,nextstate);}else{process.exit();}
  });
}
console.log("Welcome to Smartkov. Type exit at any time to terminate!")
run(text, 0);
