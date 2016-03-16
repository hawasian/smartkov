var writer = require('./write.js');
// var x = (writer.write('./dictionary.json','output.txt',1000));
var rl = require("readline");

var prompts = rl.createInterface(process.stdin, process.stdout);
function run(){
  var txt = "How Many Words to Display? (Input 'EXIT' to terminate)";
  prompts.question(txt, function (input) {
  var message = "";
  if(isNaN(parseInt(input))){
    message = "Not a Number";
  }else{
    message = writer.write('./dictionary.json','output.txt',input-1);
  }
  console.log();
  console.log(message);
  console.log();
  if(input != "EXIT"){run();}else{process.exit();}
});
}
run();
