module.exports = {
  write: function write(dict, out, len) {
    var fs = require('fs');
    //Load JSON
    var jsonObj = require(dict);
    var length = len;
    var start = "so"; // zero word
    var output = [start];
    var lenfirst = jsonObj[start][0];
    var randfirst = Math.floor(Math.random() * (lenfirst)) + 1;
    var indexfirst = 0;
    while (randfirst > 0) {
      indexfirst++;
      randfirst -= jsonObj[start][indexfirst][0];
    }
    var first = jsonObj[start][indexfirst][1];
    output.push(first); // first word
    var error = false;
    for (var i = 1; i < length; i++) {
      if(!jsonObj[start][indexfirst]){
        error = true;
        break;
      }
      first = jsonObj[start][indexfirst][1];
      var lensecond = jsonObj[start][indexfirst][0];
      var randsecond = Math.floor(Math.random() * (lensecond)) + 1;
      var indexsecond = 1;
      while (randsecond > 0) {
        indexsecond++;
        if(!jsonObj[start][indexfirst][indexsecond]){
          error = true;
          break;
        }
        randsecond -= jsonObj[start][indexfirst][indexsecond][0];
      }
      if(error){break;}
      var second = jsonObj[start][indexfirst][indexsecond][1];
      output.push(second); //second word
      if(!jsonObj[first]){
        error = true;
        break;
      }
      for (var j = 1; j < jsonObj[first].length; j++) {
        if(!jsonObj[first][j]){
          error = true;
          break;
        }
        if (jsonObj[first][j][1] == second) {
          indexfirst = j;
          break;
        }
      }
      start = first;
    }
    output = output.join(" ");

    //output = JSON.stringify(output, null, 4);
    if(!error){
      fs.writeFile(out, output, function(err) {
        if (err) return console.log(err);
        //console.log(length + ' words written to ' + out);
      });
    }else{
      output = write(dict, out, len);
    }
    return output.toString();
  }
};
